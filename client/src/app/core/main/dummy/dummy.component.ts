import { Component, OnInit, ViewChild } from '@angular/core';
import {CountdownTimerService} from '../../services/countdown-timer.service'
import { EditCourseForm } from '../../../reusable/models/edit-courses';
import { Form, NgForm } from '@angular/forms';
import {SelectItem} from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { environment } from 'src/environments/environment';
import { AllPaymentTable } from 'src/app/reusable/models/all-payment';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent implements OnInit {
  
  startDate: Date
  endDate: Date
  allPaymentSchema=AllPaymentTable
  allPaymentDetails: any
  dummyVar={}
  @ViewChild('txnTable',{static: true}) txnTable: Table;
  module_endpoint= environment.server_endpoint
  constructor(
    private counter: CountdownTimerService,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.dummyVar={
      transDate:[],
      orderId:[],
      paymentFrom:[]
    }
  }

 getAllPaymentDetails(){
    let durationObj={startDate: this.startDate, endDate: this.endDate}
    this.http.post(this.module_endpoint.allPayments, durationObj)
        .subscribe(data=>{
          console.log(data)
          this.allPaymentDetails=[]
          this.allPaymentDetails=data['orderList']
          for(let eachOrder of data['orderList']) {

            let orderIdIdx=this.dummyVar['orderId'].findIndex(user=>user.name==eachOrder.orderId)
           // console.log(this.allOrderIds,orderIdIdx)
            if(orderIdIdx==-1){
              let obj={'name':eachOrder.orderId}
              this.dummyVar['orderId'].push(obj)
            }

            let paymentFromIdx=this.dummyVar['paymentFrom'].findIndex(user=>user.name==eachOrder.paymentFrom)
            if(paymentFromIdx==-1){
              let obj={'name':eachOrder.paymentFrom}
              this.dummyVar['paymentFrom'].push(obj)
            }

           /*  let paymentToIdx=this.allToUsers.findIndex(user=>user.name==eachOrder.paymentTo)
            if(paymentToIdx==-1){
              let obj={'name':eachOrder.paymentTo}
              this.allToUsers.push(obj)
            }
            console.log(this.allToUsers)
 */
          } 
          console.log(this.dummyVar)
        })
  } 

  onRepresentativeChange(event, type) {
    switch(type) {
      case 'paymentFrom': {
        console.log(event,this.allPaymentDetails)
        let arr=[]
        event.value.forEach(eachValue=>{
          arr.push(eachValue.name)
        })
        event.value=[...arr]
        this.txnTable.filter(event.value, 'paymentFrom', 'in')
      }
      case 'orderId': {
        let arr=[]
        event.value.forEach(eachValue=>{
          arr.push(eachValue.name)
        })
        event.value=[...arr]
        this.txnTable.filter(event.value, 'orderId', 'in')
      }
    }
    
  }

}
