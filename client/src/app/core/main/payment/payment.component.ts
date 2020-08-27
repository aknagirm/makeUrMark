import { Component, OnInit } from '@angular/core';
import { WindowRefService, ICustomWindow } from '../../services/window-ref.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { globalAnimation } from '../../../reusable/animation/global-animation'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  animations: [
    globalAnimation.animationList.zoomInOut
 ]
})
export class PaymentComponent implements OnInit {

  paymentDet: any
  private _window: ICustomWindow
  _paymentURL = 'http://localhost:3010/payment/pay'
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private winRef: WindowRefService
  ) {
    this._window = this.winRef.nativeWindow;
    this.paymentDet=this.router.getCurrentNavigation().extras.state

  }

  ngOnInit() {
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
      "handler": function (response){
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature)
      },
      "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9999999999"
      },
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
 
  paymentPopUpClose() {
    this.router.navigate(['./courses'])
  }
}
