import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[capitalizeAll]'
})
export class CapitalizeAllDirective {

  constructor(
    private _el: ElementRef,
    private control : NgControl
  ) { }

  @HostListener('keyup', ['$event']) onInputChange(event) {
    let upper = this._el.nativeElement.value.toUpperCase();
    this.control.control.setValue(upper)
  }
}
