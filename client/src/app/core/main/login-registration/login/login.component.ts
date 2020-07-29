import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passwordType="password"
  @Output() formViewRegister =new EventEmitter<any>()

  constructor() { }

  ngOnInit() {}

  pwTypeChange() {
    this.passwordType= this.passwordType === 'text'? 'password': this.passwordType === 'password'? 'text': ''
  }

  toggleForm(){
    this.formViewRegister.emit({"formView": "register"})
  }
}
