import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePublicationsComponent } from './home-publications.component';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeContentService } from 'src/app/core/services/home-content.service';

describe('HomePublicationsComponent', () => {
  let component: HomePublicationsComponent;
  let fixture: ComponentFixture<HomePublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomePublicationsComponent
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        DatePipe
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[L1] - Debe existir un boton por publicacion con id = 1 cuyo label en pantalla sea mensaje', () => {
    const commentButton = fixture.debugElement.query(By.css('button[id="1"]')).nativeElement;
    expect(commentButton.textContent).toEqual('Mensaje');
  });

  it('[L1] - Debe existir un boton por publicacion con id = 2 cuyo label en pantalla sea comentario', () => {
    const commentButton = fixture.debugElement.query(By.css('button[id="2"]')).nativeElement;
    expect(commentButton.textContent).toEqual('Comentario');
  });

  it('[L1] - el botón con ID "1" debe estar siempre dentro de <mat-card-actions>', () => {
    const matCardActions = fixture.debugElement.query(By.css('mat-card-actions'));
    const commentButton = fixture.debugElement.query(By.css('mat-card-actions button[id="1"]'));

    expect(commentButton).toBeTruthy();
    expect(matCardActions).toBeTruthy();
    expect(matCardActions.nativeElement.contains(commentButton.nativeElement)).toBeTrue();
  });

  it('[L1] - el botón con ID "2" debe estar siempre dentro de <div class="text-comments">', () => {
    const textCommentsDiv = fixture.debugElement.query(By.css('div.text-comments'));
    const commentButton = fixture.debugElement.query(By.css('div.text-comments button[id="2"]'));

    expect(commentButton).toBeTruthy();
    expect(textCommentsDiv).toBeTruthy();
    expect(textCommentsDiv.nativeElement.contains(commentButton.nativeElement)).toBeTrue();
  });

  it('[L1] - el botón con ID "2" debe estar siempre dentro de <div class="text-comments"> y tener color="primary"', () => {
    const commentButton = fixture.debugElement.query(By.css('div.text-comments button[id="2"]'));
    expect(commentButton).toBeTruthy();
    expect(commentButton.attributes['color']).toEqual('primary');
  });

  it('[L1] - El boton con ID "1" deben llamar a addComment al hacer clic', () => {
    spyOn(component, 'addComment');
    const button1 = fixture.debugElement.query(By.css('button[id="1"]')).nativeElement;
    button1.click();
    expect(component.addComment).toHaveBeenCalled();
  });

  it('[L1] - El boton con ID "2" deben llamar a addComment al hacer clic', () => {
    spyOn(component, 'addComment');
    const button1 = fixture.debugElement.query(By.css('button[id="2"]')).nativeElement;
    button1.click();
    expect(component.addComment).toHaveBeenCalled();
  });
  
  it('[L1] - debe existir al menos un mat-card para las publicaciones', () => {
  fixture.detectChanges();
  const postsElements = fixture.debugElement.queryAll(By.css('mat-card.post'));
  expect(postsElements.length).toBeGreaterThan(0);
  });

  it('[L1] - cada publicación debe tener una imagen de usuario', () => {
    fixture.detectChanges();
    const userImages = fixture.debugElement.queryAll(By.css('mat-card.post mat-card-header img.post-author-image'));
    expect(userImages.length).toBeGreaterThan(0);
  });
  
  it('[L1] - debe mostrar el nombre del usuario en la publicación', () => {
    fixture.detectChanges();
    const userName = fixture.debugElement.query(By.css('mat-card.post mat-card-header .post-author-info h3'));
    expect(userName).toBeTruthy();
  });

  it('[L1] - debe haber un botón "Me gusta" en cada publicación', () => {
    fixture.detectChanges();
    const likeButtons = fixture.debugElement.queryAll(By.css('mat-card.post mat-card-actions button'));
    expect(likeButtons.some(button => button.nativeElement.textContent.includes('Me gusta'))).toBeTrue();
  });

  it('[L1] - el botón con ID "1" debe contener el texto "Mensaje"', () => {
    fixture.detectChanges();
    const messageButton = fixture.debugElement.query(By.css('button[id="1"]')).nativeElement;
    expect(messageButton.textContent).toContain('Mensaje');
  });

  it('[L1] - el botón con ID "2" debe tener el atributo color establecido en "primary"', () => {
    fixture.detectChanges();
    const messageButton = fixture.debugElement.query(By.css('button[id="2"]')).nativeElement;
    expect(messageButton.getAttribute('color')).toEqual('primary');
  });

  it('[L1] - debe existir una sección de comentarios en cada publicación', () => {
    fixture.detectChanges();
    const commentsSection = fixture.debugElement.queryAll(By.css('mat-card.post .comments-section'));
    expect(commentsSection.length).toBeGreaterThan(0);
  });

  it('[L1] - debe existir un input para añadir comentarios en cada publicación', () => {
    fixture.detectChanges();
    const commentInputs = fixture.debugElement.queryAll(By.css('mat-card.post .text-comments .comment-input textarea'));
    expect(commentInputs.length).toBeGreaterThan(0);
  });

  


});
