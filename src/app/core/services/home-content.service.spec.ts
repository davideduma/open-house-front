import { TestBed } from '@angular/core/testing';
import { HomeContentService } from './home-content.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

describe('HomeContentService', () => {
    let service: HomeContentService;
    let httpMock: HttpTestingController;
    let router: jasmine.SpyObj<Router>;
    let homeContentService: HomeContentService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [
            ReactiveFormsModule,
            RouterModule,
            FormsModule,
            HttpClientTestingModule
          ],
          providers: [
            HomeContentService, // Use the actual service instead of the spy object
            { provide: Router, useFactory: () => jasmine.createSpyObj<Router>('router', ['navigate']) }
          ]
        }).compileComponents();
      
        service = TestBed.inject(HomeContentService);
        httpMock = TestBed.inject(HttpTestingController);
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
      });
      
  
    afterEach(() => {
      httpMock.verify();
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  
    
    it('should get connections', () => {
        const userId = 'testUser';
        const expectedData = require('../../../../src/assets/testsSupport/home-content/home-content-conections.json');
      
        if (!environment.testing) {
          service.getConnection(userId).subscribe(data => {
            expect(data).toEqual(expectedData);
          });
      
          const req = httpMock.expectOne(`https://prueba-backend/home-connections/${userId}`);
          expect(req.request.method).toBe('GET');
          req.flush(expectedData);
        } else {
          service.getConnection(userId).subscribe(data => {
            expect(data).toEqual(expectedData);
          });
        }
      });
      
      it('should get events', () => {
        const userId = 'testUser';
        const expectedData = [
            {
            title: 'Conferencia de telas 2023',
            date: '15 de junio de 2023',
            image: 'assets/event1.jpg'
            },
            {
            title: 'Taller de innovacion moda',
            date: '20 de junio de 2023',
            image: 'assets/event2.jpg'
            },
            {
            title: 'Meetup de diseñadores',
            date: '25 de junio de 2023',
            image: 'assets/event3.jpg'
            },
            {
               title:"Conferencia de telas 2024",
               "date":"15 de junio de 2024",
               image:"assets/event1.jpg"
            },
            {
               title:"Taller de innovacion moda",
               "date":"20 de junio de 2024",
               image:"assets/event2.jpg"
            },
            {
               title:"Meetup de diseñadores",
               "date":"25 de junio de 2024",
               image:"assets/event3.jpg"
            },
            {
               title:"Conferencia de telas 2025",
               "date":"15 de junio de 2025",
               image:"assets/event1.jpg"
            },
            {
               title:"Taller de innovacion moda",
               "date":"20 de junio de 2025",
               image:"assets/event2.jpg"
            },
            {
               title:"Meetup de diseñadores",
               "date":"25 de junio de 2025",
               image:"assets/event3.jpg"
            }
        ];
      
        if (!environment.testing) {
          service.getEvents(userId).subscribe(data => {
            expect(data).toEqual(expectedData);
          });
      
          const req = httpMock.expectOne(`https://prueba-backend/home-events/${userId}`);
          expect(req.request.method).toBe('GET');
          req.flush(expectedData);
        } else {
          service.getEvents(userId).subscribe(data => {
            expect(data).toEqual(expectedData);
          });
        }
      });
      
      it('should get notifications', () => {
        const userId = 'testUser';
        const expectedData = [
          {
            text: 'Juan Pérez le ha dado me gusta a tu publicación.',
            date: 'Hace 2 horas',
            image: 'assets/notification1.jpg'
          },
          {
            text: 'María González ha comentado en tu publicación.',
            date: 'Hace 4 horas',
            image: 'assets/notification2.jpg'
          },
          {
            text: 'Nueva inversion disponible en tu área.',
            date: 'Hace 8 horas',
            image: 'assets/notification3.jpg'
          },
          {
             "text":"Juan Pérez le ha dado me gusta a tu publicación.",
             "date":"Hace 2 horas",
             image:"assets/notification1.jpg"
          },
          {
             "text":"María González ha comentado en tu publicación.",
             "date":"Hace 4 horas",
             image:"assets/notification2.jpg"
          },
          {
             "text":"Nueva inversion disponible en tu área.",
             "date":"Hace 8 horas",
             image:"assets/notification3.jpg"
          },
          {
             "text":"Juan Pérez le ha dado me gusta a tu publicación.",
             "date":"Hace 2 horas",
             image:"assets/notification1.jpg"
          },
          {
             "text":"María González ha comentado en tu publicación.",
             "date":"Hace 4 horas",
             image:"assets/notification2.jpg"
          },
          {
             "text":"Nueva inversion disponible en tu área.",
             "date":"Hace 8 horas",
             image:"assets/notification3.jpg"
          },
          {
             "text":"Juan Pérez le ha dado me gusta a tu publicación.",
             "date":"Hace 2 horas",
             image:"assets/notification1.jpg"
          },
          {
             "text":"María González ha comentado en tu publicación.",
             "date":"Hace 4 horas",
             image:"assets/notification2.jpg"
          },
          {
             "text":"Nueva inversion disponible en tu área.",
             "date":"Hace 8 horas",
             image:"assets/notification3.jpg"
          }
        ];
      
        if (!environment.testing) {
          service.getNotifications(userId).subscribe(data => {
            expect(data).toEqual(expectedData);
          });
      
          const req = httpMock.expectOne(`https://prueba-backend/home-notifications/${userId}`);
          expect(req.request.method).toBe('GET');
          req.flush(expectedData);
        } else {
          service.getNotifications(userId).subscribe(data => {
            expect(data).toEqual(expectedData);
          });
        }
      });
      

      
  });
  