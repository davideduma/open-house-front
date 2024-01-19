import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBussinessRedComponent } from './home-bussiness-red.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';

describe('HomeBussinessRedComponent', () => {
  let component: HomeBussinessRedComponent;
  let fixture: ComponentFixture<HomeBussinessRedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ HomeBussinessRedComponent ],
      providers: [DatePipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBussinessRedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should display the list of connections', () => {
  //   component.connections = [
  //     { image: 'path/to/image1.jpg', name: 'Connection 1', title: 'Title 1' },
  //     { image: 'path/to/image2.jpg', name: 'Connection 2', title: 'Title 2' }
  //   ];
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   const connectionNames = compiled.querySelectorAll('.main-content .network mat-list-item h4');
  //   expect(connectionNames[0].textContent).toContain('Connection 1');
  //   expect(connectionNames[1].textContent).toContain('Connection 2');
  // });
  
});
