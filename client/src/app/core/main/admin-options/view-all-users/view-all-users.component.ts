import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.css'],
  providers: [ConfirmationService]
})
export class ViewAllUsersComponent implements OnInit {

  allFaculties: any[]=[]
  allStudents: any[]=[]
  allUsers: any[]=[]
  module_endpoint=environment.server_endpoint

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
     this.auth.getAllUser().subscribe(data=>{
      /* this.allFaculties=data.facultyList['facultyList']
      this.allStudents=data.studentList['studentList'] */
      this.allUsers=[...data.facultyList['facultyList'],...data.studentList['studentList']]
      this.auth.allUser=this.allUsers
      console.log(this.allUsers)
    })
  }

  blockUnblockUser(user: any,activeFlag: boolean){
    console.log(user, activeFlag)
    let action=user.activeFlag?'block':'unblock'
    this.confirmationService.confirm({
      key: 'commonConfirm',
      message: `Are you sure that you want to ${action} this user?`,
      accept: () => {
    this.http.post(this.module_endpoint.auth.blockUnblockUser, {_id: user._id, newFlag: activeFlag})
        .subscribe(data=>{
          this.messageService.add(
            {
              key: 'commonToast', severity: 'success', summary: 'Successful', life: 1500,
              detail: `User has been ${action}ed`
            });
          this.ngOnInit()
        }, error=>{
          console.log(error)
          this.messageService.add(
            {
              key: 'commonToast', severity: 'error', summary: 'Failed', life: 1500,
              detail: error['error']['msg']
            });
        })
      }})
  }

  approveFaculty(user){
    this.confirmationService.confirm({
      key: 'commonConfirm',
      message: `Are you sure that you want to approve this faculty?`,
      accept: () => {
    this.http.post(this.module_endpoint.auth.approveFaculty,{_id:user._id})
    .subscribe(data=>{
      this.messageService.add(
        {
          key: 'commonToast', severity: 'success', summary: 'Successful', life: 1500,
          detail: "Faculty has been approved"
        });
      this.ngOnInit()
    }, error=>{
      console.log(error)
      this.messageService.add(
        {
          key: 'commonToast', severity: 'error', summary: 'Failed', life: 1500,
          detail: error['error']['msg']
        });
    })
  }})
  }
  

}
