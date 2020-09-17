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
import { AllDirectivesModule } from '../../directives/all-directives.module';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';


@NgModule({
  declarations: [
    LoginComponent,
    LoginRegistrationComponent,
    FacultyRegistrationComponent,
    RegistrationComponent,
    StudentRegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeModule,
    MaterialModule,
    RecaptchaModule,
    AllDirectivesModule
  ],
  exports: [
    LoginComponent,
    LoginRegistrationComponent,
    FacultyRegistrationComponent,
    RegistrationComponent,
    StudentRegistrationComponent
  ]
})
export class LoginRegistrationModule { }
