import { Component, OnInit } from '@angular/core';
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

  constructor(
    private externalFiles:ExternalFilesService
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
   this.externalFiles.getFacultiDetails()
    .subscribe(data => {
      this.facultyList=data
      console.log(this.facultyList)
    },
      error => {
        console.log(error)
      }
    )


    this.externalFiles.getAchivementDetails()
    .subscribe(data => {
      this.achivements=data
      console.log(this.achivements)
    },
      error => {
        console.log(error)
      }
    )
      
  }

}
