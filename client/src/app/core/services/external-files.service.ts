import { Injectable } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ExternalFilesService {

  constructor(
    private http: HttpClient
  ) { }

  getFacultiDetails() {
   return this.http.get("assets/faculties/faculty_det.json")
   
  }

  getAchivementDetails() {
    return this.http.get("assets/achivements/achivement.json")
    
   }

}
