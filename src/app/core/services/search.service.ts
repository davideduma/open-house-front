import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/security/models/User';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/Profile';
import { SearchRepository } from '../repositories/SearchRepository';

@Injectable({
  providedIn: 'root'
})
export class SearchService implements SearchRepository {

  private url:string;
  private jsonFormat:string;

  constructor(private http: HttpClient) {
    this.url = environment.baseUrl;
    this.jsonFormat = "";
    if (environment.testing) {
      this.url = environment.testsUrl.search;
      this.jsonFormat = ".json";
    }
  }

  getUsers(keyWords: string[]): Observable<User[]> {
    let url:string = this.url + "search" + this.jsonFormat;
    return this.http.post<Profile[]>(url, keyWords);
  }
}
