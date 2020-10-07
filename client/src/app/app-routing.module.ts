import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './core/main/payment/payment.component';
import { HomeComponent } from './core/main/home/home.component';
import { CoursesComponent } from './core/main/courses/courses.component';
import { FacultyRegistrationComponent } from './core/main/login-registration/faculty-registration/faculty-registration.component';
import { FacultyOptionsComponent } from './core/main/faculty-options/faculty-options.component';
import { ViewAllFacultyComponent } from './core/main/faculty-options/view-all-faculty/view-all-faculty.component';
import { AdminOptionsComponent } from './core/main/admin-options/admin-options.component';
import { TestRegisterComponent } from './core/main/student-options/test-register/test-register.component';
import { ViewRosterComponent } from './core/main/student-options/view-roster/view-roster.component';
import { ViewStudyMaterialComponent } from './core/main/student-options/view-study-material/view-study-material.component';
import { UnauthorizedPageComponent } from './core/unauthorized-page/unauthorized-page.component';
import { AuthGuard } from './core/services/auth.guard';
import { StudentTestResultComponent } from './core/main/student-options/student-test-result/student-test-result.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'courses', component: CoursesComponent, canActivate:[AuthGuard]},
  {path: 'studyMaterial', component: ViewStudyMaterialComponent, canActivate:[AuthGuard]},
  {path: 'career', component: FacultyRegistrationComponent},
  {path: 'securePay', component: PaymentComponent, canActivate:[AuthGuard]},
  {path: 'explore/faculty',component: FacultyOptionsComponent, canActivate:[AuthGuard]},
  {path: 'facultyView',component: ViewAllFacultyComponent},
  {path: 'explore/admin',component: AdminOptionsComponent, canActivate:[AuthGuard]},
  {path: 'explore/student',children:[
    {path: 'registerTest', component:TestRegisterComponent, canActivate:[AuthGuard]},
    {path: 'viewRoster', component:ViewRosterComponent, canActivate:[AuthGuard]},
    {path: 'viewResult', component: StudentTestResultComponent, canActivate:[AuthGuard]}
  ]},
  {path: 'unauthorized',component: UnauthorizedPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabled',
  scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
