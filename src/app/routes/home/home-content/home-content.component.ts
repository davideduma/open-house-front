import { Component, NgModule, OnInit } from '@angular/core';
import { HomeContentService } from 'src/app/core/services/home-content.service';
import { HomeContentConnection } from 'src/app/core/models/HomeContentConnection';
import { HomeContentEvent } from 'src/app/core/models/HomeContentEvents';
import { HomeContentNotification } from 'src/app/core/models/HomeContentNotifications';
import { HomeContentPost } from 'src/app/core/models/HomeContentPost';
import { LikesByPost } from 'src/app/core/models/LikeByPost';
import { CommentPeople } from 'src/app/core/models/CommentPeople';
import { DatePipe } from '@angular/common';
import { GenericResponse } from 'src/app/core/models/GenericResponse';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {

  public user: string = "";

  // public connections: any;
  public notifications: any;
  public events: any;
  // public posts: HomeContentPost[] = [];
  // public allConnections: any;
  public allNotifications: any;
  public allEvents: any;

  // public newComment: { [key: string]: string } = {};

  constructor(private homeContentService: HomeContentService,
              private datePipe: DatePipe){
  }

  ngOnInit(): void {
    //set user with local storage
    this.user = localStorage.getItem('userName') || "";

    console.log("user", this.user);

    this.loadEvents();
    this.loadNotifications();
    // this.loadPosts();
  }

  

  loadEvents(){
    this.homeContentService.getEvents(this.user).subscribe((response: HomeContentEvent) => {
      console.log("response eventos", response);

      this.allEvents = response;
      this.events = response;

      //filter connections to show only 3 connections
      this.events = this.events.filter(
        (events: any, index: number) => {
          return index < 3;
        }
      );

    },
    (error) => {
      console.error('Error', error);
    }
    );

  }


  loadNotifications(){
    this.homeContentService.getNotifications(this.user).subscribe((response: HomeContentNotification) => {
      console.log("response notificaciones", response);

      this.allNotifications = response;
      this.notifications = response;

      //filter connections to show only 3 connections
      this.notifications = this.notifications.filter(
        (notification: any, index: number) => {
          return index < 3;
        }
      );

    },
    (error) => {
      console.error('Error', error);
    }
    );
  }


  showAllNotifications(){
    this.notifications = this.allNotifications;
  }

  showAllEvents(){
    this.events = this.allEvents;
  }

}
