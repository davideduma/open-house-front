import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePublicationsComponent } from './home-publications.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';

describe('HomePublicationsComponent', () => {
  let component: HomePublicationsComponent;
  let fixture: ComponentFixture<HomePublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ HomePublicationsComponent ],
      providers: [DatePipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should display the list of posts', () => {
  //   component.posts = [
  //     { id: '1', imgUserPost: 'path/to/image1.jpg', userPost: 'User 1', ownerMural: 'Owner 1', resume: 'Resume 1', imgPost: 'path/to/image1.jpg', comment: 'Comment 1', likes: 1, commentPeople: [] },
  //     { id: '2', imgUserPost: 'path/to/image2.jpg', userPost: 'User 2', ownerMural: 'Owner 2', resume: 'Resume 2', imgPost: 'path/to/image2.jpg', comment: 'Comment 2', likes: 2, commentPeople: [] }
  //   ];
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   const postComments = compiled.querySelectorAll('.main-content .posts .post p');
  //   expect(postComments[0].textContent).toContain('Resume 1');
  //   expect(postComments[1].textContent).toContain('Comment 1');
  // });

  
});
