import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConfirmationService } from 'primeng/api';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FacultyProfileEditComponent } from '../main/faculty-options/faculty-profile-edit/faculty-profile-edit.component';
import { globalAnimation } from 'src/app/reusable/animation/global-animation';
import { HeaderMenuList } from '../../reusable/models/header-menu-list';
import { GradeBoardSubDetails } from 'src/app/reusable/models/grade-subject-fees-options';
import { StructuralService } from '../services/structural.service';
import { environment } from 'src/environments/environment';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DialogService,ConfirmationService],
  animations: [
    globalAnimation.animationList.slideLeftRight
  ]
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  headerMenuList= HeaderMenuList
  openLoginPopUp= {open: false, form: ""}
  userName: string= null
  userRole: string= null
  sideNavBarOpen=false
  classList=['VI','VII','VIII','IX','X','XI','XII']
  allBoards: GradeBoardSubDetails[] =[]
  allGrades: GradeBoardSubDetails[] =[]
  editProfileRef: DynamicDialogRef;
  module_endpoint=environment.server_endpoint
  holidayCalDisplay:boolean= false
  holidayList=[]
  holidayEventClick='none'
  holidayCalendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next'
    },
    events: [],
    eventColor: '#378006'
  };
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthService,
    private struct: StructuralService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.struct.getDetails({docType: 'Board'})
    this.struct.getDetails({docType: 'Grade'})
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

  ngAfterViewInit(){
    this.getBoardGradeCall()
  }


  getBoardGradeCall(){
    let arr=[]
    this.struct.allBoards.subscribe((boardList:GradeBoardSubDetails[]) => {
      this.struct.allGrades.subscribe((gradeList:GradeBoardSubDetails[]) => {
        boardList.forEach(board => {
        let boardObj={menuName: board.label, menuList:[]}
        gradeList.forEach(grade => {
          let obj ={menuName: grade.label, link: 'courses', 
              queryParams: {board: board.value, grade: grade.value}, state: {gradeObj: grade}}
          boardObj.menuList.push(obj)
        });
        var index= arr.findIndex(item => item.menuName == boardObj.menuName)
        index == -1? arr.push(boardObj): ''
        this.headerMenuList.menuList[0].menuList =[...arr]
        })
      })
    })
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

  sideSubMenuOpen(menu) {
    console.log(menu)
    !menu.menuList || menu.menuList.length == 0 ? this.sideNavBarOpen =false: ''
  }

  editProfileCalled() {
    this.editProfileRef =this.dialogService.open(FacultyProfileEditComponent, {
      header: 'Profile Update Portal',
      contentStyle: {"overflow": "auto","background-color": "aliceblue"},
      baseZIndex: 10000
  })
  }

  getHolidayList(){
    this.holidayCalDisplay=true
    setTimeout(()=> {
    let arr=[]
    this.http.get(this.module_endpoint.adminOptions.getHolidayList)
      .subscribe(data=> {
        let list=data['holidayList']
        list.forEach(holiday => {
          holiday.title=holiday.event
          holiday.start=holiday.holidayDate
          holiday.allDay=true
          arr.push(holiday)
        });
        this.holidayList=[...arr]
      })
    },100)
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