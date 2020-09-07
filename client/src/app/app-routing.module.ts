import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './core/main/payment/payment.component';
import { HomeComponent } from './core/main/home/home.component';
import { CoursesComponent } from './core/main/courses/courses.component';
import { FacultyRegistrationComponent } from './core/main/login-registration/faculty-registration/faculty-registration.component';
import { FacultyOptionsComponent } from './core/main/faculty-options/faculty-options.component';
import { ViewAllFacultyComponent } from './core/main/faculty-options/view-all-faculty/view-all-faculty.component';
import { AdminOptionsComponent } from './core/main/admin-options/admin-options.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'career', component: FacultyRegistrationComponent},
  {path: 'securePay',component: PaymentComponent},
  {path: 'explore/faculty',component: FacultyOptionsComponent},
  {path: 'facultyView',component: ViewAllFacultyComponent},
  {path: 'explore/admin',component: AdminOptionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabled',
  scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
