import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss']
})
export class BusinessCardComponent implements OnInit {

  @Input('facultyDet') facultyDet: any
  name

  
  constructor() { }

  ngOnInit() {

    this.name=this.facultyDet.name
  }

}
