import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestRegisterComponent } from './test-register/test-register.component';
import { MaterialModule } from 'src/app/external/material.module';
import { PrimeModule } from 'src/app/external/prime.module';
import { AllDirectivesModule } from '../../directives/all-directives.module';
import { FormsModule } from '@angular/forms';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ReusableModule } from 'src/app/reusable/reusable.module';



@NgModule({
  declarations: [TestRegisterComponent],
  imports: [
    CommonModule,
    PrimeModule,
    MaterialModule,
    FormsModule,
    AllDirectivesModule,
    ReusableModule
  ],
  exports: []
})
export class StudentOptionsModule { }
