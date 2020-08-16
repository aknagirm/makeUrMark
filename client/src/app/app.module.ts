import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DummyComponent } from './core/main/dummy/dummy.component';
import { HomeComponent } from './core/main/home/home.component';
import { HeaderUpdatedComponent } from './core/header-updated/header-updated.component';
import { NavDummyComponent } from './core/main/nav-dummy/nav-dummy.component';
import { PrimeModule } from './external/prime.module';
import { ExternalFilesService } from './core/services/external-files.service';
import { BusinessCardComponent } from './reusable/business-card/business-card.component';
import { FooterComponent } from './core/footer/footer.component';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentComponent } from './core/main/payment/payment.component';
import { WindowRefService } from './core/services/window-ref.service';
import { LoginRegistrationComponent } from './core/main/login-registration/login-registration.component';
import { LoginComponent } from './core/main/login-registration/login/login.component';
import { RegistrationComponent } from './core/main/login-registration/registration/registration.component';
import { CountdownTimerService } from './core/services/countdown-timer.service';
import { RecaptchaModule } from 'ng-recaptcha';
import { AuthService } from './core/services/auth.service';
import { CoursesComponent } from './core/main/courses/courses.component';
import { TabViewComponent } from './reusable/tab-view/tab-view.component';
import { EditCoursesComponent } from './core/main/courses/edit-courses/edit-courses.component';
import { FacultyRegistrationComponent } from './core/main/login-registration/faculty-registration/faculty-registration.component';
import { MaterialModule } from './external/material.module';
import { FacultyOptionsComponent } from './core/main/faculty-options/faculty-options.component';
import { StructuralService } from './core/services/structural.service';
import {MessageService} from 'primeng/api';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { FullCalenderComponent } from './reusable/full-calender/full-calender.component';
import { NumberOnlyDirective } from './core/directives/number-only.directive';
import { ProductCardComponent } from './reusable/product-card/product-card.component';
import { FacultyProfileEditComponent } from './core/main/faculty-options/faculty-profile-edit/faculty-profile-edit.component';
import { TokenInterceptorService } from './core/services/token-interceptor.service';
import { ViewAllFacultyComponent } from './core/main/faculty-options/view-all-faculty/view-all-faculty.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    DummyComponent,
    HomeComponent,
    HeaderUpdatedComponent,
    NavDummyComponent,
    BusinessCardComponent,
    FooterComponent,
    LoginComponent,
    PaymentComponent,
    LoginRegistrationComponent,
    RegistrationComponent,
    CoursesComponent,
    TabViewComponent,
    EditCoursesComponent,
    FacultyRegistrationComponent,
    FacultyOptionsComponent,
    FullCalenderComponent,
    NumberOnlyDirective,
    ProductCardComponent,
    FacultyProfileEditComponent,
    ViewAllFacultyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    PrimeModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    RecaptchaModule,
    FullCalendarModule
  ],
  providers: [ExternalFilesService,WindowRefService, MessageService,
        CountdownTimerService,AuthService,StructuralService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true
        }],
  bootstrap: [AppComponent],
  entryComponents: [
    FacultyProfileEditComponent
  ]
})
export class AppModule { }
