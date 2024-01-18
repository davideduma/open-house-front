import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModelUsersToMessenger } from '../models/ModelUsersToMessenger';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  chats: any;
  resultTest: Observable<any> | undefined;

  constructor(private http: HttpClient) { 
  }

  loadMessagesForUser(userId: string): Observable<any> {

    if (! environment.testing) {

      const url = `https://prueba-backend/messages/${userId}`;
      return this.http.get(url);

    }
    else{
      
      switch (userId) {
        case "user_1":
            this.chats = require("../../../assets/testsSupport/messages/user_1.json");
            break;
        case "user_2":
            this.chats = require("../../../assets/testsSupport/messages/user_2.json");
          break;
        case "user_5":
          this.chats = require("../../../assets/testsSupport/messages/user_5.json");
          break;
        default:
          this.chats = [];           

          break;
      }

      // Crear un nuevo observable y utilizar el operador `of` para emitir los datos de `this.chats`
      const observableChats = of(this.chats);
      
      // Retornar el nuevo observable
      return observableChats;
    }


  }

  searchUsers(searchQuery: string) {
    
    if(environment.testing == false){
      
      const url = `https://your-api-url.com/api/search-users?query=${searchQuery}`;
      return this.http.get(url);
    }
    else{
      // Datos ficticios de usuarios
      const fakeUsers = require("../../../assets/testsSupport/messages/users_fake.json");

      // Filtra los usuarios ficticios en función del searchQuery
      const filteredUsers = fakeUsers.filter((user: ModelUsersToMessenger) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Devuelve los usuarios filtrados como un observable
      return of(filteredUsers);
    }

  }

  
}