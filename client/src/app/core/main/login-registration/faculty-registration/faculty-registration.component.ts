import { Component, OnInit, ViewChild } from '@angular/core';
import { FacultyRegistrationForm } from './facultyRegistration'
import {FormControl, FormGroupDirective, NgForm, Validators, NgModel} from '@angular/forms';
import { MatOption } from '@angular/material';
import { globalAnimation } from 'src/app/reusable/animation/global-animation';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import {MessageService, SelectItem} from 'primeng/api';
import { StructuralService } from 'src/app/core/services/structural.service';
import { GradeBoardSubDetails } from 'src/app/reusable/models/grade-subject-fees-options';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountdownTimerService } from 'src/app/core/services/countdown-timer.service';


@Component({
  selector: 'app-faculty-registration',
  templateUrl: './faculty-registration.component.html',
  styleUrls: ['./faculty-registration.component.css'],
  animations: [ globalAnimation.animationList.slideToLeft ]
})
export class FacultyRegistrationComponent implements OnInit {

  formValue={}
  hide1 = true
  hide2 = true
  formShow=1
  educationDetHeader=[{label:"Xth Details", value: "10th"},
                      {label:"XIIth Details",  value: "12th"},
                      {label:"Graduation Details",  value: "grads"},
                      {label:"Post Graduation Details(If any)",  value: "postgrads"}]
  @ViewChild('allSelected', {static:false}) allSelected: MatOption
  @ViewChild('facultyForm1', {static:false}) facultyForm1: NgForm
  allGrades: GradeBoardSubDetails[] =[]
  allSubjects: GradeBoardSubDetails[] =[]
  certificationList=[]
  certificationItem=''
  teachingExpList=[]
  teachingExp={from:'',till:'',institute:''}
  languageList=[]
  selectedCVFile: File =null
  allLanguage: SelectItem[];
  language: string[] = [];
  verifyPhoneNumberOpen=false
  verifyMailOpen=false
  tempNumberOtp: any
  numberVerified: string=''
  tempMailOtp
  mailOtp: any
  mailVerified: string= "not tried"
  myMailTimer: string
  myMobTimer: string
  counter$: Subscription
  returnUrl: string
  dummyAllVal="0"
  module_endpoint= environment.server_endpoint

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private struct: StructuralService,
    private router:Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private counter: CountdownTimerService,
  ) { }

  ngOnInit() {
    this.returnUrl=this.route.snapshot.queryParams.returnUrl
    this.struct.getDetails({docType: 'Subject'})
    this.struct.getDetails({docType: 'Grade'})
    this.struct.allGrades.subscribe(data => {
      this.allGrades=data
    }, error=> { console.log(error)})
  
    this.struct.allSubjects.subscribe(data => {
      this.allSubjects=data
    }, error=> { console.log(error)})
  
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

  tosslePerOne(all){ 
   if (this.allSelected.selected) {  
    this.allSelected.deselect();
    return false;
      }
   if(this.facultyForm1.controls.facultyGrade.value.length==this.allGrades)
    this.allSelected.select();
  }

  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.facultyForm1.controls.facultyGrade
        .patchValue([...this.allGrades.map(item => item.value), "0"]);
    } else {
      this.facultyForm1.controls.facultyGrade.patchValue([]);
    }
  }

  addCertificate(){
    this.certificationList.push(this.certificationItem);
    this.certificationItem=''
  }

  removeCertification(index){
    this.certificationList.splice(index,1)
  }
  
  addExperience(){
    this.teachingExpList.push(this.teachingExp);
    this.teachingExp={from:'',till:'',institute:''}
  }

  removeExperience(index){
    this.teachingExpList.splice(index,1)
  }

  onFileSelected(event){
    this.selectedCVFile=<File>event.target.files[0]
  }

  mailOtpGenerate(){
    this.counter$?this.counter$.unsubscribe(): ''
    this.verifyMailOpen=true
    this.mailVerified="not tried"
    let otpObj={"email":this.facultyForm1.form.value.email}
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
    let otpObj={"contactNumber":this.facultyForm1.form.value.contactNumber, "channel": "sms"}
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
    let otpObj={"contactNumber":this.facultyForm1.form.value.contactNumber, "code": numberOtp}
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
    
  this.formShow <= 4? this.formShow=this.formShow+1 : this.formShow=this.formShow

  this.formValue={...this.formValue,...form.value}
  if(this.formShow == 5){
    this.formValue["userRole"]='faculty'
    this.formValue["certification"]=this.certificationList
    this.formValue["teachingExp"]=this.teachingExpList
    this.formValue["language"]=this.language
    this.formValue["password"]=this.formValue["password1"]
    
    const index = this.formValue["facultyGrade"].indexOf("0");
    if (index > -1) {
      this.formValue["facultyGrade"].splice(index, 1);
    }
    
    this.formValue['educationalDet']=[]
    this.formValue['reference']=[]
    Object.keys(this.formValue).forEach(key => {
      if(key=='educationalDet1'||key=='educationalDet2'||key=='educationalDet3'||key=='educationalDet4'){ 
        this.formValue['educationalDet'].push(this.formValue[key])
          delete this.formValue[key]
      }

      if(key=='ref0'||key=='ref1'){
        this.formValue['reference'].push(this.formValue[key])
        delete this.formValue[key]
      }
    })

    var formData= new FormData()
    formData.append('selectedCVFile', this.selectedCVFile, this.selectedCVFile.name)
    formData.append('payload', JSON.stringify(this.formValue))
  

    this.auth.registerFaculty(formData)
      .then((res) => {
        this.messageService.add(
          {key: 'facultyRegister', severity:'success', summary:'Successful', life:30000,
          detail:'We Will get back to you Shortly'});
          if(this.returnUrl){
            this.router.navigateByUrl(this.returnUrl)
          } else {
            this.router.navigate(['/home'],{relativeTo:this.route})
          }
      }, (rej) => {
        this.messageService.add(
          {key: 'facultyRegister', severity:'error', summary:'Failed', life:30000,
          detail:rej['error']['msg']});
       })
  }
  
}

}
