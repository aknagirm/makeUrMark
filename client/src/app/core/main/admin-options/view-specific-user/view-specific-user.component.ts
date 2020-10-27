import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { FacultyProfileDetails, StudentProfileDetails } from 'src/app/reusable/models/user-profile';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-specific-user',
  templateUrl: './view-specific-user.component.html',
  styleUrls: ['./view-specific-user.component.css']
})
export class ViewSpecificUserComponent implements OnInit {

  facultyProfileStruct=FacultyProfileDetails
  studentProfileStruct=StudentProfileDetails
  userDet: any
  cvFileURL: string=''
  module_endpoint=environment.server_endpoint
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if(!this.auth.allUser){
      this.router.navigate(['/allUserView'])
    } else {
       this.route.params.subscribe(data=>{
       this.userDet= this.auth.allUser.find(user=>user.userName==data.uname)
       /* let userKey=Object.keys(this.userDet)
         userKey.map(key=>{
          if(typeof this.userDet[key]=='object'){
            let str = this.userDet[key].toString()
            this.userDet[key] = str.replace(/,/g, ", ")
          }
         }) */
       this.cvFileURL=(this.module_endpoint.baseUrl + "/" + this.userDet.selectedCVFile).replace(/\\/g,"/")
       console.log(this.userDet)
      })
    }
  }

  openCV(cvURL){
    let url =(this.module_endpoint.baseUrl + "/" + cvURL + "#toolbar=0").replace(/\\/g,"/")
    console.log(url)
  }

}
