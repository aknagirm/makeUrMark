import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOptionsComponent } from './admin-options.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/external/material.module';
import { PrimeModule } from 'src/app/external/prime.module';
import { AllDirectivesModule } from '../../directives/all-directives.module';
import { ReusableModule } from 'src/app/reusable/reusable.module';
import { GradeBoardSubBatchComponent } from './grade-board-sub-batch/grade-board-sub-batch.component';
import { TestTutionFeesComponent } from './test-tution-fees/test-tution-fees.component';
import { SubMonDiscountComponent } from './sub-mon-discount/sub-mon-discount.component';
import { RosterHolidayComponent } from './roster-holiday/roster-holiday.component';

@NgModule({
  declarations: [
    AdminOptionsComponent,
    GradeBoardSubBatchComponent,
    TestTutionFeesComponent,
    SubMonDiscountComponent,
    RosterHolidayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeModule,
    MaterialModule,
    AllDirectivesModule,
    ReusableModule
  ]
})
export class AdminOptionsModule { }
