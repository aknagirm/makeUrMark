import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { RegistrationForm } from './registration'
import { globalAnimation } from '../../../../reusable/animation/global-animation'
import { environment } from '../../../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { CountdownTimerService } from 'src/app/core/services/countdown-timer.service';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [ globalAnimation.animationList.slideToLeft ]
})
export class RegistrationComponent implements OnInit {

  gradeList=[{label:'VI',value:'6'},{label:'VII',value:'7'},{label:'VIII',value:'8'},{label:'IX',value:'9'},
             {label:'X',value:'10'},{label:'XI',value:'11'},{label:'XII',value:'12'}]
  notShowList=[2,6,10]
  passwordType="password"
  signUpDisable=true
  userObj: RegistrationForm= new RegistrationForm()
  @Output() formViewRegister =new EventEmitter<any>()
  switchEx=1
  tempMailOtp
  tempNumberOtp
  mailOtp: any
  numberOtp
  myMailTimer
  myMobTimer
  mailVerified: string= "not tried"
  numberVerified: string= "not tried"
  module_endpoint= environment.server_endpoint

  constructor(
    private http: HttpClient,
    private counter: CountdownTimerService,
    private auth:AuthService
  ) { }

  ngOnInit() {
    this.userObj.userRole="student"
  }

  pwTypeChange() {
    this.passwordType= this.passwordType === 'text'? 'password': this.passwordType === 'password'? 'text': ''
  }

  toggleForm(option: string){
    this.formViewRegister.emit({"formView": option})
  }

  switchExpChng(str: string){
    str ==='inc'? this.switchEx=this.switchEx+1: str === 'dec'? this.switchEx=this.switchEx-1: ''
    if(this.switchEx === 2){
      //this.switchEx=3                ////remove this after testing
      this.mailOtpGenerate()      ////Uncomment this after testing
    }
    if(this.switchEx === 6){    
       // this.switchEx=7              ////remove this after testing
      this.numberOtpGenerate()     ////Uncomment this after testing
    }
  }

  mailOtpGenerate(){
    this.mailVerified="not tried"
        this.http.post(this.module_endpoint.verification.mailOtp, {"email":this.userObj.email})
          .subscribe(data => {
              this.tempMailOtp=data
          }, error => {
            this.mailVerified="no mail"
          })

       this.counter.startTimer("00:02:00").subscribe(data => {
          this.myMailTimer=data.substr(3,5)
       })
  }

  verifyMail(){
    this.mailOtp =(<HTMLInputElement>document.getElementById("otp-mail")).value

    if(this.myMailTimer =="00:00") {
      this.mailVerified="expired"
      this.tempMailOtp.mailOtp=null
    } else {
        if(this.mailOtp == this.tempMailOtp.mailOtp) {
          this.mailVerified="matched"
          setTimeout(()=>{
            this.switchEx=this.switchEx+1
          }, 2000)
        } else {
          this.mailVerified="not matched"
        }
    }

  }

  numberOtpGenerate(){
    let otpObj={"contactNumber":this.userObj.contactNumber, "channel": "sms"}
    this.numberVerified="not tried"
        this.http.post(this.module_endpoint.verification.mobOtpSend, otpObj)
          .subscribe(data => {
              this.tempNumberOtp=data
          }, error => {
            this.numberVerified="no number"
          })

       this.counter.startTimer("00:02:00").subscribe(data => {
          this.myMobTimer=data.substr(3,5)
       })
  }

  verifyNumber(){
    var numberOtp =(<HTMLInputElement>document.getElementById("otp-mob")).value
    let otpObj={"contactNumber":this.userObj.contactNumber, "code": numberOtp}
    if(this.myMobTimer =="00:00") {
      this.numberVerified="expired"
    } else {
      this.http.post(this.module_endpoint.verification.mobOtpVerify, otpObj)
          .subscribe(data=>{
            if(data['status']=="approved") {
              this.numberVerified="matched"
              setTimeout(()=>{
                this.switchEx=this.switchEx+1
              }, 2000)
            }
            if(data['status']=="pending") {
              this.numberVerified="not matched"
            }
          }, error=> {
            console.log(error)
            this.numberVerified="not matched"
          })
      
    }

  }

  resolved(captchaResponse: string) {
    this.http.post(this.module_endpoint.verification.captchaVerify,{"captcha":captchaResponse}).pipe(
      take(1)
    )
    .subscribe(data=>{
      if(data['success']===true) {
        this.signUpDisable=false
      }
    }

      )
}

  onSubmit(){
    this.auth.registerUser(this.userObj)
  }
}
