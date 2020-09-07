import { Component, OnInit, OnDestroy } from '@angular/core';
import { globalAnimation } from '../../reusable/animation/global-animation'
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { FacultyProfileEditComponent } from '../main/faculty-options/faculty-profile-edit/faculty-profile-edit.component';
import { ConfirmationService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-header-updated',
  templateUrl: './header-updated.component.html',
  styleUrls: ['./header-updated.component.css'],
  providers: [DialogService,ConfirmationService],
  animations: [
    globalAnimation.animationList.slideLeftRight
  ]
})
export class HeaderUpdatedComponent implements OnInit, OnDestroy {

  openLoginPopUp= {open: false, form: ""}
  userName: string= null
  userRole: string= null
  sideNavBarOpen=false
  classList=['VI','VII','VIII','IX','X','XI','XII']
  editProfileRef: DynamicDialogRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.auth.loggedInUserObj
        .subscribe(data => {
          if(data instanceof HttpErrorResponse || data == null || data == undefined) {
            this.userName=null
          } else {
            console.log(data)
            this.userName=data['firstName']
            this.userRole=data['userRole']
          }
        })
        this.auth.getCurrentUser()
  }

  openSideNav(){
    this.sideNavBarOpen= !this.sideNavBarOpen
  }

  loginPopUp() {
    this.openLoginPopUp= {open: true, form: "login"}
  }

  loginPopUpClose($event){
    this.openLoginPopUp={open: false, form: ""}
  }

  navigateTo(option: string){
      if(option === 'securePay'){
        this.router.navigate(['./securePay'])
      }

      this.sideNavBarOpen=false
  }

  editProfileCalled() {
    this.editProfileRef =this.dialogService.open(FacultyProfileEditComponent, {
      header: 'Profile Update Portal',
      contentStyle: {"overflow": "auto","background-color": "aliceblue"},
      baseZIndex: 10000
  })
  }

  logoutCalled(){
    this.confirmationService.confirm({
      key: 'logoutConfirm',
      message: 'Do you want to Logout?',
      accept: () => {
          this.auth.logoutUser()
          this.router.navigate(['/home'])
      }
    })
  }

  ngOnDestroy() {
    if (this.editProfileRef) {
        this.editProfileRef.close();
    }
}
}
