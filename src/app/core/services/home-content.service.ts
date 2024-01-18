import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/Profile';
import { LikesByPost } from '../models/LikeByPost';
import { CommentPeople } from '../models/CommentPeople';

@Injectable({
  providedIn: 'root'
})
export class HomeContentService {

    connection: any;    
    events: any;
    notifications: any;
    likesByPost: LikesByPost={
      id: "",
      likes: 0
    };

    constructor(private http: HttpClient) {
    
    }

    getConnection(userId: string): Observable<any> {

        if (! environment.testing) {
    
          const url = `https://prueba-backend/home-connections/${userId}`;
          return this.http.get(url);
    
        }
        else{
          
        
          this.connection = require("../../../assets/testsSupport/home-content/home-content-conections.json");
          
    
          // Crear un nuevo observable y utilizar el operador `of` para emitir los datos de `this.chats`
          const observableChats = of(this.connection);
          
          // Retornar el nuevo observable
          return observableChats;
        }
    
    
    }

    getEvents(userId: string): Observable<any> {

        if (! environment.testing) {
    
          const url = `https://prueba-backend/home-events/${userId}`;
          return this.http.get(url);
    
        }
        else{
          
        
          this.events = require("../../../assets/testsSupport/home-content/home-content-events.json");
          
    
          // Crear un nuevo observable y utilizar el operador `of` para emitir los datos de `this.chats`
          const observableChats = of(this.events);
          
          // Retornar el nuevo observable
          return observableChats;
        }
    
    
    }

    getNotifications(userId: string): Observable<any> {

        if (! environment.testing) {
    
          const url = `https://prueba-backend/home-notifications/${userId}`;
          return this.http.get(url);
    
        }
        else{
          
        
          this.notifications = require("../../../assets/testsSupport/home-content/home-content-notifications.json");
          
    
          // Crear un nuevo observable y utilizar el operador `of` para emitir los datos de `this.chats`
          const observableChats = of(this.notifications);
          
          // Retornar el nuevo observable
          return observableChats;
        }
    }

    getPosts(userId: string): Observable<any> {
      if (! environment.testing) {  
        const url = `https://prueba-backend/home-post/${userId}`;
        return this.http.get(url);  
      }
      else{
        this.notifications = require("../../../assets/testsSupport/home-content/home-content-post.json");
          
        // Crear un nuevo observable y utilizar el operador `of` para emitir los datos de `this.chats`
        const observableChats = of(this.notifications);
        
        // Retornar el nuevo observable
        return observableChats;
      }
    }

  doLike(id: String): Observable<any>{
      if (! environment.testing) {
        const url = `https://prueba-backend/home-post-dolike`;
        return this.http.post(url, id);
      }
      else{
        this.likesByPost = require("../../../assets/testsSupport/home-content/likes-by-post.json");
        
        // Crear un nuevo observable y utilizar el operador `of` para emitir los datos de `this.chats`
        const result = of(this.likesByPost);
        
        // Retornar el nuevo observable
        return result;
      }
  }

  addComment(id: String, singleComment: CommentPeople): Observable<any>{


    if (! environment.testing) {
      const url = `https://prueba-backend/home-post-updateCommentById/${id}`;
      return this.http.post(url, singleComment);
    }
    else{
      this.likesByPost = require("../../../assets/testsSupport/home-content/generic-response.json");
      
      // Crear un nuevo observable y utilizar el operador `of` para emitir los datos de `this.chats`
      const result = of(this.likesByPost);
      
      // Retornar el nuevo observable
      return result;
    }
  }

}
