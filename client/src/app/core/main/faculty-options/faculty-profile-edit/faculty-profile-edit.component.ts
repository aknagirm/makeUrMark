import { Component, OnInit, ViewChild } from '@angular/core';
import { FacultyProfileEditForm } from '../../../../reusable/models/faculty-profile-edit'
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from '../../../../../environments/environment'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StructuralService } from 'src/app/core/services/structural.service';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material';
import { SelectItem } from 'primeng/api';
import { map } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { GradeBoardSubDetails } from 'src/app/reusable/models/grade-subject-fees-options';

@Component({
  selector: 'app-faculty-profile-edit',
  templateUrl: './faculty-profile-edit.component.html',
  styleUrls: ['./faculty-profile-edit.component.css'],
  providers: [ConfirmationService]
})
export class FacultyProfileEditComponent implements OnInit {

  hide1 = true
  hide2 = true
  hide3 = true
  allGrades: GradeBoardSubDetails[] =[]
  allSubjects: GradeBoardSubDetails[] =[]
  facultyProfileEdit: FacultyProfileEditForm
  newFacultyProfile: any
  contactNumberOld: string = null
  contactNumberVerified: boolean = false
  module_endpoint = environment.server_endpoint
  @ViewChild('facultyForm1', { static: false }) facultyForm1: NgForm
  @ViewChild('allSelected', { static: false }) allSelected: MatOption
  educationDetHeader = [{ label: "Xth Details", value: "10th" },
  { label: "XIIth Details", value: "12th" },
  { label: "Graduation Details", value: "grads" },
  { label: "Post Graduation Details(If any)", value: "postgrads" }]
  certificationItem = ''
  teachingExp = { from: '', till: '', institute: '' }
  allLanguage: SelectItem[];
  selectedImageFile: File = null
  _profileImgUrl: string | ArrayBuffer = "assets/blank-picture.jpg"
  removeImageCalled: boolean = false

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private struct: StructuralService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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
        this.contactNumberOld = data['contactNumber']
        return data
      })
    ).subscribe(
      data => {
        this.facultyProfileEdit = data
        this.facultyProfileEdit['newPassword'] = ''
        this.newFacultyProfile = { ...this.facultyProfileEdit }
      }
    )

    this.struct.getDetails({docType: 'Subject'})
    this.struct.getDetails({docType: 'Grade'})
    this.struct.allGrades.subscribe(data => {
      this.allGrades=data
      console.log(this.allGrades)
    }, error=> { console.log(error)})
  
    this.struct.allSubjects.subscribe(data => {
      this.allSubjects=data
    }, error=> { console.log(error)})

    this.http.get('../assets/all-language.json')
      .subscribe(data => {
        let dummyList = []
        data['allLanguage'].forEach(lang => {
          let obj: SelectItem = { label: lang, value: lang }
          dummyList.push(obj)
        });
        this.allLanguage = [...dummyList]
      })
  }

  addCertificate() {
    this.facultyProfileEdit.certification.push(this.certificationItem);
    this.certificationItem = ''
  }

  removeCertification(index) {
    this.facultyProfileEdit.certification.splice(index, 1)
  }

  addExperience() {
    this.facultyProfileEdit.teachingExp.push(this.teachingExp);
    this.teachingExp = { from: '', till: '', institute: '' }
  }

  removeExperience(index) {
    this.facultyProfileEdit.teachingExp.splice(index, 1)
  }

  onFileSelected(event) {
    this.selectedImageFile = <File>event.target.files[0]
    this.preview()
  }

  onRemoveFile() {
    this._profileImgUrl = "assets/blank-picture.jpg"
    this.removeImageCalled = true
  }

  preview() {
    // Show preview 
    var mimeType = this.selectedImageFile.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedImageFile);
    reader.onload = (_event) => {
      this._profileImgUrl = reader.result;
    }
  }

  onImageSubmit() {
    this.confirmationService.confirm({
      key: 'imageChangeConfirm',
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
          //Actual logic to perform a confirmation
      
    if (!this.removeImageCalled) {
      let formData = new FormData()
      formData.append('selectedImageFile', this.selectedImageFile)
      this.auth.updateProfilePicture(formData)
        .then(data => {
          this.messageService.add(
            {
              key: 'editProfile', severity: 'success', summary: 'Successfull', life: 5000,
              detail: 'Profile Picture has been changed'
            });
          this.ngOnInit()
        },
          error => {
            this.messageService.add(
              {
                key: 'editProfile', severity: 'error', summary: 'Failed', life: 5000,
                detail: error['msg']
              });
          }
        )
    } else {
      this.auth.removeProfilePicture({ filePath: this.newFacultyProfile.selectedImageFile })
        .then(data => {
          this.messageService.add(
            {
              key: 'editProfile', severity: 'success', summary: 'Successfull', life: 5000,
              detail: 'Profile Picture has been removed'
            });
          this.ngOnInit()
        },
          error => {
            this.messageService.add(
              {
                key: 'editProfile', severity: 'error', summary: 'Failed', life: 5000,
                detail: error['msg']
              });
          }

        )
    }
  }
})
  }


  onSubmit(form: NgForm) {

    this.confirmationService.confirm({
      key: 'updateDetails',
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
          //Actual logic to perform a confirmation
      
    let submittedForm = form.form.value


    if (this.facultyProfileEdit.smartPhone == 'no') {
      this.facultyProfileEdit.makeAndModel = ''
    }
    if (this.facultyProfileEdit.newPassword != '') {
      this.facultyProfileEdit.password = this.facultyProfileEdit.newPassword
    }

    Object.keys(submittedForm).forEach(el => {
      this.newFacultyProfile[el] = this.facultyProfileEdit[el]
    })

    delete this.facultyProfileEdit.newPassword
    this.auth.updateUserProfile(this.newFacultyProfile)
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
              detail: error['msg']
            });
        }
      )
    }
  });
  }

}
