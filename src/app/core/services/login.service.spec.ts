import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from 'src/app/security/models/User';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/Profile';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let http:HttpTestingController;

  let johnProfile:Profile;
  let johnUser:User;

  beforeEach(() => {
    environment.testing = true;
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LoginService);
    http = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    johnProfile = new Profile(require("src/assets/testsSupport/login/profile/profile_1_fake.json"));
    johnUser = new Profile(require("src/assets/testsSupport/login/profile/user.json"));
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('signIn - should return the correct profile', (done) => {
    service.signIn(johnUser).subscribe(profile => {
        expect(profile.userId).toEqual(johnProfile.userId);
        expect(profile.userName).toEqual(johnProfile.userName);
        done();
    });
  });
  
});
