import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { ExternalFilesService } from 'src/app/core/services/external-files.service';
import { environment } from '../../../../../environments/environment'
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-view-all-faculty',
  templateUrl: './view-all-faculty.component.html',
  styleUrls: ['./view-all-faculty.component.css']
})
export class ViewAllFacultyComponent implements OnInit {

  facultyList: any= {}
  facultyListBackUp: any= {}
  profileImg: string
  module_endpoint =environment.server_endpoint
  displayBasic: boolean;
  clickedFaculty

  constructor(
    private externalFiles:ExternalFilesService
  ) { }


  ngOnInit() {
    this.externalFiles.getFacultiDetails().pipe(
      map(data => {
        data['faculties'].forEach(faculty => {
          faculty.selectedImageFile? 
          faculty.selectedImageFile=this.module_endpoint.baseUrl+"/"+faculty.selectedImageFile :
          faculty.selectedImageFile="assets/blank-picture.jpg"
        })
        return data
      })
    )
    .subscribe(data => {
      this.facultyList=data
      this.facultyListBackUp={...this.facultyList}
    },
      error => {
        console.log(error)
      }
    )
  }

  moreInfoCalled(faculty) {
    
    this.displayBasic=true
    this.clickedFaculty=faculty
  }

  searchCalled(event){
    this.facultyList={...this.facultyListBackUp}
    let filtereddata= []
    let searchedStr=event.srcElement.value.toUpperCase()
     this.facultyList.faculties.forEach(faculty => {
      if(faculty.firstName.toUpperCase().indexOf(searchedStr) !== -1 
      || faculty.lastName.toUpperCase().indexOf(searchedStr) !== -1) {
          filtereddata.push(faculty)
      }
    }); 
    
    this.facultyList.faculties=[...filtereddata]
  }

}
