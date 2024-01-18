import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchService } from 'src/app/core/services/search.service';
import { HomeComponent } from 'src/app/routes/home/home.component';
import { User } from 'src/app/security/models/User';

import { NavMenuComponent } from './nav-menu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  let service:jasmine.SpyObj<SearchService>;
  let router:jasmine.SpyObj<Router>;

  let users:User[];

  let querySelector = (element:string) => {
    return fixture.nativeElement.querySelector("nav " + element);
  };

  let querySelectorAll = (element:string) => {
    return fixture.nativeElement.querySelectorAll("nav " + element);
  };

  let routes:Routes = [
    { path:"home", component: HomeComponent }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ],
      declarations: [ NavMenuComponent ],
      //imports: [RouterTestingModule.withRoutes(routes)],
      providers: [
        { provide: SearchService, useFactory: () => jasmine.createSpyObj<SearchService>("searchService", ["getUsers"]) },
        { provide: Router, useFactory: () => jasmine.createSpyObj<Router>("router", ["navigate"]) }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SearchService) as jasmine.SpyObj<SearchService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  beforeEach(() => {
    users = [
      new User({
        userName: "john"
      }),
      new User({
        userName: "johnny"
      })
    ];

    service.getUsers.withArgs(["john"]).and.returnValues(new Observable(
      content => content.next(users)
    ));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Logo', () => {
    let logoClass:HTMLDivElement = querySelectorAll("div.options div.option")[0];
    expect(logoClass).toBeTruthy();
    expect(logoClass.getAttribute('routerLink')).toEqual("/home");
  });

  it('search widget', () => {
    let searchWidget:HTMLDivElement = querySelector("div.search");

    expect(searchWidget).toBeTruthy();

    let input:HTMLInputElement = querySelector("div.search input");
    expect(input).toBeTruthy();   

  });

  it('search functionality', () => {
    let enterEvent: Event = new KeyboardEvent("keyup", {
      key: "Enter",
      code: "Enter"
    });

    component.searchContent = "john";
    component.getUsers(enterEvent);

    expect(service.getUsers).toHaveBeenCalled();
    expect(component.searchResults).toBe(users);
  });

  it('Inicio', () => {
    let inicio:HTMLDivElement = querySelectorAll("div.options div.option")[0];
    expect(inicio).toBeTruthy();
    expect(inicio.getAttribute("routerLink")).toEqual("/home");
  });

  it('Red', () => {
    let red:HTMLDivElement = querySelectorAll("div.options div.option")[1];
    expect(red).toBeTruthy();
    expect(red.getAttribute("routerLink")).toEqual("/network");
  });

  it('Oportunidades', () => {
    let oportunidades:HTMLDivElement = querySelectorAll("div.options div.option")[2];
    expect(oportunidades).toBeTruthy();
    expect(oportunidades.getAttribute("routerLink")).toEqual("/opportunities");
  });

  it('Mensajes', () => {
    let mensajes:HTMLDivElement = querySelectorAll("div.options div.option")[3];
    expect(mensajes).toBeTruthy();
  });

  it('Notificaciones', () => {
    let notificaciones:HTMLDivElement = querySelectorAll("div.options div.option")[4];
    expect(notificaciones).toBeTruthy();
    //expect(notificaciones.getAttribute("routerLink")).toEqual("/network");
  });

  it('Yo', () => {
    let me:HTMLDivElement = querySelector("div.options #me");
    expect(me).toBeTruthy();
  });

});
