import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICustomWindow, WindowRefService } from './window-ref.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  paymentDet: any
  private _window: ICustomWindow
  courseRes=new Observable
  response=new Subject<any>()
  module_endpoint = environment.server_endpoint
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private winRef: WindowRefService
  ) { 
    this._window = this.winRef.nativeWindow;
  }

  async payForTest(list){
    const __DEV__ = document.domain === 'localhost'
      console.log(list)
    let data = await fetch(this.module_endpoint.paymentURL, { 
      method: 'POST' ,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'amount':this.paymentDet.amount})
      }).then((t) =>
      t.json()
    )
  
      var options = {
        key: __DEV__ ? 'rzp_test_rUIMwoY7ppsSFb' : 'PRODUCTION_KEY',
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: 'School Fees',
        "description": "Thank you for the payment",
        "image": '../../../assets/HPSLogo.png', 
        "handler": ((response) => {
         // this.dummyRes=(response.razorpay_payment_id);
         let testPaymentobj={
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          paymentReason: 'Test purchase',
          testList: [...list],
          paymentTo: 'Institute',
          paymentIndicator: 'C',
          amount: data.amount/100
        }
        this.paymentCapture(testPaymentobj)
        this.response.next(response.razorpay_payment_id)
          //this.getResponse(this.response)
         // this.razorPaySuccessHandler.bind(this)
          }),
        /* "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9999999999"
        }, */
        "notes": {
            "address": "MakeUrMark Payment"
        },
        "theme": {
            "color": "#063247"
        },
        modal: {
          // We should prevent closing of the form when esc key is pressed.
          escape: false,
          ondismiss : (() => {
            // handle the case when user closes the form while transaction is in progress
            console.log('Transaction cancelled.');
          })
        },
      }
      const paymentObject = new this.winRef.nativeWindow['Razorpay'](options);
      paymentObject.open()
    }


  async purchaseCourse(selectedCourses: any[], totalMonths,walletDeduction){
    const __DEV__ = document.domain === 'localhost'
      
    let data = await fetch(this.module_endpoint.paymentURL, { 
      method: 'POST' ,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'amount':this.paymentDet.amount})
      }).then((t) =>
      t.json()
    )
  
      var options = {
        key: __DEV__ ? 'rzp_test_rUIMwoY7ppsSFb' : 'PRODUCTION_KEY',
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: 'School Fees',
        "description": "Thank you for the payment",
        "image": '../../../assets/HPSLogo.png', 
        "handler": ((response) => {
          let coursePaymentobj={
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            paymentReason: 'Course purchase',
            subjectList: selectedCourses.map(course=>course.feesSelected),
            totalDays: totalMonths*30,
            paymentTo: 'Institute',
            paymentIndicator: 'C',
            amount: data.amount/100
          }
          this.paymentCapture(coursePaymentobj)
          // this.dummyRes=(response.razorpay_payment_id);
          //this.response.next(response.razorpay_payment_id)
          //this.getResponse(this.response)
          //this.purchaseCourseSuccess.bind(this)
          this.purchaseCourseSuccess(selectedCourses,walletDeduction)
          }),
        /* "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9999999999"
        }, */
        "notes": {
            "address": "MakeUrMark Payment"
        },
        "theme": {
            "color": "#063247"
        },
        modal: {
          // We should prevent closing of the form when esc key is pressed.
          escape: false,
          ondismiss : (() => {
            // handle the case when user closes the form while transaction is in progress
            console.log('Transaction cancelled.');
          })
        },
      }
      const paymentObject = new this.winRef.nativeWindow['Razorpay'](options);
      paymentObject.open()
    }

  paymentCapture(details){
    this.http.post(this.module_endpoint.orderPaymentAdd, details)
        .subscribe(console.log)
  }


  purchaseCourseSuccess(slectedCourses,walletDeduction){
     console.log(slectedCourses)
      this.http.post(this.module_endpoint.studentOptions.addCourses, {courseList: slectedCourses,deduction:walletDeduction})
            .subscribe(data=>{
              console.log(data)
              this.response.next(data)
            },error=>{
              console.log(error)
              this.response.next(error)
      })
  }
   
}
