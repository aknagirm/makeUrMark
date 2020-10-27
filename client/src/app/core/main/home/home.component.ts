import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { ExternalFilesService } from '../../services/external-files.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  facultyList: any= {}
  responsiveOptions
  achivements: any={}
  returnUrl: string
  openLoginPopUp= {open: false, form: ""}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private externalFiles:ExternalFilesService,
  ) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '700px',
          numVisible: 1,
          numScroll: 1
      }
  ];
   }

  ngOnInit() {
   this.externalFiles.getFacultyDetails()
    .subscribe(data => {
      let arr=data['facultyList'].filter(faculty=>faculty.activeFlag==true && faculty.status=='working')
      console.log(arr)
      this.facultyList=arr
    },error => {console.log(error)})

    this.externalFiles.getAchivementDetails()
    .subscribe(data => {this.achivements=data},
              error => {console.log(error)})
  }

  registrationPopUp() {
    this.openLoginPopUp= {open: true, form: "register"}
  }

  loginPopUpClose($event){
    this.openLoginPopUp={open: false, form: ""}
  }

}
