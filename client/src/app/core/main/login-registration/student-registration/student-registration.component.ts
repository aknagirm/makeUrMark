import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
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
  formShow=1
  formValue: UserProfileForm
  studentUserProfile: UserProfileForm={}
  allLanguage: SelectItem[];
  contactNumber: string=''
  hide1 = true
  hide2 = true
  captchaCompleted=false
  verifyPhoneNumberOpen=false
  tempNumberOtp: any
  numberVerified: string=''
  myMobTimer: string
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

  mobileOTPGenerate(){
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

    this.counter.startTimer("00:02:00").subscribe(data => {
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
        this.router.navigate(['/home'],{relativeTo:this.route})
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
