import { Component, OnInit } from '@angular/core';
import { globalAnimation } from '../../reusable/animation/global-animation'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header-updated',
  templateUrl: './header-updated.component.html',
  styleUrls: ['./header-updated.component.css'],
  animations: [
    globalAnimation.animationList.slideLeftRight
  ]
})
export class HeaderUpdatedComponent implements OnInit {

  openLoginPopUp= {open: false, form: ""}
  isLoggedIn=false
  sideNavBarOpen=false
  classList=['VI','VII','VIII','IX','X','XI','XII']
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  openSideNav(){
    this.sideNavBarOpen= !this.sideNavBarOpen
  }

  loginPopUp() {
    this.openLoginPopUp= {open: true, form: "login"}
  }

  loginPopUpClose($event){
    console.log("close call")
    this.openLoginPopUp={open: false, form: ""}
  }

  navigateTo(option: string){

    console.log(option)
      if(option === 'securePay'){
        this.router.navigate(['./securePay'])
      }

      this.sideNavBarOpen=false
  }
}
