import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class StructuralService {

  module_endpoint= environment.server_endpoint

  constructor(
    private http: HttpClient
  ) { }

  getAllGradeSubjects(){
    let promise =new Promise((res,rej)=> {
      this.http.get(this.module_endpoint.subjectDet.allGradeSubs)
      .subscribe(data => {
        console.log(data)
        return res(data)
      })
    })
      return promise
  }
}
