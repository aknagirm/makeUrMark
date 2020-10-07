import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SortEvent } from 'primeng/api';
import { map } from 'rxjs/operators';
import { ExternalFilesService } from 'src/app/core/services/external-files.service';
import { StructuralService } from 'src/app/core/services/structural.service';
import { GradeBoardSubDetails } from 'src/app/reusable/models/grade-subject-fees-options';
import { environment } from 'src/environments/environment';
import { StudentTestResultTable } from '../../../../reusable/models/student-test-result';

@Component({
  selector: 'app-student-test-result',
  templateUrl: './student-test-result.component.html',
  styleUrls: ['./student-test-result.component.css']
})
export class StudentTestResultComponent implements OnInit {
  
  allGrades: GradeBoardSubDetails[]
  selectedGradeSub: any={grade:'', subject:''}
  allOwnMarks: any[]=[]
  testResultStructure= StudentTestResultTable
  selectedTest: any
  displayTestDet: boolean=false
  module_endpoint= environment.server_endpoint
  allOwnLatestMarks: any={
    labels:[],
    datasets:[
      {
          label:'Obtained Marks',
          backgroundColor:'#063247'/* '#a52a2a' */,
          borderColor: '#1E88E5',
          data:[],
          testObjId:[]
      },{
        label:'Highest Marks',
        backgroundColor: '#9acac5'/* '#9CCC65' */,
        borderColor: '#7CB342',
        data:[],
        testObjId:[]
      }
    ]
  }

  lastFiveMarks: any={
    labels:['Test 5','Test 4','Test 3','Test 2','Test 1'],
    datasets:[
     /*  {
          label:'Obtained Marks',
          backgroundColor: '#063247'
          borderColor: '#1E88E5',
          data:[]
      },{
        label:'Highest Marks',
        backgroundColor: '#9acac5',
        borderColor: '#7CB342',
        data:[]
      } */
    ]
  }

  latestMarkschartOptions = {
    title: {
      display: true,
      text: 'COMPARISON(%) FOR ALL SUBJECTS OF LAST TEST',
      fontSize: 18
  },
  legend: {
    position: 'bottom'
  },
    scales: {
      yAxes: [{
        ticks: {
          stepSize: 10,
          beginAtZero: true
        }
      }]
    }
  }

  lastFiveMarkschartOptions = {
    title: {
      display: true,
      text: 'COMPARISON(%) FOR LAST FIVE TESTS',
      fontSize: 18
  },
  legend: {
    position: 'bottom'
  }
  }
  
  constructor(
    private router: Router,
    private struct: StructuralService,
    private http: HttpClient,
    private messageService: MessageService,
    private externalFiles: ExternalFilesService
  ) { }

  ngOnInit() {
    this.struct.getDetails({docType: 'Grade'})
    this.getGradeSubject()
  }

  getGradeSubject(){
    this.struct.allGrades.subscribe((gradeList: GradeBoardSubDetails[])=> {
      this.allGrades=gradeList
    })
  }

  dropdownSelected(){
    let grade=this.selectedGradeSub.grade
    this.http.post(this.module_endpoint.studentOptions.getAllTestForStudent,{'grade':grade})
        .subscribe(data=>{
          if(data['testList'].length==0){
            this.messageService.add(
              {key: 'nodataToast', severity:'error', summary:'No Data', life: 5000,
              detail:'No Result found for this grade'});
          }
          this.allOwnMarks=[...data['testList']]
          this.latestMarksCheck(data['testList'])
          this.lastFiveMarksCheck(data['testList'])
      })
  }

  latestMarksCheck(testList: any[]){
    this.allOwnLatestMarks.datasets[1].data=[]
    this.allOwnLatestMarks.datasets[0].data=[]
    this.allOwnLatestMarks.datasets[0].testObjId=[]
    this.allOwnLatestMarks.labels=[]
    this.allOwnLatestMarks
    let arr=[...testList]
    let uniqueObject = {}
    arr.forEach((item1)=>{
      let sub=item1.subject
      if(uniqueObject.hasOwnProperty(sub)){
        uniqueObject[sub]=uniqueObject[sub].testDateTime<item1.testDateTime?item1:uniqueObject[sub]
      } else {
        uniqueObject[sub]=item1
      }
    })
    for(let item in uniqueObject){
      this.allOwnLatestMarks.labels.push(item)
      this.allOwnLatestMarks.datasets[0].testObjId.push(uniqueObject[item]._id)
      this.allOwnLatestMarks.datasets[0].data.push(uniqueObject[item].obtainedMarksPercentage)
      this.allOwnLatestMarks.datasets[1].data.push(uniqueObject[item].highestMarksPercentage)
    }
    console.log(this.allOwnLatestMarks)
  }

  lastFiveMarksCheck(testList: any[]){
    this.lastFiveMarks.datasets=[]
    testList.sort((a,b)=>{
      if(a.testDateTime>b.testDateTime) return 1
      else  return -1
    })
    console.log(testList)
    let arr=[...testList]
    let uniqueObject = {}
    arr.forEach((item1)=>{
      let sub=item1.subject
      if(uniqueObject.hasOwnProperty(sub)){
        uniqueObject[sub].push(item1)
      } else {
        uniqueObject[sub]=[]
        uniqueObject[sub].push(item1)
      }
    })
    console.log(uniqueObject)
    for(let item in uniqueObject){
      let dataSetObj={}
      dataSetObj['label']=item
      dataSetObj['data']=[]
      dataSetObj['testObjId']=[]
      uniqueObject[item].forEach(eachMark=>{
        var color = Math.floor(0x1000000 * Math.random()).toString(16);
        dataSetObj['data'].push(eachMark.obtainedMarksPercentage)
        dataSetObj['testObjId'].push(eachMark._id)
        dataSetObj['borderColor']=`#${('000000' + color).slice(-6)}`
        dataSetObj['fill']= false
      })
      this.lastFiveMarks.datasets.push(dataSetObj)
    }
    let arr1=[]
    this.lastFiveMarks.datasets.forEach((eachData,idx)=>{
      if(eachData.data.length>1){
        if(eachData.data.length>5){
          eachData.data.splice(0,eachData.data.length-5)
          eachData.testObjId.splice(0,eachData.testObjId.length-5)
        }
        arr1.push(this.lastFiveMarks.datasets[idx])
      } 
    })
    this.lastFiveMarks.datasets=[...arr1]
    console.log(this.lastFiveMarks)
  }

  customSort(event: SortEvent){
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
          result = -1;
      else if (value1 != null && value2 == null)
          result = 1;
      else if (value1 == null && value2 == null)
          result = 0;
      else if (event.field === 'testDateTime')
          result = value1.localeCompare(value2);
      else if (event.field === 'duration' || event.field === 'fullMarks' 
            || event.field === 'obtainedMarks' || event.field === 'highestMarks')
        {
            value1=+value1
            value2=+value2
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
        }  
      else
          result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
  });
  }

  resultClicked(event,graphType:string) {
    this.displayTestDet=true
    let clickedObj={dataSetIdx:event.element._datasetIndex,dataIdx:event.element._index}
    let testObjId=null
    if(graphType=="lastFive"){
      testObjId=this.lastFiveMarks.datasets[clickedObj.dataSetIdx].testObjId[clickedObj.dataIdx]
    }
    if(graphType=="allLatest" && clickedObj.dataSetIdx==0){
      testObjId=this.allOwnLatestMarks.datasets[0].testObjId[clickedObj.dataIdx]
    }
    
    this.selectedTest=this.allOwnMarks.find(data=>data._id==testObjId)
    console.log(this.selectedTest)
  }

  facultyClicked(facultyUserName: string){
      this.externalFiles.facultyPassed={'facultyUserName':facultyUserName}
      this.router.navigate(['/facultyView'])
  }

}
