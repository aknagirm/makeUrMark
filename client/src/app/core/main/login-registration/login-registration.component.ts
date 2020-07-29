import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { globalAnimation } from '../../../reusable/animation/global-animation'

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css'],
  animations: [
     globalAnimation.animationList.zoomInOut
  ]
})
export class LoginRegistrationComponent implements OnInit, OnChanges {

  @Input() callFor
  @Output() isVisisbleFromLogin= new EventEmitter<boolean>()
  isVisible
  formView

  constructor() { }

  ngOnChanges(){
    console.log(this.callFor)
    this.isVisible=this.callFor.open
    this.formView=this.callFor.form
  }

  ngOnInit() {
  }

  loginPopUpClose(){
    this.isVisible=false;
    this.isVisisbleFromLogin.emit(this.isVisible)
  }

  toggleView(event){
    this.isVisible=true
    this.formView=event.formView
  }
}
