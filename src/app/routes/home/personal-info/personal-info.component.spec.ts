import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { PersonalInfoComponent } from './personal-info.component';

describe('PersonalInfoComponent', () => {
  let component: PersonalInfoComponent;
  let fixture: ComponentFixture<PersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalInfoComponent ],
      imports: [
        RouterTestingModule,
        MatCardModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalInfoComponent);
    component = fixture.componentInstance;
    component.user = 'Nombre de Usuario';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[L2] - Deberia de mostrar la imagen por default', () => {
    const img = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(img.src).toContain('user_unknown.jpg');
  });

  it('[L2] - Deberia de tener un link a user profile', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.getAttribute('routerLink')).toBe('/userProfile');
  });

  it('[L2] - Deberia tener la correcta card class', () => {
    const card = fixture.debugElement.query(By.css('mat-card')).nativeElement;
    expect(card.classList).toContain('profile-card');
  });

  it('[L2] - Deberia usar un ALT para definir la descripcion de la imagen como "Foto de perfil"', () => {
    const img = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(img.alt).toBe('Foto de perfil');
  });

  it('[L2] - Debe de usar un mat-card-content, su contenido debe ser "StartUp de venta de telas"', () => {
    const p = fixture.debugElement.query(By.css('mat-card-content p')).nativeElement;
    expect(p.textContent).toBe('StartUp de venta de telas');
  });


});
