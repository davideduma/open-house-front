import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import { SecurityValidations } from '../validations/security.validations';

@Injectable({
  providedIn: 'root'
})
export class UserService extends SecurityValidations implements UserRepository {

  private url:string;

  constructor(private http:HttpClient) {
    super();
    this.url = environment.baseUrl;
    if (environment.testing) {
      this.url = environment.testsUrl.userSecurity;
    }
    this.url += "user/";
  }

  isUserAuthenticated(user:User): Observable<boolean> {
    let url:string = this.url + user.userId + "/valid";
    if (this.isSecurityTokenTrustworthy(user)) {
      return this.http.post<boolean>(url, user);
    }
    return new Observable(
      content => content.next(false)
    );
  }
}
