import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RegisterValidations } from 'src/app/security/validations/register.validations';
import { environment } from 'src/environments/environment';
import { Country } from '../models/Country';
import { NationalDocument } from '../models/NationalDocument';
import { Profile } from '../models/Profile';
import { RegisterRepository } from '../repositories/RegisterRepository';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends RegisterValidations implements RegisterRepository {

  url:string;
  jsonFormat:string;

  constructor(private http:HttpClient) {
    super();
    this.url = environment.baseUrl;
    this.jsonFormat = "";
    if (environment.testing) {
      this.url = environment.testsUrl.register;
      this.jsonFormat = ".json";
    }
  }

  newUser(profile:Profile): Observable<Profile> {
    let url:string = this.url + "new-user";
    return this.http.post<Profile>(url, profile);
  }

  countries(): Observable<Country[]> {
    let url:string = this.url + "countries" + this.jsonFormat;
    return this.http.get<Country[]>(url);
  }

  countryDocumentType(countries:Country[], countryName:string): Array<NationalDocument> {
    for (let country of countries) {
      if (country.name === countryName) {
        return country.documentTypes;
      }
    }
    return new Array();
  }

}
