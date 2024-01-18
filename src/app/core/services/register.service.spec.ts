import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Country } from '../models/Country';
import { Profile } from '../models/Profile';

import { RegisterService } from './register.service';

describe('RegisterService', () => {
  let service: RegisterService;
  let http: HttpTestingController;

  beforeEach(() => {
    environment.testing = true;
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(RegisterService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Registering new user', () => {
    let response: Profile = new Profile(require('../../../assets/testsSupport/register/1.json'));
    let profile:Profile = new Profile({
      userName: "john_doe",
      password: "xXyYzZ001!",
      firstName: "John",
      lastName: "Doe",
      country: "Colombia",
      documentType: "cedula",
      documentNumber: "10986352",
      email: "joh_doe@email.com"
    });


    service.newUser(profile).subscribe(
      (response:Profile) => {
        expect(response.userId).toBe(1);
        expect(response.securityToken).toBe("bB01");
      }
    );

    const req = http.expectOne("../../../assets/testsSupport/register/new-user");

    expect(req.request.method).toBe("POST");

    req.flush(response, {status: 200, statusText: "OK"});

  });

  it('Get countries', () => {
    let countries: Country[] = require("../../../assets/testsSupport/register/countries.json");

    service.countries().subscribe(
      (countries: Country[]) => {
        expect(countries[0].name).toEqual("Colombia");
        expect(countries[1].name).toEqual("Argentina");
        expect(countries[0].documentTypes[1].type).toEqual("foreigner");
        expect(countries[1].documentTypes[0].type).toEqual("cedula-identidad");
      }
    );

    const req = http.expectOne("../../../assets/testsSupport/register/countries.json");

    expect(req.request.method).toBe("GET");

    req.flush(countries, {status:200, statusText:"OK"});

  });

  it('countryDocumentType', () => {
    let countries: Country[] = require("../../../assets/testsSupport/register/countries.json");

    expect(service.countryDocumentType(countries, "Colombia")[0].acronym).toEqual("C.C.");
    expect(service.countryDocumentType(countries, "Colombia")[1].acronym).toEqual("C.E.");
    expect(service.countryDocumentType(countries, "Argentina")[0].acronym).toEqual("C.I.");
    expect(service.countryDocumentType(countries, "Argelia").length).toBe(0);
  });
});
