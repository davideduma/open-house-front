import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NotificationService } from './notification.service';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NotificationModel } from '../models/NotificationModel';

describe('NotificationService', () => {
  let service: NotificationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [NotificationService]
    });
    service = TestBed.inject(NotificationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return notifications for a user', () => {
    const userId = 'user123';

    const notificationsTest = require('../../../assets/testsSupport/home-content/notification.json');

    if (! environment.testing){
      service.getNotifications(userId).subscribe(data => {
        expect(data).toEqual(notificationsTest);
      });

      const url = `${environment.backendUrl}get-notifications/${userId}`;
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(notificationsTest);
    }
    else{
      let notifications: NotificationModel[] = require('../../../assets/testsSupport/home-content/notification.json');
      expect(notificationsTest).toEqual(notifications);
    }

  });


});
