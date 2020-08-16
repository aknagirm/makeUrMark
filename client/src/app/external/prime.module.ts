import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselModule} from 'primeng/carousel';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar';
import {CheckboxModule} from 'primeng/checkbox';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {AccordionModule} from 'primeng/accordion';
import {FileUploadModule} from 'primeng/fileupload';
import {MultiSelectModule} from 'primeng/multiselect';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DialogModule} from 'primeng/dialog';

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
    VirtualScrollerModule,
    AccordionModule,
    FileUploadModule,
    MultiSelectModule,
    ToastModule,
    TableModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    DialogModule
  ],
  exports: [
    CarouselModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    CheckboxModule,
    VirtualScrollerModule,
    AccordionModule,
    FileUploadModule,
    MultiSelectModule,
    ToastModule,
    TableModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    DialogModule
  ]
})
export class PrimeModule { }
