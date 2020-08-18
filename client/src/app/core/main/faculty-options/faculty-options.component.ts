import { Component, OnInit } from '@angular/core';
import { ReferenceForm, MaterialUploadForm, ScheduleTestForm, RecordMarksForm } from './faculty-options'
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { environment } from '../../../../environments/environment'
import {MessageService, ConfirmationService} from 'primeng/api';
import { StructuralService } from '../../services/structural.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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

  allGradesSubjects: any
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
  alltests
  allMaterial

  constructor(
    private route: ActivatedRoute,
    private auth:AuthService,
    private http: HttpClient,
    private struct: StructuralService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string) => {
      this.scrollTo(fragment)
    })
    this.getAllGradeSubs()
    this.getAllScheduledTest()
    this.getAllMaterial()
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
      let obj={...form.form.value}
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
    let obj={ ...form.form.value}
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
          console.log(this.allMaterial)
        })
  }

  deleteMaterial(material) {
    console.log(material)
    this.confirmationService.confirm({
      key: 'deleteTestConfirm',
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
      console.log(form.form.value)
      let obj={ ...form.form.value}
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
          this.alltests=data
          console.log(this.alltests)
        })
  }

  deleteTest(event){
    this.confirmationService.confirm({
      key: 'deleteTestConfirm',
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
          //Actual logic to perform a confirmation
     
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
            detail:error['msg']});
        })
      }
    });
  }

  getTestIdList(){
    if(this.recordMarks.grade && this.recordMarks.subject 
          && this.recordMarks.testDate && this.recordMarks.testDate){
      let obj={ ...this.recordMarks}
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
          }, error =>{
            console.log(error)
            this.messageService.add(
              {key: 'recordMarks', severity:'error', summary:'Failed', life:30000,
              detail:error['error']['msg']});
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
