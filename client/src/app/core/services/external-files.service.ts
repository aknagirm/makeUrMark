import { Injectable } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ExternalFilesService {

  module_endpoint= environment.server_endpoint

  constructor(
    private http: HttpClient
  ) { }

  getFacultiDetails() {
      return this.http.get(this.module_endpoint.home.getAllFaculties).pipe(
        map(data => {
          console.log(data)
          data['faculties'].forEach(faculty => {

            let postGrads=faculty.educationalDet[3]
            let grads=faculty.educationalDet[2]
            
            if(postGrads.passingInstitute && postGrads.studiedSub && postGrads.course){
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
