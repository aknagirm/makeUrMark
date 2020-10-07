import { Injectable } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ExternalFilesService {

  module_endpoint= environment.server_endpoint
  facultyPassed={}
  loginRegistrationOpen=new BehaviorSubject<string>(null)

  constructor(
    private http: HttpClient
  ) { }

  getFacultyDetails() {
      return this.http.get(this.module_endpoint.home.getAllFaculties).pipe(
        map(data => {
          data['faculties'].forEach(faculty => {
            let postGrads=faculty.educationalDet[3]
            let grads=faculty.educationalDet[2]
            
            if(postGrads && postGrads.passingInstitute && postGrads.studiedSub && postGrads.course){
              faculty.highestQualification= postGrads
            } else {
              faculty.highestQualification= grads
            }
            
          });
          return data
        })
      )
  }

  getAchivementDetails() {
    return this.http.get("assets/achivements/achivement.json")
    
   }

}
