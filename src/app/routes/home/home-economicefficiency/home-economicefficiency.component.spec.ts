import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEconomicefficiencyComponent } from './home-economicefficiency.component';

describe('HomeEconomicefficiencyComponent', () => {
  let component: HomeEconomicefficiencyComponent;
  let fixture: ComponentFixture<HomeEconomicefficiencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeEconomicefficiencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEconomicefficiencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
