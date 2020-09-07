import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizeAllDirective } from './capitalize-all.directive';
import { NumberOnlyDirective } from './number-only.directive';



@NgModule({
  declarations: [
    CapitalizeAllDirective,
    NumberOnlyDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CapitalizeAllDirective,
    NumberOnlyDirective
  ]
})
export class AllDirectivesModule { }
