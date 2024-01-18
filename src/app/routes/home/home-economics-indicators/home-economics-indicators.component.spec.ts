import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEconomicsIndicatorsComponent } from './home-economics-indicators.component';

describe('HomeEconomicsIndicatorsComponent', () => {
  let component: HomeEconomicsIndicatorsComponent;
  let fixture: ComponentFixture<HomeEconomicsIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeEconomicsIndicatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEconomicsIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
