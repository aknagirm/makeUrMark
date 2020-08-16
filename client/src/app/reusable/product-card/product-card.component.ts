import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment'
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  
  @Input('facultyDet') facultyDet: any
  profileImg: string
  module_endpoint =environment.server_endpoint

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.facultyDet)
    //this.name=this.facultyDet.name
    this.facultyDet.selectedImageFile? 
        this.profileImg=this.module_endpoint.baseUrl+"/"+this.facultyDet.selectedImageFile :
        this.profileImg="assets/blank-picture.jpg"

  }

  viewAllCalled(){
    this.router.navigate(['/facultyView'])
  }

}
