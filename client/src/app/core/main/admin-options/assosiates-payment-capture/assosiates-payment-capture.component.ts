import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { AssociatePaymentCapture } from 'src/app/reusable/models/all-payment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-assosiates-payment-capture',
  templateUrl: './assosiates-payment-capture.component.html',
  styleUrls: ['./assosiates-payment-capture.component.css'],
  providers: [ConfirmationService]
})
export class AssosiatesPaymentCaptureComponent implements OnInit {

  allFaculties: any[]=[]
  paymentTableStruct=AssociatePaymentCapture
  selectedfees=[]
  module_endpoint=environment.server_endpoint

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.http.get(this.module_endpoint.associatesFeesCapture).pipe(
      map(data=>{
        let arr=[]
        data['list'].forEach(element => {
          let prevAmt_1=element.previousPayments[0] && element.previousPayments[0].amount?element.previousPayments[0].amount:'NA'
          let prevDate_1=element.previousPayments[0] && element.previousPayments[0].transDate?element.previousPayments[0].transDate:null
          let prevAmt_2=element.previousPayments[1] && element.previousPayments[1].amount?element.previousPayments[1].amount:'NA'
          let prevDate_2=element.previousPayments[1] && element.previousPayments[1].transDate?element.previousPayments[1].transDate:null
          let newPayment=prevAmt_1=='NA'?'':prevAmt_1
          let obj={paymentTo:element.userObj.userName, 
            userRole:element.userObj.userRole, 
            lastPaymentAmt_Mon1:prevAmt_1,
            lastPaymentDate_Mon1:prevDate_1,
            lastPaymentAmt_Mon2:prevAmt_2,
            lastPaymentDate_Mon2:prevDate_2,
            currMonthFees: newPayment}
            arr.push(obj)
        });
        return arr
      })).subscribe(data=>{
        console.log(data)
        this.allFaculties=data
    })
  }

  associatePaymentSave(){
    console.log(this.selectedfees)
    let arr=[]
    this.confirmationService.confirm({
      key: 'associatePaymentConfirm',
      message: `Are you sure that you want to perform this action`,
      accept: () => {
    this.selectedfees.forEach(eachItem=>{
      let obj={
        orderId: 'NA', paymentId: 'NA', paymentReason: 'Faculty Fees', paymentFrom: 'Institute',
        paymentTo: eachItem.paymentTo, paymentIndicator: 'D', amount: +eachItem.currMonthFees
      }
      arr.push(obj)
    })
    console.log(arr)
    this.http.post(this.module_endpoint.orderPaymentAdd, {paymentList:arr})
          .subscribe(data=>{
            this.messageService.add(
              {
                key: 'associatePaymentSave', severity: 'success', summary: 'Successful', life: 1500,
                detail: `Payments has been captured`
              });
            this.selectedfees=[]
            this.ngOnInit()
          },error=>{
            this.messageService.add(
              {
                key: 'associatePaymentSave', severity: 'error', summary: 'Failed', life: 1500,
                detail: error['error']['msg']
              });
          })
        }
    })
  }

}
