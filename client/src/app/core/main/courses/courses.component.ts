import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { environment } from '../../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  bulb='on'
  bulbUrl
  module_endpoint = environment.server_endpoint.subjectDet
  subjectList: any
  itemSelected=[]
  totalCost=0

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

  ngOnInit() {
    this.bulbEnlight()
    this.fetchSubjectList()
  }

  bulbEnlight(){
    const obj=interval(2000)
    obj.subscribe(data => {
      if(this.bulb == "on"){
        this.bulb ='off'
        this.bulbUrl =`../../../../assets/bulb_off.png`
      }
      else {
        this.bulb = 'on'
        this.bulbUrl ='../../../../assets/bulb_on.png'
      }
     })
   }

  async fetchSubjectList(){
    var facultyList = await this.getFacultyDetails()
    this.http.post(this.module_endpoint.subjectDetails, {"grade":"6","board":"wb"}).pipe(
      map(data => {
        for(let sub of data['subjectList']){
          for(let faculty of facultyList['facultyList']){
            if(sub.facultyName ==faculty.email){
              sub.facultyFullName =`${faculty.firstName} ${faculty.lastName}`
              sub.facultyQualification =faculty.qualification
            }
          }
        }
        return data['subjectList']
      })
      ).subscribe(data=> {
          this.subjectList =data
        })
   }


   getFacultyDetails(){
    var obj = {"grade":"6","board":"wb"}
    let promise =new Promise((res,rej) => {
      return this.http.post(this.module_endpoint.getFaculty, obj)
        .subscribe(data => {
          return res(data)
        })
    })
    return promise
  }

  displaySelected(event){
    this.totalCost=0
    this.itemSelected=event
    this.itemSelected.forEach(item => {
      var cost =+item.cost
      this.totalCost =this.totalCost + cost
    })
  }

  securePay(){
    this.route.navigate(["securePay"],{state: {amount: this.totalCost*100, name: 'Mr.Dummy'}})
  }
}