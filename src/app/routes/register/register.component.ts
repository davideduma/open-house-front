import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterForm } from 'src/app/core/forms/RegisterForm';
import { Country } from 'src/app/core/models/Country';
import { NationalDocument } from 'src/app/core/models/NationalDocument';
import { Profile } from 'src/app/core/models/Profile';
import { RegisterService } from 'src/app/core/services/register.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  registerForm:RegisterForm;

  countries:Array<Country>;
  documentTypes!:Array<NationalDocument>;

  profile!:Profile;

  passwordMatching:boolean;
  generalError: boolean;
  existingUser: boolean;

  imgUrl:string;

  constructor(private registerService: RegisterService,
      private router:Router) {
    this.registerForm = new RegisterForm();
    this.countries = new Array();
    this.passwordMatching = true;
    this.generalError = false;
    this.existingUser = false;
    this.imgUrl = environment.imgUrl;
  }

  ngOnInit() {
    //this.registerForm = new RegisterForm();
    this.registerService.countries().subscribe({
      next: (countries:Country[]) => {
        this.countries = countries;
        this.documentTypes = this.countries[0].documentTypes;
        this.registerForm.controls["country"].setValue(this.countries[0].name);
        this.registerForm.controls["documentType"].setValue(this.documentTypes[0].type);
      }
    });
  }

  selectedCountry(event: Event):void {
    let countryName:string = (event.target as HTMLSelectElement).value;
    this.documentTypes = this.registerService.countryDocumentType(this.countries, countryName);

    this.registerForm.controls["country"].setValue(countryName);
    this.registerForm.controls["documentType"].setValue(this.documentTypes[0].type);
  }

  registerNewUser(): void {
    //1. Evaluate matching passwords
    this.passwordMatching = this.registerForm.passwordMatchEvaluation();
    if (this.passwordMatching && this.registerForm.valid) {
      //2. Set profile object
      let profile:Profile = this.getProfileData();
      //3. Register new user!
      this.newUser(profile);
    }
  }

  return(): void {
    this.router.navigate([""]);
  }

  private getProfileData(): Profile {
    return new Profile({
      firstName: this.registerForm.controls["firstName"].value,
      lastName: this.registerForm.controls["lastName"].value,
      country: this.registerForm.controls["country"].value,
      documentType: this.registerForm.controls["documentType"].value,
      documentNumber: this.registerForm.controls["documentNumber"].value,
      email: this.registerForm.controls["email"].value,
      password: this.registerForm.controls["password"].value,
      userName: this.registerForm.controls["userName"].value
    });
  }

  private newUser(profile:Profile): void {
    this.registerService.newUser(profile).subscribe({
      next: (registeredProfile:Profile) => {
        this.profile = registeredProfile;
        this.router.navigate([this.profile.userName]);
      },
      error: (error) => {
        if (error.status === 500) {
          this.existingUser = false;
          this.generalError = true;
        } else {
          this.existingUser = true;
          this.generalError = false;
        }
      }
    });
  }
}
