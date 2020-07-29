import { Component, OnInit, ViewChild } from '@angular/core';
import { EditCourseForm } from './edit-courses';
import { NgForm } from '@angular/forms';
import { environment } from '../../../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.css']
})
export class EditCoursesComponent implements OnInit {

  module_endpoint = environment.server_endpoint.subjectDet
  type: string[] = []
  @ViewChild('editCoursesForm', { static: true }) editCoursesForm: NgForm

  courseDet: EditCourseForm = new EditCourseForm()
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    console.log(this.courseDet.columns)
  }

  changed(event, name) {
    console.log(event, name)
    if (this.courseDet.grade != null && this.courseDet.board != null) {
      var obj = { grade: this.courseDet.grade, board: this.courseDet.board }
      this.http.post(this.module_endpoint.getFaculty, obj).pipe(
        map(data => {
          var newData = []
          for (let faculty of data['facultyList']) {
            var obj = { label: `${faculty.firstName} ${faculty.lastName}`, value: faculty.email }
            newData.push(obj)
          }
          return newData
        })
      )
        .subscribe(data => {
          for (let det of this.courseDet.columns) {
            if (det.name == 'facultyName') {
              console.log(det)
              det.values = data
            }
          }
        })
    }
  }

  
  formSubmitted(event) {
    let days={sun: 1,mon:2, tue: 3, wed: 4, thu:5, fri:6, sat:7}
    console.log(this.courseDet)
    this.courseDet.batchId =`G${this.courseDet.grade}_${(this.courseDet.type.substr(0,1)).toUpperCase()}_${this.courseDet.subjectName.substr(0,3)}_0${days[this.courseDet.day]}_${this.courseDet.startTime.replace(':','')}_${this.courseDet.endTime.replace(':','')}`


    this.http.post(this.module_endpoint.addSubject, this.courseDet)
        .subscribe(data => {
          console.log(data)
        })
    console.log(this.courseDet)
  }


}
