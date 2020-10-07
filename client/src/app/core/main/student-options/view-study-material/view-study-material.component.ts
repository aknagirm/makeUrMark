import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExternalFilesService } from 'src/app/core/services/external-files.service';
import { StructuralService } from 'src/app/core/services/structural.service';
import { GradeBoardSubDetails } from 'src/app/reusable/models/grade-subject-fees-options';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-study-material',
  templateUrl: './view-study-material.component.html',
  styleUrls: ['./view-study-material.component.css']
})
export class ViewStudyMaterialComponent implements OnInit {

  allSubjectsMaterial: any[] =[]
  materialList: any[]=[]
  pdfSrc: string=''
  fileName:string
  fullScreen: boolean=false
  zoomSize=1.0
  displayFile: boolean=false
  subjectFilter=[]
  @ViewChild('PdfViewer',{static:true}) pdfComponent
  module_endpoint= environment.server_endpoint
  constructor(
    private router: Router,
    private http: HttpClient,
    private struct: StructuralService,
    private externalFiles: ExternalFilesService
  ) { }

  ngOnInit() {
    let arr=[]
    this.struct.getDetails({docType: 'Subject'})
    const materials$:Observable<any>=this.getAllMaterial()
    const subjects$: Observable<GradeBoardSubDetails[]>=this.struct.allSubjects
    combineLatest(subjects$,materials$).pipe(
      map(([subjects,materials])=>{
        subjects.forEach(sub=>{
          sub['material']=[]
          materials.forEach(material => {
            if(material.subject == sub.label){
              sub['material'].push(material)
            }
          });
        })
      return subjects
      })
    ).subscribe(data=>{
      this.allSubjectsMaterial=[...data]
      let i=0
      while(i<this.allSubjectsMaterial.length){
        if(this.allSubjectsMaterial[i].material.length==0){
          this.allSubjectsMaterial.splice(i,1)
        } else {
          i++
        }
      }
      
      console.log(this.allSubjectsMaterial)
    })
  }



  getAllMaterial():Observable<any>{
   return this.http.get(this.module_endpoint.studentOptions.getAllMaterial).pipe(
      map(materialList=>{
        materialList['materialList'].forEach(material=>{
          material['fileName']=material['selectedMaterial'].substr(42)
        })
        return materialList['materialList']
      })
    )
  }

  openMaterial(material){
    this.displayFile=true
    this.fileName=material.fileName
    this.pdfSrc =(this.module_endpoint.baseUrl + "/" + material.selectedMaterial + "#toolbar=0").replace(/\\/g,"/")
  }

  search(stringToSearch: string) {
    this.pdfComponent.pdfFindController.executeCommand('find', {
      caseSensitive: false, findPrevious: undefined, highlightAll: true, phraseSearch: true, query: stringToSearch
    });
  }

  zoomInOut(indicator:string){
    indicator=='inc'?
    this.zoomSize=this.zoomSize<2?parseFloat((this.zoomSize+0.1).toFixed(1)):this.zoomSize:
      indicator=='dec'?
      this.zoomSize=this.zoomSize>0?parseFloat((this.zoomSize-0.1).toFixed(1)):this.zoomSize:''
  }

  /* fullScreenCall(){
    this.fullScreen=!this.fullScreen
    this.fullScreen?this.zoomSize=this.zoomSize*2:''
    !this.fullScreen?this.zoomSize=this.zoomSize/2:''
    console.log(this.fullScreen)
  } */

  materialSort(sortOption){
    console.log(sortOption)
      this.allSubjectsMaterial.forEach((sub)=>{
        sub.material.sort((a,b)=>{
         if(sortOption=='asc'){
          return new Date(a.uploadDate).getTime()-new Date(b.uploadDate).getTime()
          } else {
            return new Date(b.uploadDate).getTime()-new Date(a.uploadDate).getTime()
          }
        })
      })
      console.log(this.allSubjectsMaterial)
    }

    facultyClicked(facultyUserName){
      console.log(facultyUserName)
      this.externalFiles.facultyPassed={'facultyUserName':facultyUserName}
      this.router.navigate(['/facultyView'])
    }
}
