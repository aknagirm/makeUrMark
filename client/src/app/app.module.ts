import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
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
    FacultyRegistrationComponent
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
    RecaptchaModule
  ],
  providers: [ExternalFilesService,WindowRefService, CountdownTimerService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
