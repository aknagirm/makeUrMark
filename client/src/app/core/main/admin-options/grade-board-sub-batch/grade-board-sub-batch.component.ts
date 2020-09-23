import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { StructuralService } from 'src/app/core/services/structural.service';
import { FormViewOptions, GradeBoardSubDetails, headerList } from 'src/app/reusable/models/grade-subject-fees-options';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-grade-board-sub-batch',
  templateUrl: './grade-board-sub-batch.component.html',
  styleUrls: ['../admin-options.component.css']
})
export class GradeBoardSubBatchComponent implements OnInit {

  viewOptionsFormat=FormViewOptions
  @Input() allBoards: GradeBoardSubDetails[] =[]
  @Input() allGrades: GradeBoardSubDetails[] =[]
  @Input() allSubjects: GradeBoardSubDetails[] =[]
  @Input() allBatchType: GradeBoardSubDetails[] =[]
  allColumns=headerList
  selectedDataForDel=[]
  module_endpoint=environment.server_endpoint
  
  constructor(
    private http: HttpClient,
    private struct: StructuralService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private auth: AuthService
  ) { }

  ngOnInit() {
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
          this.selectedDataForDel=[]
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
