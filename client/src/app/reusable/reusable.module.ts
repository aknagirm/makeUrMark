import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewComponent } from './tab-view/tab-view.component';
import { BusinessCardComponent } from './business-card/business-card.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { PrimeModule } from '../external/prime.module';
import { MaterialModule } from '../external/material.module';
import { FullCalenderComponent } from './full-calender/full-calender.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { CartComponent } from './cart/cart.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    TabViewComponent,
    BusinessCardComponent,
    ProductCardComponent,
    FullCalenderComponent,
    LoadingScreenComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    PrimeModule,
    FullCalendarModule,
  ],
  exports: [
    TabViewComponent,
    BusinessCardComponent,
    ProductCardComponent,
    CartComponent,
    CommonModule,
    FormsModule,
    FullCalendarModule,
    FullCalenderComponent,
    LoadingScreenComponent
  ]
})
export class ReusableModule { }
