import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-order-hist',
  templateUrl: './view-order-hist.component.html',
  styleUrls: ['./view-order-hist.component.css']
})
export class ViewOrderHistComponent implements OnInit {

  durationSelected:string="6 months"
  userName: string
  orderHistoryList: any
  module_endpoint= environment.server_endpoint

  constructor(
    private auth: AuthService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.auth.getCurrentUser()
    this.auth.loggedInUserObj
        .subscribe(data => {
          if(data instanceof HttpErrorResponse || data == null || data == undefined) {
            this.userName=null
          } else {
            this.userName=data['userName']
            this.dropdownSelected()
          }
        })
  }

  dropdownSelected(){
    let currDate=new Date()
    let sDate: Date
    let eDate: Date
    if(this.durationSelected=='6 months'){
      eDate=new Date()
      sDate=new Date(currDate.setMonth(currDate.getMonth()-6))
    } else if(this.durationSelected=='1 year'){
      eDate=new Date()
      sDate=new Date(currDate.setMonth(currDate.getMonth()-12))
    } else {
      eDate=null
      sDate=null
    }
    console.log(sDate,this.userName)
    this.http.post(this.module_endpoint.specificUsersOrder,{startDate:sDate,endDate:eDate})
        .subscribe(data=>{
          this.orderHistoryList=data
          this.orderHistoryList.orderList.sort((a,b)=>{
            return a.transDate>b.transDate? -1: 1
          })
          console.log(this.orderHistoryList['orderList'])
        })
  }

}
