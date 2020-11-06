import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestRegisterComponent } from './test-register/test-register.component';
import { MaterialModule } from 'src/app/external/material.module';
import { PrimeModule } from 'src/app/external/prime.module';
import { AllDirectivesModule } from '../../directives/all-directives.module';
import { FormsModule } from '@angular/forms';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ReusableModule } from 'src/app/reusable/reusable.module';
import { ViewRosterComponent } from './view-roster/view-roster.component';
import { ViewStudyMaterialComponent } from './view-study-material/view-study-material.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import 'core-js/proposals/promise-all-settled';
import { RecordedSessionsComponent } from './recorded-sessions/recorded-sessions.component';
import { StudentProfileEditComponent } from './student-profile-edit/student-profile-edit.component';
import { StudentTestResultComponent } from './student-test-result/student-test-result.component';
import { ViewOrderHistComponent } from './view-order-hist/view-order-hist.component'

@NgModule({
  declarations: [TestRegisterComponent, ViewRosterComponent, ViewStudyMaterialComponent, RecordedSessionsComponent, StudentProfileEditComponent, StudentTestResultComponent, ViewOrderHistComponent],
  imports: [
    CommonModule,
    PrimeModule,
    MaterialModule,
    FormsModule,
    AllDirectivesModule,
    ReusableModule,
    PdfViewerModule
  ],
  exports: [],
  entryComponents: [
    StudentProfileEditComponent
  ]
})
export class StudentOptionsModule { }
