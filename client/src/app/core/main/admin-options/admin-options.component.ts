import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StructuralService } from '../../services/structural.service';
import { AuthService } from '../../services/auth.service';
import { GradeBoardSubDetails, headerList, TestTutionFeesDetails, FormViewOptions, NewBatchDetails } from '../../../reusable/models/grade-subject-fees-options';

@Component({
  selector: 'app-admin-options',
  templateUrl: './admin-options.component.html',
  styleUrls: ['./admin-options.component.css'],
  providers: [ConfirmationService]
})
export class AdminOptionsComponent implements OnInit {

  allBoards: GradeBoardSubDetails[] =[]
  allGrades: GradeBoardSubDetails[] =[]
  allSubjects: GradeBoardSubDetails[] =[]
  allBatchType: GradeBoardSubDetails[] =[]
  allTutionFees: TestTutionFeesDetails[] =[]
  allTestFees: TestTutionFeesDetails[] =[]
  allSubjectDiscount: TestTutionFeesDetails[] =[]
  allMonthDiscount: TestTutionFeesDetails[] =[]
  
  
  docType=['Board','Grade','Subject','Batch Type','Tution Fees','Test Fees',
      'Subject Discount','Month Discount']
  user: any
  module_endpoint=environment.server_endpoint

  constructor(
    private struct: StructuralService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.docType.forEach(doc => {
      this.struct.getDetails({docType: doc})
      this.getDetails({docType: doc})
    })
  }

  getDetails(obj:any) {
    
    if(obj.docType == 'Board'){
      this.struct.allBoards.subscribe(data => {
        this.allBoards=data
      }, error=> { console.log(error)})
    }
    if(obj.docType == 'Grade'){
      this.struct.allGrades.subscribe(data => {
        this.allGrades=data
      }, error=> { console.log(error)})
    }
    if(obj.docType == 'Subject'){
      this.struct.allSubjects.subscribe(data => {
        this.allSubjects=data
      }, error=> { console.log(error)})
    }
    if(obj.docType == 'Batch Type'){
      this.struct.allBatchType.subscribe(data => {
        this.allBatchType=data
      }, error=> { console.log(error)})
    }
    if(obj.docType == 'Tution Fees'){
      this.struct.allTutionFees.subscribe(data => {
        this.allTutionFees=data
        this.allTutionFees.sort((a,b)=>{
          if(a.grade == b.grade) {
            if(a.subject == b.subject){
              return a.batchType > b.batchType ? 1 : -1;
            }
            return a.subject > b.subject ? 1 : -1;
          }
          return a.grade > b.grade ? 1 : -1;
        })
      }, error=> { console.log(error)})
    }
    if(obj.docType == 'Test Fees') {
      this.struct.allTestFees.subscribe(data => {
        this.allTestFees=data
      }, error=> { console.log(error)})
    }
    if(obj.docType == 'Subject Discount') {
      this.struct.allSubjectDiscount.subscribe(data => {
        this.allSubjectDiscount=data
      }, error=> { console.log(error)})
    }
    if(obj.docType == 'Month Discount') {
      this.struct.allMonthDiscount.subscribe(data => {
        this.allMonthDiscount=data
      }, error=> { console.log(error)})
    }
  }

  getCurrentUser():Promise<any>{
    this.auth.getCurrentUser()
    let promise =new Promise((res,rej) => {
      this.auth.loggedInUserObj.subscribe(data => {
        return res(data)
      })
    })
    return promise
  }

  scrollTo(someId: string){
    console.log(someId)
    document.getElementById(someId).scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
  }
}
