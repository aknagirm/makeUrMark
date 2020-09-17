import { Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, DoCheck {

  display: boolean=false
  total1=0
  @Input() columns=[]
  @Input() itemList=[]
  itemListChanged=[]
  

  constructor() { }

  ngOnInit() {
  }

  
  ngDoCheck(){
    if(this.itemList.length != this.itemListChanged.length){
      this.total1=0
      this.itemListChanged=[...this.itemList]
      this.itemListChanged.forEach(item=>{
        let fees=+item.testFees
        this.total1=fees+this.total1
      })
      
    console.log(this.itemListChanged)
    }
  }

  displayCartItem(){
    this.display = true;
  }

}
