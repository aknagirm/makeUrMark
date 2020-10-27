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
import { ViewAllUsersComponent } from './view-all-users/view-all-users.component';
import { ViewSpecificUserComponent } from './view-specific-user/view-specific-user.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdminOptionsComponent,
    GradeBoardSubBatchComponent,
    TestTutionFeesComponent,
    SubMonDiscountComponent,
    RosterHolidayComponent,
    ViewAllUsersComponent,
    ViewSpecificUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeModule,
    MaterialModule,
    AllDirectivesModule,
    ReusableModule,
    RouterModule
  ]
})
export class AdminOptionsModule { }
