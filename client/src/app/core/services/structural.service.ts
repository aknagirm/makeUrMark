import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StructuralService {

  module_endpoint= environment.server_endpoint
  allBoards=new Subject<any>()
  allGrades=new Subject<any>()
  allSubjects=new Subject<any>()
  allBatchType=new Subject<any>()
  allTutionFees=new Subject<any>()
  allTestFees=new Subject<any>()
  allSubjectDiscount=new Subject<any>()
  allMonthDiscount=new Subject<any>()

  constructor(
    private http: HttpClient
  ) { }

  getAllGradeSubjects(){
    let promise =new Promise((res,rej)=> {
      this.http.get(this.module_endpoint.subjectDet.allGradeSubs)
      .subscribe(data => {
        console.log(data)
        return res(data)
      })
    })
      return promise
  }

  getDetails(obj:any) {
    this.http.post(this.module_endpoint.home.getDetails,obj)
        .subscribe(data => {
          console.log(obj)
          if(obj.docType == 'Board') {this.allBoards.next(data['details'])}
          if(obj.docType == 'Grade') {this.allGrades.next(data['details'])}
          if(obj.docType == 'Subject') {this.allSubjects.next(data['details'])}
          if(obj.docType == 'Batch Type') {this.allBatchType.next(data['details'])}
          if(obj.docType == 'Tution Fees') {this.allTutionFees.next(data['details'])}
          if(obj.docType == 'Test Fees') {this.allTestFees.next(data['details'])}
          if(obj.docType == 'Subject Discount') {this.allSubjectDiscount.next(data['details'])}
          if(obj.docType == 'Month Discount') {this.allMonthDiscount.next(data['details'])}
        }, error => {
          console.log(error)
        })
  }
}
