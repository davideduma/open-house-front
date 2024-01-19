import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from 'src/app/security/models/User';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/Profile';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let http:HttpTestingController;

  let users:User[];

  beforeEach(() => {
    environment.testing = true;
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(SearchService);
    http = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    users = require("../../../assets/testsSupport/generals/search.json");
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getProfiles', () => {
    service.getUsers(["john"]).subscribe(
      (users: User[]) => {
        expect(users.length).toBe(2);
        expect(users[0].userName).toEqual("john_doe");
        expect(users[1].userName).toEqual("johnny_depp"); 
      }
    );

    const req = http.expectOne("../../../assets/testsSupport/generals/search.json");

    expect(req.request.method).toBe("POST");

    req.flush(users, {status:200, statusText: "OK"});
  });
});
