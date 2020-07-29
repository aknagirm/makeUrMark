import { Component, OnInit, ViewChild } from '@angular/core';
import {CountdownTimerService} from '../../services/countdown-timer.service'
import { EditCourseForm } from '../courses/edit-courses/edit-courses';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent implements OnInit {
  @ViewChild('editCoursesForm',{static:true}) editCoursesForm: NgForm
  datehalf
  courseDet: EditCourseForm = new EditCourseForm()
  constructor(
    private counter: CountdownTimerService
  ) { }

  ngOnInit() {
  }

  onSubmit(event) {
    console.log("hi",this.courseDet,this.editCoursesForm)
  }

  clicked(){
    this.counter.startTimer("00:00:20").subscribe(
      data =>{
        console.log(data)
      }
    )
  }

}
