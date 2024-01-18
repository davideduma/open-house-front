import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public showLandMark: string | null = '';
  public activateClassHome: boolean = true;
  public user: string = "";

  constructor(private router: Router, private route: ActivatedRoute) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLandMark = this.route.snapshot.paramMap.get('nombre');

        if(this.showLandMark == 'comeFromMessenger'){
          this.activateClassHome = false;
        }
        else if(this.showLandMark == 'comeFromHome'){
          this.activateClassHome = true;
        }

      }
    });

   }

  ngOnInit(): void {
    this.user = localStorage.getItem('userName') || "";

    this.showLandMark = this.route.snapshot.paramMap.get('nombre');

    console.log("showHome", this.showLandMark);
  }


}
