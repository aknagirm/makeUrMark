import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserProfileForm } from 'src/app/reusable/models/user-profile';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {

  formShow=1
  formValue: UserProfileForm
  allLanguage: SelectItem[];
  hide1 = true
  hide2 = true
  constructor(
    private http: HttpClient,
    private auth: AuthService
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

  onSubmit(form: NgForm) {
    
    console.log(form)
    this.formShow <= 3? this.formShow=this.formShow+1 : this.formShow=this.formShow
  
    this.formValue={...this.formValue,...form.value}
    if(this.formShow == 4){
      this.formValue["userRole"]='student'
      this.formValue["password"]=this.formValue["password1"]

      console.log(this.formValue)
      
     this.auth.registerStudent(this.formValue)
     .then((res) => {
       console.log(res)
     }, (rej) => {
     })
    }
      
  } 
    
  
  

}
