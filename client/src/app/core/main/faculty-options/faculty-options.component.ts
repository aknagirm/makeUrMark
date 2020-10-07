import { Component, OnInit } from '@angular/core';
import { ReferenceForm, MaterialUploadForm, ScheduleTestForm, RecordMarksForm } from '../../../reusable/models/faculty-options'
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { environment } from '../../../../environments/environment'
import {MessageService, ConfirmationService} from 'primeng/api';
import { StructuralService } from '../../services/structural.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { GradeBoardSubDetails } from 'src/app/reusable/models/grade-subject-fees-options';

export interface EnrolledStudent {
  userName: string;
  name: string;
  marks: string;
}


@Component({
  selector: 'app-faculty-options',
  templateUrl: './faculty-options.component.html',
  styleUrls: ['./faculty-options.component.css'],
  providers: [ConfirmationService]
})
export class FacultyOptionsComponent implements OnInit {

  allGrades: GradeBoardSubDetails[] =[]
  allSubjects: GradeBoardSubDetails[] =[]
  refFaculty: ReferenceForm =new ReferenceForm()
  refStudent: ReferenceForm =new ReferenceForm()
  uploadMaterial: MaterialUploadForm =new MaterialUploadForm()
  scheduleTest: ScheduleTestForm =new ScheduleTestForm()
  recordMarks: RecordMarksForm =new RecordMarksForm()
  module_endpoint= environment.server_endpoint
  selectedMaterial: File =null
  testSearchedObj: any =null
  enrolledStudentList: any
  minimumDate = new Date();
  allTests
  allMaterial

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth:AuthService,
    private http: HttpClient,
    private struct: StructuralService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.getAllScheduledTest()
    this.getAllMaterial()
    this.struct.getDetails({docType: 'Subject'})
    this.struct.getDetails({docType: 'Grade'})
    this.struct.allGrades.subscribe(data => {
      this.allGrades=data
    }, error=> { console.log(error)})
  
    this.struct.allSubjects.subscribe(data => {
      this.allSubjects=data
    }, error=> { console.log(error)})
  }

  scrollTo(someId: string){
    console.log(someId)
    document.getElementById(someId).scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
  }

  onReferenceSubmit(form: NgForm,referedRole: string, toastKey: string){
      let obj={...form.form.value}
      obj['referedRole']=referedRole

      this.http.post(this.module_endpoint.facultyOptions.referStudentFaculty, obj)
            .subscribe(data => {
              this.messageService.add(
                {key: toastKey, severity:'success', summary:'Thank you', 
                detail:'We will contact the person shortly'});
            }, error => {
              console.log(error)
              this.messageService.add(
                {key: toastKey, severity:'error', summary:'Error', 
                detail:error['error']['msg']});
        })
  }

  onMaterileSelected(event){
    this.selectedMaterial=<File>event.target.files[0]
  }

  onMaterialSubmit(form: NgForm){
    let obj={ ...form.form.value} 
    obj['subject']=obj['subject']['label']
    obj['grade']=obj['grade']['label'] 

    var formData= new FormData()
    formData.append('selectedMaterial', this.selectedMaterial)
    formData.append('payload', JSON.stringify(obj))

    this.http.post(this.module_endpoint.facultyOptions.materialUpload, formData)
        .subscribe(data => {
          this.messageService.add(
            {key: 'uploadMaterial', severity:'success', summary:'Successfull', life:30000,
            detail:data['msg']});
            form.reset()
            this.getAllMaterial()
        }, error => {
          console.log(error)
          this.messageService.add(
            {key: 'uploadMaterial', severity:'error', summary:'Failed', life:30000,
            detail:error['msg']});
    })
  }

  getAllMaterial() {
    this.http.get(this.module_endpoint.facultyOptions.getAllMaterial).pipe(
      map(data => {
        data['materialList'].forEach(material => {
          let index=material.selectedMaterial.lastIndexOf('\\')
          if(index != -1) {
            let newFilename=material.selectedMaterial.substr(index+25)
            material.newFileName=newFilename
          }
        });
        return data
      })
    ).subscribe(data => {
          this.allMaterial=data
        })
  }

  deleteMaterial(material) {
    console.log(material)
    this.confirmationService.confirm({
      key: 'deleteMaterialConfirm',
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
    this.http.post(this.module_endpoint.facultyOptions.deleteMaterialById, material)
        .subscribe(data => {
          this.getAllMaterial()
          this.messageService.add(
            {key: 'scheduleTest', severity:'info', summary:'Material Deleted', life:10000,
            detail:`Selected material has been deleted`});
        }, error => {
          console.log(error)
          this.messageService.add(
            {key: 'scheduleTest', severity:'error', summary:'Failed', 
            detail:error['msg']});
        })
        
      }
    });
  }


  onScheduleTestSubmit(form: NgForm){
      let obj={ ...form.form.value}
      obj['subject']=obj['subject']['label']
      obj['grade']=obj['grade']['label']
      obj['result']=[]
      this.http.post(this.module_endpoint.facultyOptions.scheduleTest, obj)
            .subscribe(data => {
              this.messageService.add(
                {key: 'scheduleTest', severity:'info', summary:'Test Scheduled', life:60000,
                detail:`Please note the test id: ${data['details']['testId']}`});
                form.reset()
                this.getAllScheduledTest()
            }, error => {
              console.log(error)
              this.messageService.add(
                {key: 'scheduleTest', severity:'error', summary:'Failed', 
                detail:error['msg']});
            })
  }

  getAllScheduledTest() {
    this.http.get(this.module_endpoint.facultyOptions.getAllScheduledTest)
        .subscribe(data => {
          this.allTests=data
          console.log(this.allTests)
        })
  }

  deleteTest(event){
    this.confirmationService.confirm({
      key: 'deleteTestConfirm',
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
     
    this.http.post(this.module_endpoint.facultyOptions.deleteTestById, event)
        .subscribe(data => {
          this.getAllScheduledTest()
          this.messageService.add(
            {key: 'scheduleTest', severity:'info', summary:'Test Deleted', life:10000,
            detail:`Scheduled Test deleted for: ${data['test']['testId']}`});
        }, error => {
          console.log(error)
          this.messageService.add(
            {key: 'scheduleTest', severity:'error', summary:'Failed', 
            detail:error['error']['msg']});
        })
      }
    });
  }

  getTestIdList(){
    if(this.recordMarks.grade && this.recordMarks.subject 
          && this.recordMarks.testDate && this.recordMarks.testDate){
      let obj={ ...this.recordMarks}
      obj['subject']=obj['subject']['label']
      obj['grade']=obj['grade']['label'] 
            console.log(obj)
      this.http.post(this.module_endpoint.facultyOptions.getTestIds, obj).pipe(
        map(data => {
          data['details'].forEach(element => {
            let date=new Date(element.testDateTime)
            element.label=`Test Id: ${element.testId} ----- ( Slot: ${date.toLocaleTimeString()} )`
            element.value=element.testId
          })
        return data
        })
            ).subscribe(data => {
                this.testSearchedObj=data
            })
    }
    
  }

  searchStudents(testId: string){
    this.http.post(this.module_endpoint.facultyOptions.getTestDetailsWithId, {testId: testId}).pipe(
      map(data => {
        let arrObj={obtainedMarks: []}
        if(data['details']){
        arrObj={...data['details'], ...arrObj}
        delete arrObj['result']
          data['details']['result'].forEach(element => {
            arrObj.obtainedMarks.push({userName: element.userName,
                fullName: `${element.firstName} ${element.lastName}`,
                firstName: element.firstName,
                lastName: element.firstName,
                marks: element.marks})
          });}
          else {
            this.messageService.add(
              {key: 'recordMarks', severity:'error', summary:'Failed', life:30000,
              detail:'Searched test id not Found'});
          }
          return arrObj
      })).subscribe(data => {
          this.enrolledStudentList=data
          }, error =>{
            console.log(error)
            this.messageService.add(
              {key: 'recordMarks', severity:'error', summary:'Failed', life:30000,
              detail:error['error']['msg']});
          })
  }

  updateStudentMarks(){
    this.http.post(this.module_endpoint.facultyOptions.updateTestMarks, this.enrolledStudentList)
          .subscribe(data => {
            this.messageService.add(
              {key: 'recordMarks', severity:'info', summary:'SuccessFull', life:30000,
              detail:'Marks have been captured successfully'});
              this.searchStudents(this.enrolledStudentList.testId)
          }, error => {
            console.log(error)
            this.messageService.add(
              {key: 'recordMarks', severity:'error', summary:'Failed', life:30000,
              detail:error['msg']});
              this.searchStudents(this.enrolledStudentList.testId)
          })}
}
