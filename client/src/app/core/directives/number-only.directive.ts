import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[numberOnly]'
})
export class NumberOnlyDirective {

  @Input('numberType') numberType: string

  constructor(
    private _el: ElementRef,
    private control : NgControl
  ) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initialValue= this._el.nativeElement.value;
    let numbersOnlyValue=null
    if(this.numberType && this.numberType=='float'){
      this._el.nativeElement.value=initialValue.replace(/[^0-9.]*/g,'');
      numbersOnlyValue= initialValue.replace(/[^0-9.]*/g,'');
    } else if(!this.numberType || this.numberType=='integer'){
      this._el.nativeElement.value=initialValue.replace(/[^0-9]*/g,'');
      numbersOnlyValue= initialValue.replace(/[^0-9]*/g,'');
    }
    
    this.control.control.setValue(numbersOnlyValue)
    if(initialValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
