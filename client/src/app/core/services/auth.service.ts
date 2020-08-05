import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean
  module_endpoint= environment.server_endpoint

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

   registerUser(userObj){
    console.log(userObj)
    var obj
    return obj=this.http.post(this.module_endpoint.auth.register, userObj)
      .subscribe(data=>{
        console.log(data)
        localStorage.setItem("token", data['token'])
        return {name: data['name'], role: data['role']}
      }, error=>{
        console.log(error)
        return null
      })
    }

    registerFaculty(facultyObj) {
      var obj
      return obj=this.http.post(this.module_endpoint.auth.facultyRegister, facultyObj)
        .subscribe(data=> {
          console.log(data)
          localStorage.setItem("token", data['token'])
          return {name: data['name'], role: data['role']}
        }, error=> {
          console.log(error)
          return null
        })

    }
    
    facultyCVUpload(fileDet: File){
      let formData= new FormData()
    // formData.append('selectedCVFile', this.selectedCVFile, this.selectedCVFile.name)
      formData.append('selectedCVFile', fileDet, fileDet.name)
      console.log(fileDet)
      let promise=new Promise((res,rej)=> {
      this.http.post(this.module_endpoint.auth.facultyCVUpload, formData)
            .subscribe(data => {
              return res(data)
            })
      })
      return promise
    }

  userIsLoggedIn(){
    let token=localStorage.getItem("token")
  }

}
