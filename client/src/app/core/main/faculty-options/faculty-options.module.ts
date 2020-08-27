import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyProfileEditComponent } from './faculty-profile-edit/faculty-profile-edit.component';
import { FacultyOptionsComponent } from './faculty-options.component';
import { ViewAllFacultyComponent } from './view-all-faculty/view-all-faculty.component';
import { FormsModule }   from '@angular/forms';
import { PrimeModule } from 'src/app/external/prime.module';
import { MaterialModule } from 'src/app/external/material.module';


@NgModule({
  declarations: [
    FacultyProfileEditComponent,
    ViewAllFacultyComponent,
    FacultyOptionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeModule,
    MaterialModule
  ],
  entryComponents: [
    FacultyProfileEditComponent
  ]
})
export class FacultyOptionsModule { }
