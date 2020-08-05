import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentComponent } from './core/main/payment/payment.component';
import { HomeComponent } from './core/main/home/home.component';
import { CoursesComponent } from './core/main/courses/courses.component';
import { FacultyRegistrationComponent } from './core/main/login-registration/faculty-registration/faculty-registration.component';


const routes: Routes = [
  {path: '', redirectTo: '/courses', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'career', component: FacultyRegistrationComponent},
  {path: 'securePay',component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
