import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { 
  }

  getNotifications(userId: string): Observable<any> {

    if (! environment.testing) {
      const url = `${environment.backendUrl}get-notifications/${userId}`;
      return this.http.get(url);
    }
    else{
      let notifications = require('../../../assets/testsSupport/home-content/notification.json');
 
      // Crear un nuevo observable y utilizar el operador `of` para emitir los datos simulados
      const observable = of(notifications);
      
      // Retornar el nuevo observable
      return observable;
    }
  }

}
