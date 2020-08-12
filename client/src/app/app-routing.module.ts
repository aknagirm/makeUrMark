import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './core/main/payment/payment.component';
import { HomeComponent } from './core/main/home/home.component';
import { CoursesComponent } from './core/main/courses/courses.component';
import { FacultyRegistrationComponent } from './core/main/login-registration/faculty-registration/faculty-registration.component';
import { FacultyOptionsComponent } from './core/main/faculty-options/faculty-options.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'career', component: FacultyRegistrationComponent},
  {path: 'securePay',component: PaymentComponent},
  {path: 'explore/faculty',component: FacultyOptionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
