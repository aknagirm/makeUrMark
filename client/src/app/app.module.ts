import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderUpdatedComponent } from './core/header-updated/header-updated.component';
import { PrimeModule } from './external/prime.module';
import { ExternalFilesService } from './core/services/external-files.service';
import { FooterComponent } from './core/footer/footer.component';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WindowRefService } from './core/services/window-ref.service';
import { CountdownTimerService } from './core/services/countdown-timer.service';
import { RecaptchaModule } from 'ng-recaptcha';
import { AuthService } from './core/services/auth.service';
import { MaterialModule } from './external/material.module';
import { StructuralService } from './core/services/structural.service';
import { MessageService } from 'primeng/api';
import { MainModule } from './core/main/main.module'
import { ReusableModule } from './reusable/reusable.module';
import { interceptorProviders } from './core/services/http-interceptors/interceptors';
import { LoaderService } from './core/services/loader.service';
import { HeaderComponent } from './core/header/header.component';
import { PaymentService } from './core/services/payment.service';
import { UnauthorizedPageComponent } from './core/unauthorized-page/unauthorized-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderUpdatedComponent,
    FooterComponent,
    HeaderComponent,
    UnauthorizedPageComponent
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
    ReusableModule,
    MainModule
  ],
  providers: [
    ExternalFilesService,
    WindowRefService, 
    MessageService, 
    LoaderService,
    CountdownTimerService,
    AuthService,
    StructuralService,
    interceptorProviders,
    PaymentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
