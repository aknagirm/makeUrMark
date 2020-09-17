import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICustomWindow, WindowRefService } from './window-ref.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  paymentDet: any
  private _window: ICustomWindow
  _paymentURL = 'http://localhost:3010/payment/pay'
  response=new Subject<any>()

  constructor(
    private winRef: WindowRefService
  ) { 
    this._window = this.winRef.nativeWindow;
  }

  async pay(){
    const __DEV__ = document.domain === 'localhost'
      
        const data = await fetch(this._paymentURL, { 
          method: 'POST' ,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({'amount':this.paymentDet.amount})
        }).then((t) =>
          t.json()
      )
  
      console.log(data)
      var options = {
        key: __DEV__ ? 'rzp_test_rUIMwoY7ppsSFb' : 'PRODUCTION_KEY',
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: 'School Fees',
        "description": "Thank you for the payment",
        "image": '../../../assets/HPSLogo.png', 
        "handler": ((response) => {
          //this.response=(response.razorpay_payment_id);
          this.response.next(response.razorpay_payment_id)
          //this.getResponse(this.response)
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
        }
      }
      const paymentObject = new this.winRef.nativeWindow['Razorpay'](options);
      paymentObject.open()
    }

    getResponse(response) {
      console.log(this.response)
      //this.response.next(JSON.stringify(response))
      //return this.response.asObservable()
    }
    
   
}
