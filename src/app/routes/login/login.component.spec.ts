import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/core/models/Profile';
import { LoginService } from 'src/app/core/services/login.service';
import { User } from 'src/app/security/models/User';

import { LoginComponent } from './login.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let loginService:jasmine.SpyObj<LoginService>;
  let router:jasmine.SpyObj<Router>;

  let validUser:User;
  let responseProfile:Profile;

  let querySelector = (element:string) => {
    return fixture.nativeElement.querySelector('div.login ' + element);
  };

  let querySelectorAll = (element:string) => {
    return fixture.nativeElement.querySelectorAll('div.login ' + element);
  };

  let inputUserName: HTMLInputElement;
  let inputPassword: HTMLInputElement;
  let loginButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ 
        ReactiveFormsModule,
        MatCardModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule
     ],
      providers: [
        { provide: LoginService, useFactory: () => 
          jasmine.createSpyObj<LoginService>("loginService", ['signIn', 'signOut'])},
        { provide: Router, useFactory: () => 
            jasmine.createSpyObj<Router>("router", ["navigate"])
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    inputUserName  = querySelectorAll('form input')[0];
    inputPassword = querySelectorAll('form input')[1];
    loginButton  = querySelectorAll('form button')[1];

    validUser = new User(require("src/assets/testsSupport/login/john_signIn.json"));
    responseProfile = new Profile(require("src/assets/testsSupport/login/profile/profile_1_fake.json"));

    loginService.signIn.withArgs(validUser).and.returnValue(new Observable(
      content => content.next(responseProfile)
    ));
    
    let invalidUser:User = new User({
      userName: "non-existant@correo.com",
      password: "12345678"
    });
    loginService.signIn.withArgs(invalidUser).and.returnValue(new Observable(
      content => {
        throw new Error("HTTP Response error!");
      }
    ));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Static HTML content', () => {
    expect(querySelector('div.logo')).toBeTruthy();
    expect(querySelector('form')).toBeTruthy();
    expect(querySelectorAll('form input').length).toBe(2);
    expect(querySelectorAll('form button').length).toBe(2);
  });

  it('Succesful Sign In', () => {
    //EVENTS
    //inputs text insertion
    inputUserName.value = "example@email.com";
    inputUserName.dispatchEvent(new Event('input'));

    inputPassword.value = "12345678";
    inputPassword.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    //button click
    loginButton.click();

    // EXPECTATIONS
    fixture.whenStable().then(() => {
      let formData:FormGroup = component.formData;
      
      expect(formData.controls['userName'].value).toEqual("example@email.com");
      expect(formData.controls['password'].value).toEqual("12345678");

      //Call service!
      expect(loginService.signIn).toHaveBeenCalled();
    }); 
    
    
  });

  //genera mensaje error
  it('Sign In - Incomplete info', () => {
    inputUserName.value = "etcqescaeqwrrqw";
    inputUserName.dispatchEvent(new Event('input'));

    inputPassword.value = "";
    inputPassword.dispatchEvent(new Event('input'));

    loginButton.click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.formData.controls['password'].value).toEqual("");

      expect(loginService.signIn).toHaveBeenCalledTimes(0);
      expect(router.navigate).toHaveBeenCalledTimes(0);

      expect(component.incompleteData).toBeTrue();
      expect(querySelector('div.incomplete-info')).toBeTruthy();
    });
  });

  it('Sign In - Non existant profile!', () => {
    inputUserName.value = "non-existant@correo.com";
    inputUserName.dispatchEvent(new Event('input'));

    inputPassword.value = "12345678";
    inputPassword.dispatchEvent(new Event('input'));

    loginButton.click();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(loginService.signIn).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledTimes(0);

      expect(component.invalidData).toBeTrue();

      expect(querySelector('div.invalid-response')).toBeTruthy();
    });
  });

  it('Register page redirection', () => {
    let registerButton:HTMLButtonElement = querySelectorAll('form button')[0];

    registerButton.click();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(router.navigate).toHaveBeenCalled();
    });
  });


});
