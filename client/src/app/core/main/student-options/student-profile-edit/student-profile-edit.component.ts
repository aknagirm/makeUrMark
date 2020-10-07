import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserProfileForm } from 'src/app/reusable/models/user-profile';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-profile-edit',
  templateUrl: './student-profile-edit.component.html',
  styleUrls: ['./student-profile-edit.component.css'],
  providers: [ConfirmationService]
})
export class StudentProfileEditComponent implements OnInit {
  module_endpoint= environment.server_endpoint
  _profileImgUrl:string= ''
  studentProfileEdit: UserProfileForm={}
  newStudentProfile: any
  hide1 = true
  hide2 = true
  hide3 = true
  constructor(
    private auth: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.auth.getCurrentUser()
    this.auth.loggedInUserObj.pipe(
      map(data => {
        if (data['selectedImageFile']) {
          this._profileImgUrl = this.module_endpoint.baseUrl + "/" + data['selectedImageFile']
        } else {
          this._profileImgUrl = "assets/blank-picture.jpg"
        }
        //this.contactNumberOld = data['contactNumber']
        return data
      })
    ).subscribe(
      data => {
        console.log(data)
        this.studentProfileEdit = data
        this.studentProfileEdit['newPassword'] = ''
        this.newStudentProfile = { ...this.studentProfileEdit }
      }
    )
  }

  onSubmit(form: NgForm) {

     this.confirmationService.confirm({
      key: 'updateDetails',
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
          //Actual logic to perform a confirmation
      
    let submittedForm = form.form.value


    if (this.studentProfileEdit.smartPhone == 'no') {
      this.studentProfileEdit.makeAndModel = ''
      this.newStudentProfile.makeAndModel=''
    }
    if (this.studentProfileEdit['newPassword'] != '') {
      this.studentProfileEdit.password = this.studentProfileEdit['newPassword']
    }

    Object.keys(submittedForm).forEach(el => {
      this.newStudentProfile[el] = this.studentProfileEdit[el]
    })
    delete this.studentProfileEdit['newPassword']
    this.auth.updateUserProfile(this.newStudentProfile)
      .then(data => {
        this.messageService.add(
          {
            key: 'editProfile', severity: 'success', summary: 'Successfull', life: 5000,
            detail: 'Profile has been updated'
          });
        this.ngOnInit()
      },
        error => {
          this.messageService.add(
            {
              key: 'editProfile', severity: 'error', summary: 'Failed', life: 5000,
              detail: error['error']['msg']
            });
        }
      )
    }
   }); 
  }



}
