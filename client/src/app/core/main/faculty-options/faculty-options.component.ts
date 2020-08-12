import { Component, OnInit } from '@angular/core';
import { ReferenceForm, MaterialUploadForm, ScheduleTestForm, RecordMarksForm } from './faculty-options'
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { environment } from '../../../../environments/environment'
import {MessageService} from 'primeng/api';
import { StructuralService } from '../../services/structural.service';
import { map } from 'rxjs/operators';
import { SortEvent } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

export interface EnrolledStudent {
  userName: string;
  name: string;
  marks: string;
}


@Component({
  selector: 'app-faculty-options',
  templateUrl: './faculty-options.component.html',
  styleUrls: ['./faculty-options.component.css']
})
export class FacultyOptionsComponent implements OnInit {

  allGradesSubjects: any
  refFaculty: ReferenceForm =new ReferenceForm()
  refStudent: ReferenceForm =new ReferenceForm()
  uploadMaterial: MaterialUploadForm =new MaterialUploadForm()
  scheduleTest: ScheduleTestForm =new ScheduleTestForm()
  recordMarks: RecordMarksForm =new RecordMarksForm()
  obj={}
  module_endpoint= environment.server_endpoint
  selectedMaterial: File =null
  testSearchedObj: any =null
  enrolledStudentList: any

  constructor(
    private route: ActivatedRoute,
    private auth:AuthService,
    private http: HttpClient,
    private struct: StructuralService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      this.scrollTo(fragment)
    })
    this.getAllGradeSubs()
    this.auth.getCurrentUser()
    this.obj['userName']=this.auth.userObj.userName
    this.obj['userRole']=this.auth.userObj.role
  }

  scrollTo(someId: string){
      document.getElementById(someId).scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
  }

  async getAllGradeSubs(){
      let allDet= await this.struct.getAllGradeSubjects()
      this.allGradesSubjects=allDet['gradeList'][0]
      console.log(this.allGradesSubjects)
  }

  onReferenceSubmit(form: NgForm,referedRole: string, toastKey: string){
      console.log(form)
      let obj={...this.obj,...form.form.value}
      obj['referedRole']=referedRole
      console.log(obj)

      this.http.post(this.module_endpoint.facultyOptions.referStudentFaculty, obj)
            .subscribe(data => {
              console.log(data)
              this.messageService.add(
                {key: toastKey, severity:'success', summary:'Thank you', 
                detail:'We will contact the person shortly'});
            }, error => {
              console.log(error)
              this.messageService.add(
                {key: toastKey, severity:'error', summary:'Error', 
                detail:'Please check your internet conncetion or contact Admin'});
        })
  }

  onMaterileSelected(event){
    this.selectedMaterial=<File>event.target.files[0]
  }

  onMaterialSubmit(form: NgForm){
    let obj={...this.obj, ...form.form.value}
    obj['subject']=obj['subject']['value']
    obj['grade']=obj['grade']['value']
    console.log(obj)

    var formData= new FormData()
    formData.append('selectedMaterial', this.selectedMaterial)
    formData.append('payload', JSON.stringify(obj))

    this.http.post(this.module_endpoint.facultyOptions.materialUpload, formData)
        .subscribe(data => {
          console.log(data)
          this.messageService.add(
            {key: 'uploadMaterial', severity:'success', summary:'Successfull', 
            detail:data['msg']});
        }, error => {
          console.log(error)
          this.messageService.add(
            {key: 'uploadMaterial', severity:'error', summary:'Failed', 
            detail:error['msg']});
    })
  }

  onScheduleTestSubmit(form: NgForm){
      console.log(form.form.value)
      let obj={...this.obj, ...form.form.value}
      obj['subject']=obj['subject']['value']
      obj['grade']=obj['grade']['value']
      obj['result']=[]
      console.log(obj, obj['testDateTime'])

      this.http.post(this.module_endpoint.facultyOptions.scheduleTest, obj)
            .subscribe(data => {
              console.log(data, data['details']['testDateTime'].toString())
              this.messageService.add(
                {key: 'scheduleTest', severity:'info', summary:'Test Scheduled', life:60000,
                detail:`Please note the test id: ${data['details']['testId']}`});
            }, error => {
              console.log(error)
              this.messageService.add(
                {key: 'scheduleTest', severity:'error', summary:'Failed', 
                detail:error['msg']});
            })
  }

  getTestIdList(){
    if(this.recordMarks.grade && this.recordMarks.subject 
          && this.recordMarks.testDate && this.recordMarks.testDate){
      let obj={...this.obj, ...this.recordMarks}
      obj['subject']=obj['subject']['value']
      obj['grade']=obj['grade']['value']
      console.log(obj)

      this.http.post(this.module_endpoint.facultyOptions.getTestIds, obj).pipe(
        map(data => {
          data['details'].forEach(element => {
            let date=new Date(element.testDateTime)
            console.log(typeof date)
            element.label=`Test Id: ${element.testId} ----- ( Slot: ${date.toLocaleTimeString()} )`
            element.value=element.testId
          })
        return data
        })
            ).subscribe(data => {
              console.log(data)
                this.testSearchedObj=data
                console.log(this.testSearchedObj)
            })
    }
    
  }

  searchStudents(testId: string){
    console.log(testId)
    this.http.post(this.module_endpoint.facultyOptions.getTestDetailsWithId, {testId: testId}).pipe(
      map(data => {
        let arrObj ={fullMarks: '',obtainedMarks: [], testId: '', objId: ''}
        if(data['details']){
        console.log(data)
        arrObj.fullMarks=data['details']['fullMarks']
        arrObj.testId=data['details']['testId']
        arrObj.objId=data['details']['_id']
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
          console.log(data)
          this.enrolledStudentList=data
          })
  }

  updateStudentMarks(){
    console.log(this.enrolledStudentList)
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
