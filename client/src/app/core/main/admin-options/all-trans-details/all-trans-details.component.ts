import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { ExportFileService } from 'src/app/core/services/export-file.service';
import { AllPaymentTable } from 'src/app/reusable/models/all-payment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-trans-details',
  templateUrl: './all-trans-details.component.html',
  styleUrls: ['./all-trans-details.component.css']
})
export class AllTransDetailsComponent implements OnInit {

  startDate: Date
  endDate: Date
  allPaymentSchema=AllPaymentTable
  allPaymentDetails: any
  summary={allCredits:0, allDebits:0, allRefund:0, total:0}
  allTableFilters={
    transDate: [],
    orderId: [],
    paymentId: [],
    paymentFrom: [],
    paymentTo: [],
    paymentIndicator: [],
    paymentReason: [],
    amount: [],
  }
  
  @ViewChild('txnTable',{static: false}) txnTable: Table;
  module_endpoint= environment.server_endpoint

  constructor(
    private http: HttpClient,
    private router: Router,
    private exportFile: ExportFileService
  ) { }

  ngOnInit() {

  }

  getAllPaymentDetails(){
    let durationObj={startDate: this.startDate, endDate: this.endDate}
    this.http.post(this.module_endpoint.allPayments, durationObj)
        .subscribe(data=>{
          this.allPaymentDetails=[]
          this.allPaymentDetails=data['orderList']
          Object.keys(this.allTableFilters).forEach(key=>{
              this.allTableFilters[key]=[]
              for(let eachOrder of data['orderList']) {
                let idx=this.allTableFilters[key].findIndex(val=>val.name==eachOrder[key])
                if(idx==-1){
                  let obj={name: eachOrder[key]}
                  this.allTableFilters[key].push(obj)
                }
              }

          })

          this.allPaymentDetails.forEach(eachOrder => {
            if(eachOrder.paymentIndicator=='C'){
              let amt=+eachOrder.amount
              this.summary.allCredits=this.summary.allCredits+amt
            }
            if(eachOrder.paymentIndicator=='D'){
              let amt=+eachOrder.amount
              this.summary.allDebits=this.summary.allDebits+amt
            }
            if(eachOrder.paymentIndicator=='R'){
              let amt=+eachOrder.amount
              this.summary.allRefund=this.summary.allRefund+amt
            }
          })

          this.summary.total=this.summary.allCredits-(this.summary.allRefund+this.summary.allDebits)
        })
  }

  onFilterChange(event, column) {
        let arr=[]
        event.value.forEach(eachValue=>{
          arr.push(eachValue.name)
        })
        event.value=[...arr]
        this.txnTable.filter(event.value, column, 'in')
    }
    
    /* exportPdf() {
      import("jspdf").then(jsPDF => {
          import("jspdf-autotable").then(x => {
              const doc = new jsPDF.default(0,0);
              doc.autoTable(this.exportColumns, this.products);
              doc.save('products.pdf');
          })
      })
  } */

  exportExcel() {
    console.log(this.txnTable)
    let arr=[]
    this.allPaymentDetails.forEach(details=>{
      let obj={}
      this.allPaymentSchema.forEach(col=>{
        if(col.pipeChk=='date'){
          obj[col.header]=new Date(details[col.field])
        } else {
          obj[col.header]=details[col.field]
        }
      })
      arr.push(obj)
    })
    let sDate=this.startDate.toISOString().slice(0,10)
    let eDate=this.endDate.toISOString().slice(0,10)
    this.exportFile.exportAsXlsx(arr, `All_transaction_for_${sDate}_${eDate}`)
  }

}
