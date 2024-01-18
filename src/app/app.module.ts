import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './routes/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './routes/register/register.component';
import { HomeComponent } from './routes/home/home.component';
import { FooterComponent } from './generals/footer/footer.component';
import { NavMenuComponent } from './generals/nav-menu/nav-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { HomeContentComponent } from './routes/home/home-content/home-content.component';
import { DatePipe } from '@angular/common';
import { HomePublicationsComponent } from './routes/home/home-publications/home-publications.component';
import { HomeEconomicefficiencyComponent } from './routes/home/home-economicefficiency/home-economicefficiency.component';
import { HomeEconomicsIndicatorsComponent } from './routes/home/home-economics-indicators/home-economics-indicators.component';
import { HomeBussinessRedComponent } from './routes/home/home-bussiness-red/home-bussiness-red.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FooterComponent,
    NavMenuComponent,
    HomeContentComponent,
    HomePublicationsComponent,
    HomeEconomicefficiencyComponent,
    HomeEconomicsIndicatorsComponent,
    HomeBussinessRedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatRippleModule,
    MatDividerModule,
    MatToolbarModule,
    MatDialogModule,
    MatCardModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
