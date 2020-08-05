import { Component, OnInit, ViewChild } from '@angular/core';
import {CountdownTimerService} from '../../services/countdown-timer.service'
import { EditCourseForm } from '../courses/edit-courses/edit-courses';
import { Form, NgForm } from '@angular/forms';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent implements OnInit {
  @ViewChild('editCoursesForm',{static:true}) editCoursesForm: NgForm
  dummyResultHeader=[0]
  datehalf
  cars: SelectItem[];
  courseDet: EditCourseForm = new EditCourseForm()
  constructor(
    private counter: CountdownTimerService
  ) {  this.cars = [
    {label: 'Audi', value: 'Audi'},
    {label: 'BMW', value: 'BMW'},
    {label: 'Fiat', value: 'Fiat'},
    {label: 'Ford', value: 'Ford'},
    {label: 'Honda', value: 'Honda'},
    {label: 'Jaguar', value: 'Jaguar'},
    {label: 'Mercedes', value: 'Mercedes'},
    {label: 'Renault', value: 'Renault'},
    {label: 'VW', value: 'VW'},
    {label: 'Volvo', value: 'Volvo'},
];}

  ngOnInit() {


  }

  add(){
    this.dummyResultHeader.push(0)
  }


  clicked(){
    this.counter.startTimer("00:00:20").subscribe(
      data =>{
        console.log(data)
      }
    )
  }

  onSubmit(facultyForm2){
    console.log(facultyForm2.value)
  }
}
