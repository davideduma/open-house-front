import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HomeContentConnection } from 'src/app/core/models/HomeContentConnection';
import { HomeContentService } from 'src/app/core/services/home-content.service';

@Component({
  selector: 'app-home-bussiness-red',
  templateUrl: './home-bussiness-red.component.html',
  styleUrls: ['./home-bussiness-red.component.scss']
})
export class HomeBussinessRedComponent implements OnInit{

  public connections: any;
  public allConnections: any;
  public user: string = "";
  
  constructor(private homeContentService: HomeContentService,
    private datePipe: DatePipe){
  }

  ngOnInit(): void {
    this.loadConnections();
  }

  loadConnections(){
    //set user with local storage
    this.user = localStorage.getItem('userName') || "";

    this.homeContentService.getConnection(this.user).subscribe((response: HomeContentConnection) => {
      console.log("response connections", response);

      this.allConnections = response;
      this.connections = response;

      //filter connections to show only 3 connections
      this.connections = this.connections.filter(
        (connection: any, index: number) => {
          return index < 3;
        }
      );

    },
    (error) => {
      console.error('Error', error);
    }
    );

  }

  showAllConnections(){
    this.connections = this.allConnections;
  }

}
