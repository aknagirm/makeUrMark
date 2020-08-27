import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRegistrationComponent } from './login-registration.component';
import { RegistrationComponent } from './registration/registration.component';
import { FacultyRegistrationComponent } from './faculty-registration/faculty-registration.component';
import { FormsModule } from '@angular/forms';
import { PrimeModule } from 'src/app/external/prime.module';
import { MaterialModule } from 'src/app/external/material.module';
import { RecaptchaModule } from 'ng-recaptcha';


@NgModule({
  declarations: [
    LoginComponent,
    LoginRegistrationComponent,
    FacultyRegistrationComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeModule,
    MaterialModule,
    RecaptchaModule,
  ],
  exports: [
    LoginComponent,
    LoginRegistrationComponent,
    FacultyRegistrationComponent,
    RegistrationComponent
  ]
})
export class LoginRegistrationModule { }
