import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Country } from 'src/app/core/models/Country';
import { Profile } from 'src/app/core/models/Profile';
import { RegisterRepository } from 'src/app/core/repositories/RegisterRepository';
import { RegisterService } from 'src/app/core/services/register.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let service: jasmine.SpyObj<RegisterRepository>;
  let router: jasmine.SpyObj<Router>;

  let responseProfile: Profile;
  let correctForm: Profile;
  let badProfileConnection: Profile;

  let countries:Array<Country>;

  let names: HTMLInputElement, lastNames: HTMLInputElement, 
    documentNumber: HTMLInputElement, 
    email: HTMLInputElement, userName:HTMLInputElement,
    password: HTMLInputElement, passwordConfirmation: HTMLInputElement,
    country:HTMLSelectElement, documentType:HTMLSelectElement,
    returnButton:HTMLButtonElement, 
    continueButton:HTMLButtonElement;

  let querySelector = (element:string) => {
    return fixture.nativeElement.querySelector("div.register " + element);
  };

  let querySelectorAll = (element:string) => {
    return fixture.nativeElement.querySelectorAll("div.register " + element);
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: RegisterService, useFactory: () => jasmine.createSpyObj<RegisterService>('registerService', ['newUser', 'countries', 'countryDocumentType']) },
        { provide: Router, useFactory: () => jasmine.createSpyObj<Router>('router', ['navigate']) }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RegisterService) as jasmine.SpyObj<RegisterService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    countries = [
      {
        name: "Colombia",
        documentTypes: [
          { type: "cedula", maxNumberOfChar:7, acronym: "C.C." },
          { type: "foreginer", acronym: "C.E." },
          { type: "passport", acronym: "P." }
        ]
      },
      {
        name: "Argentina",
        documentTypes: [
            { type: "cedula-identidad", acronym: "C.I." }
        ]
    }
    ];

    service.countries.and.returnValue(new Observable(
      content => content.next(countries)
    ));

    fixture.detectChanges();
  });

  /**
   * Mocking Services
   */
  beforeEach(() => {

    correctForm = new Profile({
      firstName: "John",
      lastName: "Doe",
      country: "Colombia",
      documentType: "cedula",
      documentNumber: "1098450210",
      email: "john_doe@email.com",
      password: "xXyYzZ01",
      userName: "john_doe"
    });
    
    responseProfile = new Profile({
      userId: 1,
      userName: "john_doe",
      securityToken: "bebu010010",
      firstName: "John",
      lastName: "Doe",
      email: "john_doe@email.com",
      country: "Colombia",
      documentType: "cedula",
      documentNumber: "1098450210"
    });

    badProfileConnection = new Profile({
      firstName: "John",
      lastName: "Doe",
      country: "Colombia",
      documentType: "cedula",
      documentNumber: "1098450210",
      email: "john_doe1@email.com",
      password: "xXyYzZ01",
      userName: "john_doe"
    });

    service.newUser.withArgs(badProfileConnection).and.returnValue(new Observable(
      conetent => {
        const error = new HttpErrorResponse({
          status: 500,
          statusText: "Internal error"
        });
        throw error;
      }
    ));

    service.newUser.withArgs(correctForm).and.returnValue(new Observable(
      content => content.next(responseProfile)
    ));

    fixture.detectChanges();
  });

  /**
   * Mocking registry info
   */
  beforeEach(() => {
    [names, lastNames, documentNumber, email, userName, 
      password, passwordConfirmation] = querySelectorAll("form input");
    [country, documentType] = querySelectorAll("form select");
    returnButton = fixture.nativeElement.querySelectorAll("button")[0];
    continueButton = querySelector("button");

    names.value = "John";
    names.dispatchEvent(new Event("input"));

    lastNames.value = "Doe";
    lastNames.dispatchEvent(new Event("input"));

    documentNumber.value = "1098450210";
    documentNumber.dispatchEvent(new Event("input"));

    email.value = "john_doe@email.com";
    email.dispatchEvent(new Event("input"));

    userName.value = "john_doe";
    userName.dispatchEvent(new Event("input"));

    password.value = "xXyYzZ01";
    password.dispatchEvent(new Event("input"));

    passwordConfirmation.value = password.value;
    passwordConfirmation.dispatchEvent(new Event("input"));

    //Dynamic selects
    country.value = country.options[0].value;
    country.dispatchEvent(new Event("change"));

    documentType.value = documentType.options[0].value;
    documentType.dispatchEvent(new Event("change"));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Static HTML Content', () => {
    expect(querySelector("")).toBeTruthy();
    expect(querySelector("form")).toBeTruthy();
    expect(querySelectorAll("form input").length).toBeGreaterThan(4);
    expect(querySelectorAll("form select").length).toBe(2);
  });

  it('Get countries', () => {
    expect(component.countries.length).toBe(2);
    expect(countries.length).toBe(2);
  });

  it('Failed to get countries', () => {
    service.countries.and.returnValue(new Observable(
      content => {
        throw new Error("NOT FOUND 404");
      }
    ));


  });

  it('National documents depending of selected country', () => {
    //Mock the service method
    service.countryDocumentType.and.returnValue(countries[1].documentTypes);

    //Trig the 'selectedCountry' method
    country.value = country.options[1].value;
    country.dispatchEvent(new Event("change"));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let selectedCountry:string = "Argentina";

      expect(country.value).toBe(selectedCountry);
      expect(component.registerForm.controls["country"].value).toBe(selectedCountry);
      expect(component.registerForm.controls["documentType"].value).toEqual("cedula-identidad");

      expect(component.documentTypes).toBe(countries[1].documentTypes);
    });
  });

  it('Successful register', () => {    
    //Click on Coninuar!
    continueButton.click();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(service.newUser).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalled();
      expect(component.passwordMatching).toBeTrue();
    });

    let profile: Profile = component.profile;

    expect(profile.firstName).toEqual("John");
    expect(profile.userName).toEqual("john_doe");
    expect(profile).toEqual(responseProfile);

  });

  it('Unsuccesful register - passwords does not match', () => {
    password.value = "12345780";
    password.dispatchEvent(new Event("input"));

    fixture.detectChanges();

    continueButton.click();

    fixture.whenStable().then(() => {
      expect(service.newUser).toHaveBeenCalledTimes(0);
      expect(router.navigate).toHaveBeenCalledTimes(0);
      expect(component.passwordMatching).toBeFalse();
    });
  });

  it('Unsuccesful register - incomplete info', () => {
    lastNames.value = "";
    lastNames.dispatchEvent(new Event("input"));

    fixture.detectChanges();
    continueButton.click();

    fixture.whenStable().then(() => {
      expect(service.newUser).toHaveBeenCalledTimes(0);
      expect(router.navigate).toHaveBeenCalledTimes(0);
      expect(component.passwordMatching).toBeTrue();
    });
  });

  it('Unsuccesful register - connection error', () => {
    email.value = "john_doe1@email.com";
    email.dispatchEvent(new Event("input"));

    fixture.detectChanges();
    continueButton.click();

    
    expect(service.newUser).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledTimes(0);
    expect(component.passwordMatching).toBeTrue();
    expect(component.generalError).toBeTrue();
    expect(component.existingUser).toBeFalse();
  });

  it('Unsuccesful register - already registered user', () => {
    let existingProfile: Profile = new Profile({
      firstName: "Johnnie",
      lastName: "Doe",
      country: "Colombia",
      documentType: "cedula",
      documentNumber: "1098450210",
      email: "john_doe@email.com",
      password: "xXyYzZ01",
      userName: "john_doe"
    });

    names.value = "Johnnie";
    names.dispatchEvent(new Event("input"));

    service.newUser.withArgs(existingProfile).and.returnValue(new Observable(
      content => {
        throw new HttpErrorResponse({
          status: 400,
          statusText: "Bad Request"
        });
      }
    ));

    fixture.detectChanges();

    continueButton.click();

    expect(component.passwordMatching).toBeTrue();
    expect(component.generalError).toBeFalse();
    expect(component.existingUser).toBeTrue();
  });

  it('Return to login page', () => {
    returnButton.click();

    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalled();
  });
});
