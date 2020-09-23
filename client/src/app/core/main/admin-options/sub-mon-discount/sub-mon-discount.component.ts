import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { StructuralService } from 'src/app/core/services/structural.service';
import { FormViewOptions, GradeBoardSubDetails, headerList, TestTutionFeesDetails } from 'src/app/reusable/models/grade-subject-fees-options';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sub-mon-discount',
  templateUrl: './sub-mon-discount.component.html',
  styleUrls: ['../admin-options.component.css']
})
export class SubMonDiscountComponent implements OnInit {

  viewOptionsFormat=FormViewOptions
  @Input() allSubjectDiscount: TestTutionFeesDetails[] =[]
  @Input() allMonthDiscount: TestTutionFeesDetails[] =[]
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
    let details: TestTutionFeesDetails=addBoardForm.form.value
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
