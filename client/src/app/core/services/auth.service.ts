import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment'
import { concat, concatMap, map, zipAll } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userObj
  loggedInUserObj =new BehaviorSubject<any>(null)
  isLoggedIn: boolean
  /* facultyList: any[]=[]
  studentList: any[]=[] */
  allUser: any
  module_endpoint= environment.server_endpoint

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  loginUser(userObj){
    this.http.post(this.module_endpoint.auth.login, userObj)
        .subscribe(data => {
          localStorage.setItem("token", data['token'])
          this.getCurrentUser()
        }, error => {
          console.log( error)
          this.loggedInUserObj.next(error)
        })
  }


   /* registerUser(userObj){
    var obj
    return obj=this.http.post(this.module_endpoint.auth.register, userObj)
      .subscribe(data=>{
        localStorage.setItem("token", data['token'])
        return {name: data['name'], userRole: data['userRole']}
      }, error=>{
        console.log(error)
        return null
      })
    } */

    registerStudent(userObj): Promise<any>{
      let promise =new Promise((res,rej) => {
        this.http.post(this.module_endpoint.auth.studentRegister, userObj)
        .subscribe(data=> {
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

    registerFaculty(facultyObj): Promise<any>{
      let promise =new Promise((res,rej) => {
        this.http.post(this.module_endpoint.auth.facultyRegister, facultyObj)
        .subscribe(data=> {
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
        this.http.get(this.module_endpoint.auth.getUserDetails)
        .subscribe(data => {
          this.loggedInUserObj.next(data['user'])
        })
      } else {
        this.loggedInUserObj.next({userName:"none"})
      }
    }
    
    facultyCVUpload(fileDet: File){
      let formData= new FormData()
      formData.append('selectedCVFile', fileDet, fileDet.name)
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
      let newUser = new Promise((res,rej) =>{
        this.http.post(this.module_endpoint.auth.updateProfilePicture, userObj)
        .subscribe(data => {
          return res(data)
        }, error => {
          return rej(error)
        })
      })
      return newUser
    }

    removeProfilePicture(userObj): Promise<any>{
      let newUser = new Promise((res,rej) =>{
        this.http.post(this.module_endpoint.auth.removeProfilePicture, userObj)
        .subscribe(data => {
          return res(data)
        }, error => {
          return rej(error)
        })
      })
      return newUser
    }

  getAllUser(){
    let faculty$=this.http.get(this.module_endpoint.auth.getAllFaculties)
    let student$=this.http.get(this.module_endpoint.auth.getAllStudents)
    return faculty$.pipe(
      concatMap(faculty=>{
        return student$.pipe(map(student=>{
          return {'studentList':student,'facultyList':faculty}
        }) ) 
      })
    )   
  }

  logoutUser(){
    localStorage.removeItem("token")
    this.loggedInUserObj.next(null)
  }

  getLocalStorageItem(){
    return localStorage.getItem('token')
  }

}
