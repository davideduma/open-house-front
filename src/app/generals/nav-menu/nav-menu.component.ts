import { Component, ElementRef, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { NavBarService } from 'src/app/core/services/nav-bar.service';
import { SearchService } from 'src/app/core/services/search.service';
import { User } from 'src/app/security/models/User';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit{

  searchContent:string;
  searchResults:User[];
  imgUrl:string;
  usuario: string = "";

  
  constructor(private searchService: SearchService,
              private navBarService: NavBarService,
              private elementRef: ElementRef) {
                
    this.searchContent = "";
    this.searchResults = new Array();
    this.imgUrl = environment.imgUrl;
  }

  ngOnInit() {
    this.usuario = localStorage.getItem('userName') || '';
  }

  getUsers(event: Event) {
    let keyWords:string[] = this.searchContent.split(" ");

    this.searchService.getUsers(keyWords).subscribe(
      (users:User[]) => {
        this.searchResults = users;
      }
    );
  }

  openNotifications(): void {
    const bellIcon = this.elementRef.nativeElement.querySelector('.option');
    this.navBarService.openNotificationPopup(bellIcon);
  }

}
