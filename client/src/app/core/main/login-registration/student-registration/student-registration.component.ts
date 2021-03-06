import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { CountdownTimerService } from 'src/app/core/services/countdown-timer.service';
import { UserProfileForm } from 'src/app/reusable/models/user-profile';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {

  @Output() popUpClosed =new EventEmitter<any>()
  @Output() formViewRegister =new EventEmitter<any>()
  formShow=0
  formValue: UserProfileForm
  studentUserProfile: UserProfileForm={}
  allLanguage: SelectItem[];
  contactNumber: string=''
  hide1: boolean = true
  hide2: boolean = true
  captchaCompleted: boolean=false
  verifyPhoneNumberOpen: boolean=false
  verifyMailOpen: boolean=false
  acceptedStatus: boolean= false
  tempNumberOtp: any
  numberVerified: string=''
  tempMailOtp
  mailOtp: any
  mailVerified: string= "not tried"
  myMailTimer: string
  myMobTimer: string
  counter$: Subscription
  returnUrl: string
  module_endpoint= environment.server_endpoint
  
  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthService,
    private messageService: MessageService,
    private counter: CountdownTimerService,
  ) { }

  ngOnInit() {
    this.returnUrl=this.route.snapshot.queryParams.returnUrl
    this.http.get('../assets/all-language.json')
        .subscribe(data => {
          let dummyList=[]
          data['allLanguage'].forEach(lang => {
            let obj: SelectItem={label:lang, value: lang}
            dummyList.push(obj)
          });
          this.allLanguage=[...dummyList]
        })
  }

  toggleForm(option: string){
    this.formViewRegister.emit({"formView": option})
  }

  termsConditions(){
    this.acceptedStatus=!this.acceptedStatus
    setTimeout(()=>{
      this.formShow= this.acceptedStatus? 1: 0
    },300)
    
  }

  mailOtpGenerate(){
    this.counter$?this.counter$.unsubscribe(): ''
    this.verifyMailOpen=true
    this.mailVerified="not tried"
    let otpObj={"email":this.studentUserProfile.email}
    console.log(otpObj)
    this.http.post(this.module_endpoint.verification.mailOtp, otpObj)
      .subscribe(data => {
          this.tempMailOtp=data
      }, error => {
        console.log(error)
        this.mailVerified="user exist"
      })

      this.counter$=this.counter.startTimer("00:02:00").subscribe(data => {
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
            this.verifyMailOpen=false
          }, 2000)
        } else {
          this.mailVerified="not matched"
        }
    }

  }

  mobileOTPGenerate(){
    this.counter$?this.counter$.unsubscribe(): ''
    this.verifyPhoneNumberOpen=true
    let otpObj={"contactNumber":this.studentUserProfile.contactNumber, "channel": "sms"}
    this.numberVerified="not tried"
    this.http.post(this.module_endpoint.verification.mobOtpSend, otpObj)
      .subscribe(data => {
          this.tempNumberOtp=data
      }, error => {
        console.log(error)
        this.numberVerified="no number"
      })

      this.counter$=this.counter.startTimer("00:02:00").subscribe(data => {
      this.myMobTimer=data.substr(3,5)
    })
  }

  verifyNumber(){
    var numberOtp =(<HTMLInputElement>document.getElementById("otp-mob")).value
    let otpObj={"contactNumber":this.studentUserProfile.contactNumber, "code": numberOtp}
    if(this.myMobTimer =="00:00") {
      this.numberVerified="expired"
    } else {
      this.http.post(this.module_endpoint.verification.mobOtpVerify, otpObj)
          .subscribe(data=>{
            if(data['status']=="approved") {
              this.numberVerified="matched"
              setTimeout(()=>{
               this.verifyPhoneNumberOpen=false
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

  onSubmit(form: NgForm) {
    this.formShow <= 3? this.formShow=this.formShow+1 : this.formShow=this.formShow
    console.log(this.studentUserProfile)
   // this.formValue={...this.formValue,...form.value}
    if(this.formShow == 4){
      this.studentUserProfile["userRole"]='student'
     // this.formValue["password"]=this.formValue["password1"]
      
     this.auth.registerStudent(this.studentUserProfile)
     .then((res) => {
      this.popUpClosed.emit()
      this.messageService.add(
        {key: 'studentRegister', severity:'success', summary:'Successful', life:30000,
        detail:'Registered Successfully'});
        if(this.returnUrl){
          this.router.navigateByUrl(this.returnUrl)
        } else {
          this.router.navigate(['/home'],{relativeTo:this.route})
        }
        }, (rej) => {
          this.popUpClosed.emit()
      console.log(rej)
      this.messageService.add(
        {key: 'studentRegister', severity:'error', summary:'Failed', life:30000,
        detail:rej['error']['msg']});
     })
    }
      
  } 
    
  resolved(captchaResponse: string) {
    this.http.post(this.module_endpoint.verification.captchaVerify,{"captcha":captchaResponse}).pipe(
      take(1)
    ).subscribe(data=>{
      if(data['success']===true) {
        this.captchaCompleted=true
        grecaptcha.reset()
      }
    })
  }
  

}
