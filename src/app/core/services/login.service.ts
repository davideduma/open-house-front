import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/security/models/User';
import { SecurityValidations } from 'src/app/security/validations/security.validations';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/Profile';
import { LoginRepository } from '../repositories/LoginRepository';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends SecurityValidations implements LoginRepository {

  private urlLogin:string;

  constructor(private http:HttpClient) {
    super();
    this.urlLogin = environment.backendUrl + "/sign-in";
  }
  

  signIn(user: User): Observable<Profile> {

    //Validate variable environment.testing
    if(!environment.testing){
        return this.http.post<Profile>(this.urlLogin, user);
    }
    else{
      let resultado: any = require("../../../assets/testsSupport/login/profile/profile_1_fake.json");
      return of(resultado);
    }
  }

  signOut(user: User): Observable<void> {
    if (!this.isSecurityTokenTrustworthy(user)) {
      throw new Error('Security Token not detected.');
    }
    return this.http.post<void>(this.urlLogin, user);
  }

  /*
  whoAmI(securityToken: string = "", user: User | undefined = undefined): Observable<Profile> {
    if (securityToken.length === 0 && user !== undefined) {
      securityToken = user.securityToken;
    }
    if (securityToken.length > 0) {
      //Set GET Method to return profile info
    }
    throw new Error('Method not implemented.');
  }
  */
}
