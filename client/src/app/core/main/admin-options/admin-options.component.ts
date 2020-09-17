import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StructuralService } from '../../services/structural.service';
import { AuthService } from '../../services/auth.service';
import {TreeNode} from 'primeng/api';
import { GradeBoardSubDetails, headerList, TestTutionFeesDetails, FormViewOptions } from '../../../reusable/models/grade-subject-fees-options';

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
  allColumns=headerList
  viewOptionsFormat=FormViewOptions
  selectedDataForDel  
  user: any
  module_endpoint=environment.server_endpoint

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private struct: StructuralService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
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
        console.log(data)
      }, error=> { console.log(error)})
    }
    if(obj.docType == 'Batch Type'){
      this.struct.allBatchType.subscribe(data => {
        this.allBatchType=data
      }, error=> { console.log(error)})
    }
    if(obj.docType == 'Tution Fees'){
      this.struct.allTutionFees.subscribe(data => {
        console.log(data)
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

  async addGradeSubBoard(addBoardForm: NgForm, type: string) {
    if( type == 'Test Fees') {
      addBoardForm.form.value.grade=addBoardForm.form.value.grade.label
      addBoardForm.form.value.batchType? 
          addBoardForm.form.value.batchType=addBoardForm.form.value.batchType.label: ''
    }
    let details: GradeBoardSubDetails=addBoardForm.form.value
    details.docType=type
    this.http.post(this.module_endpoint.adminOptions.addGradeSubBoard, details)
      .subscribe(data => {
        this.struct.getDetails({docType: type})
        addBoardForm.reset()
      }, error=> {
        console.log(error)
        this.messageService.add(
          {
            key: 'deleteToast', severity: 'error', summary: 'Failed', life: 2000,
            detail: error['error']['msg']
          });
      })
  }

  addFees(testTutionform: NgForm, type: string) {
    console.log(testTutionform.form.value)
    testTutionform.form.value.grade=testTutionform.form.value.grade.label
    testTutionform.form.value.batchType? 
        testTutionform.form.value.batchType=testTutionform.form.value.batchType.label: ''
    let formDetails=testTutionform.form.value
    formDetails.subject.forEach(sub => {
      let details={...formDetails}
      details.subject=sub.label
    details.docType=type
    this.http.post(this.module_endpoint.adminOptions.addGradeSubBoard, details)
      .subscribe(data => {
        this.struct.getDetails({docType: type})
        testTutionform.reset()
      }, error=> {
        console.log(error)
        this.messageService.add(
          {
            key: 'deleteToast', severity: 'error', summary: 'Failed', life: 2000,
            detail: error['error']['msg']
          });
      }) 
      
    });
  }
  
  commonDelete(type: string){
    let selectedDoc=this.selectedDataForDel.filter(doc => doc.docType==type)
    console.log(this.selectedDataForDel,selectedDoc)
    this.confirmationService.confirm({
      key: 'deleteConfirm',
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.http.post(this.module_endpoint.adminOptions.commonDelete, selectedDoc)
        .subscribe(data => {
          this.struct.getDetails({docType: type})
            this.messageService.add(
              {
                key: 'deleteToast', severity: 'success', summary: 'Successfull', life: 1000,
                detail: data['msg']
              });
        }, error => {
          console.log(error)
          this.messageService.add(
            {
              key: 'deleteToast', severity: 'error', summary: 'Failed', life: 2000,
              detail: error['error']['msg']
            });
        })
      }
    })
  }

}
