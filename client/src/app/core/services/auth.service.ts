import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userObj
  loggedInUserObj =new Subject<any>()
  isLoggedIn: boolean
  module_endpoint= environment.server_endpoint

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  loginUser(userObj){
    this.http.post(this.module_endpoint.auth.login, userObj)
        .subscribe(data => {
          console.log(data)
          localStorage.setItem("token", data['token'])
          this.getCurrentUser()
        }, error => {
          console.log( error['msg'])
          this.loggedInUserObj.next(error)
        })
  }


   registerUser(userObj){
    console.log(userObj)
    var obj
    return obj=this.http.post(this.module_endpoint.auth.register, userObj)
      .subscribe(data=>{
        console.log(data)
        localStorage.setItem("token", data['token'])
        return {name: data['name'], userRole: data['userRole']}
      }, error=>{
        console.log(error)
        return null
      })
    }

    registerFaculty(facultyObj): Promise<any>{
      let promise =new Promise((res,rej) => {
        this.http.post(this.module_endpoint.auth.facultyRegister, facultyObj)
        .subscribe(data=> {
          console.log(data)
          localStorage.setItem("token", data['token'])
          this.getCurrentUser()
          return res({name: data['name'], userRole: data['userRole']})
        }, error=> {
          console.log(error)
          return rej(error)
        })
      })
      return promise
    }

    getCurrentUser(){
      let token=localStorage.getItem("token")
      if(token){
        this.http.get(this.module_endpoint.auth.getUserDetail)
        .subscribe(data => {
          this.loggedInUserObj.next(data['user'])
        })
      }
    }
    
    facultyCVUpload(fileDet: File){
      let formData= new FormData()
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

    updateUserProfile(userObj): Promise<any>{
      let newUser =new Promise((res, rej) =>{
        this.http.post(this.module_endpoint.auth.updateUserProfile, userObj)
        .subscribe(data => {
          return res(data)
        }, error => {
          console.log(error)
          return rej(error)
        })
      })
      return newUser
    }

    updateProfilePicture(userObj): Promise<any>{
      console.log(...userObj)
      let newUser = new Promise((res,rej) =>{
        this.http.post(this.module_endpoint.auth.updateProfilePicture, userObj)
        .subscribe(data => {
          console.log(data)
          return res(data)
        }, error => {
          return rej(error)
        })
      })
      return newUser
    }

    removeProfilePicture(userObj): Promise<any>{
      console.log(...userObj)
      let newUser = new Promise((res,rej) =>{
        this.http.post(this.module_endpoint.auth.removeProfilePicture, userObj)
        .subscribe(data => {
          console.log(data)
          return res(data)
        }, error => {
          return rej(error)
        })
      })
      return newUser
    }

  logoutUser(){
    localStorage.removeItem("token")
    this.loggedInUserObj.next(null)
  }

  /* getCurrentUser(){
    this.userObj={userName: "abc", userRole: "faculty"}
  }
 */
  getLocalStorageItem(){
    return localStorage.getItem('token')
  }

}
