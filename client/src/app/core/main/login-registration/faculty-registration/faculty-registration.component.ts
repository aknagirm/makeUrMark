import { Component, OnInit, ViewChild } from '@angular/core';
import { FacultyRegistrationForm } from './facultyRegistration'
import {FormControl, FormGroupDirective, NgForm, Validators, NgModel} from '@angular/forms';
import { MatOption } from '@angular/material';
import { globalAnimation } from 'src/app/reusable/animation/global-animation';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import {SelectItem} from 'primeng/api';
import { StructuralService } from 'src/app/core/services/structural.service';


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
  certificationList=[]
  certificationItem=''
  teachingExpList=[]
  teachingExp={from:'',till:'',institute:''}
  languageList=[]
  selectedCVFile: File =null
  allLanguage: SelectItem[];
  language: string[] = [];
  allGradesSubjects: any={grades:'',subjects: ''}
  dummyAllVal="0"

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private struct: StructuralService,
  ) { }

  ngOnInit() {
    this.getAllGradeSubs()
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

  async getAllGradeSubs(){
    let allGradesSubsDet= await this.struct.getAllGradeSubjects()
    //this.allGradesSubjects['grades']=allDet['gradeList'][0]['grades']
    let allGrades=[]
    let allSubs=[]
    allGradesSubsDet['gradeList'][0]['grades'].forEach(element => {
      allGrades.push({label: element.label, value: element.value})
    });
    allGradesSubsDet['gradeList'][0]['grades'].forEach(grades => {
      allSubs=[...allSubs, ...grades.subjects]
    });
    this.allGradesSubjects['grades']=[...allGrades]
    this.allGradesSubjects['subjects']=[...allSubs]
    this.allGradesSubjects['subjects']= allSubs.filter((subs, index, self) =>
    index === self.findIndex((t) => (
    t.label === subs.label && t.value === subs.value
      ))
    )
  }

  tosslePerOne(all){ 
   if (this.allSelected.selected) {  
    this.allSelected.deselect();
    return false;
      }
   if(this.facultyForm1.controls.facultyGrade.value.length==this.allGradesSubjects.grades.length)
    this.allSelected.select();
  }

  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.facultyForm1.controls.facultyGrade
        .patchValue([...this.allGradesSubjects.grades.map(item => item.value), "0"]);
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
      }, (rej) => {
      })
  }
  
}

}
