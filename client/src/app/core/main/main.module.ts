import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyOptionsModule } from './faculty-options/faculty-options.module';
import { LoginRegistrationModule } from './login-registration/login-registration.module';
import { CoursesComponent } from './courses/courses.component';
import { DummyComponent } from './dummy/dummy.component';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { StudentOptionsComponent } from './student-options/student-options.component';
import { FormsModule } from '@angular/forms';
import { PrimeModule } from 'src/app/external/prime.module';
import { MaterialModule } from 'src/app/external/material.module';
import { ReusableModule } from 'src/app/reusable/reusable.module';
import { AdminOptionsComponent } from './admin-options/admin-options.component';
import { AllDirectivesModule } from '../directives/all-directives.module';

@NgModule({
  declarations: [
    CoursesComponent,
    DummyComponent,
    HomeComponent,
    PaymentComponent,
    StudentOptionsComponent,
    AdminOptionsComponent
  ],
  imports: [
    CommonModule,
    FacultyOptionsModule,
    LoginRegistrationModule,
    FormsModule,
    PrimeModule,
    MaterialModule,
    ReusableModule,
    AllDirectivesModule
  ],
  exports: [
    FacultyOptionsModule,
    LoginRegistrationModule,
    CommonModule,
    FormsModule,
    AllDirectivesModule
  ]

})
export class MainModule { }
