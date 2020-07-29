import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselModule} from 'primeng/carousel';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {VirtualScrollerModule} from 'primeng/virtualscroller';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CarouselModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    CheckboxModule,
    VirtualScrollerModule
  ],
  exports: [
    CarouselModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    CheckboxModule,
    VirtualScrollerModule
  ]
})
export class PrimeModule { }
