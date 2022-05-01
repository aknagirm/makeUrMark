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
import { ViewAllUsersComponent } from './core/main/admin-options/view-all-users/view-all-users.component';
import { ViewSpecificUserComponent } from './core/main/admin-options/view-specific-user/view-specific-user.component';
import { ReferUserComponent } from './core/main/refer-user/refer-user.component';
import { ViewOrderHistComponent } from './core/main/student-options/view-order-hist/view-order-hist.component';
import { AllTransDetailsComponent } from './core/main/admin-options/all-trans-details/all-trans-details.component';
import { AssosiatesPaymentCaptureComponent } from './core/main/admin-options/assosiates-payment-capture/assosiates-payment-capture.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent },
  {path: 'courses', component: CoursesComponent, canActivate:[AuthGuard], data:{userRole:'student'}},
  {path: 'studyMaterial', component: ViewStudyMaterialComponent, canActivate:[AuthGuard], data:{userRole:'student'}},
  {path: 'career', component: FacultyRegistrationComponent},
  {path: 'securePay', component: PaymentComponent, canActivate:[AuthGuard]},
  {path: 'explore/faculty',component: FacultyOptionsComponent, canActivate:[AuthGuard], data:{userRole:'faculty'}},
  {path: 'facultyView',component: ViewAllFacultyComponent, canActivate:[AuthGuard]},
  {path: 'allUserView',component: ViewAllUsersComponent, canActivate:[AuthGuard], data:{userRole:'owner'}},
  {path: 'viewSpecificUser/:uname',component: ViewSpecificUserComponent, canActivate:[AuthGuard], data:{userRole:'owner'}},
  {path: 'paymentCapture',component: AssosiatesPaymentCaptureComponent, canActivate:[AuthGuard], data:{userRole:'owner'}},
  {path: 'explore/admin',component: AdminOptionsComponent, canActivate:[AuthGuard], data:{userRole:'owner'}},
  {path: 'explore/student',children:[
    {path: 'registerTest', component:TestRegisterComponent, canActivate:[AuthGuard], data:{userRole:'student'}},
    {path: 'viewRoster', component:ViewRosterComponent, canActivate:[AuthGuard], data:{userRole:'student'}},
    {path: 'viewResult', component: StudentTestResultComponent, canActivate:[AuthGuard], data:{userRole:'student'}}
  ]},
  {path: 'orderHistory',component: ViewOrderHistComponent, canActivate:[AuthGuard], data:{userRole:'student'}},
  {path: 'allTransactionDetails',component: AllTransDetailsComponent, canActivate:[AuthGuard], data:{userRole:'owner'}},
  {path: 'referUser',component: ReferUserComponent, canActivate:[AuthGuard]},
  {path: 'unauthorized',component: UnauthorizedPageComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabled',
  scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
