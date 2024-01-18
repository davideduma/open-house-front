import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserProfileModel } from '../models/UserProfileModel';
import { GenericResponse } from '../models/GenericResponse';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  saveUserProfile(userProfileModel: UserProfileModel): Observable<any> {

    //It's depend on enviroment
    if(!environment.testing){
      const url = `${environment.backendUrl}/saveUserProfile`;
      return this.http.post(url, userProfileModel);
    }
    else{
      const simulatedResponse: GenericResponse = 
      require('../../../assets/testsSupport/home-content/generic-response.json');

      return of(simulatedResponse);
    }

  }

  getUserProfile(userEmail: String): Observable<any> {
      
    //It's depend on enviroment
    if(!environment.testing){
      const url = `${environment.backendUrl}/getDataUserProfile/${userEmail}`;
      return this.http.get(url);
    }
    else{
      const simulatedResponse: UserProfileModel = 
      require('../../../assets/testsSupport/home-content/user-profile.json');

      return of(simulatedResponse);
    }
  }

}
