import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../../environments/environment'
import { AuthService } from '../../../services/auth.service';
import {Message} from 'primeng//api';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passwordType="password"
  @Output() formViewRegister =new EventEmitter<any>()
  @Output() popUpClosed =new EventEmitter<any>()
  module_endpoint= environment.server_endpoint
  msgs: Message[] = [];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {}

  pwTypeChange() {
    this.passwordType= this.passwordType === 'text'? 'password': this.passwordType === 'password'? 'text': ''
  }

  toggleForm(option: string){
    this.formViewRegister.emit({"formView": option})
  }

  loginSubmit(form: NgForm) {
    let userObj=form.form.value
    this.auth.loginUser(userObj)
    this.auth.loggedInUserObj.subscribe(data => {
      if(data instanceof HttpErrorResponse){
        this.msgs=[]
        this.msgs.push({severity:'error', summary:'Error', 
        detail:data['error']['msg']});
      } else {
        this.popUpClosed.emit()
        this.router.navigate(['/home'])
      }
    })
  }
}
