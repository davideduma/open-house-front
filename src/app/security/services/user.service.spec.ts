import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { UserRepository } from '../repositories/UserRepository';

describe('UserService', () => {
  let service: UserRepository;
  let http:HttpTestingController;

  let validUser:User;
  let validUserWithToken:User;
  let validUserNoID:User;
  let invalidUser:User;
  let invalidUserNoCredentials:User;

  beforeEach(() => {
    environment.testing = true;
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    http = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    validUser = new User(require('src/assets/testsSupport/security/JSON/validUserNoToken.json'));
    validUserNoID = new User(require('src/assets/testsSupport/security/JSON/userNoID.json'));
    validUserWithToken =  new User(require('src/assets/testsSupport/security/JSON/validUserWithToken.json'));
    invalidUser =  new User(require('src/assets/testsSupport/security/JSON/invalidUser.json'));
    invalidUserNoCredentials = new User(require('src/assets/testsSupport/security/JSON/invalidUserNoCredentials.json'));
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isUserAuthenticated - SUCCESS', () => {
    service.isUserAuthenticated(validUserWithToken).subscribe(
      response => expect(response).toBeTrue()
    );
    
    const req = http.expectOne("src/assets/testsSupport/security/user/1/valid");

    expect(req.request.method).toBe("POST");

    req.flush(true, {status:200, statusText: "OK"});
  });

  it ('isUserAuthenticated - NO CREDENTIALS', () => {
    service.isUserAuthenticated(invalidUserNoCredentials).subscribe(
      response => expect(response).toBeFalse()
    );

    const req = http.expectNone("src/assets/testsSupport/security/user/20/valid");
  });

  it ('isUserAuthenticated - NO USERID', () => {
    service.isUserAuthenticated(validUserNoID).subscribe(
      response => expect(response).toBeFalse()
    );

    const req = http.expectNone("src/assets/testsSupport/security/user//valid");
  });
});
