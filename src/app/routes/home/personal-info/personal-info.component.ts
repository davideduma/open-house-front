import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit{
  public user: string = "";
  
  
  ngOnInit(): void {
    this.user = localStorage.getItem('userName') || "";
  }
  
}
