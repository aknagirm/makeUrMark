import { Component, OnInit, ViewChild } from '@angular/core';
import {CountdownTimerService} from '../../services/countdown-timer.service'
import { EditCourseForm } from '../../../reusable/models/edit-courses';
import { Form, NgForm } from '@angular/forms';
import {SelectItem} from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent implements OnInit {
  
  openLoginPopUp= {open: false, form: ""}
  isLoggedIn=false
  sideNavBarOpen=false
  classList=['VI','VII','VIII','IX','X','XI','XII']
  constructor(
    private counter: CountdownTimerService,
    private router: Router
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
    this.openLoginPopUp={open: false, form: ""}
  }

  navigateTo(option: string){
      if(option === 'securePay'){
        this.router.navigate(['./securePay'])
      }

      this.sideNavBarOpen=false
  }
}
