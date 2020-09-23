import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PaymentService } from 'src/app/core/services/payment.service';
import { StructuralService } from 'src/app/core/services/structural.service';
import { GradeBoardSubDetails, TestTutionFeesDetails } from 'src/app/reusable/models/grade-subject-fees-options';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-register',
  templateUrl: './test-register.component.html',
  styleUrls: ['./test-register.component.css'],
  providers: [ConfirmationService]
})
export class TestRegisterComponent implements OnInit {

  allGrades: GradeBoardSubDetails[]
  allSubjects: GradeBoardSubDetails[]
  allTestFees: TestTutionFeesDetails[]
  selectedGradeSub: any={grade:'', subject:''}
  selectedTestFees: TestTutionFeesDetails
  testList: any=[]
  display: boolean = false
  displayCart: boolean= false
  selectedTest={}
  testFees
  testFeesCartList: any[]=[]
  feesTotal=0
  cartColumns=[{label:'Test Id',value:'testId'},{label:'Subject',value:'subject'},{label:'Fees',value:'testFees'}]
  module_endpoint= environment.server_endpoint
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev', //'prev today',
      center: 'title',
      right: 'next'//'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    //eventClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      //{ title: 'event 1', start: '2020-09-03T12:30:00', end: '2020-08-04T06:30:00',color:'red', className:'dummy' },
      //{ title: 'event 2', start: '2020-09-03T06:00:00' }
      //...this.testList
    ]
  };
  
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private http: HttpClient,
    private struct: StructuralService,
    private payment:PaymentService
  ) { }

  ngOnInit() {
    this.struct.getDetails({docType: 'Grade'})
    this.struct.getDetails({docType: 'Subject'})
    this.struct.getDetails({docType: 'Test Fees'})
    this.struct.allTestFees.subscribe((testFeesList:TestTutionFeesDetails[]) => {
      this.allTestFees=testFeesList
    })
    this.getGradeSubject()
  }

  getGradeSubject(){
    this.struct.allGrades.subscribe((gradeList: GradeBoardSubDetails[])=> {
      this.allGrades=gradeList
    })
    this.struct.allSubjects.subscribe((subjectList: GradeBoardSubDetails[])=> {
      this.allSubjects=subjectList
    })
  }

  dropdownSelected(){
    let grade=this.selectedGradeSub.grade
    let subject=this.selectedGradeSub.subject
    
    let testList$:Observable<any>
    this.testList=[]
    this.testFeesCartList=[]
    if(grade && !subject){
      let obj={'grade':grade.label}
      this.allTestFees?this.selectedTestFees=this.allTestFees.find(testFees=>testFees.grade=grade.label):''
      testList$=this.http.post(this.module_endpoint.studentOptions.getTestForGradeSub, obj)
    }
    if(grade && subject){
      let obj={'grade':grade.label,'subject':subject.label}
      this.allTestFees?this.selectedTestFees=this.allTestFees.find(testFees=>testFees.grade=grade.label):''
      testList$=this.http.post(this.module_endpoint.studentOptions.getTestForGradeSub, obj)
    }
    testList$.subscribe(data=>{
      let list=data['testList']
      list.forEach((test,index) => {
        let obj={...test}
        obj['title']=`${index+1}:${test.subject}`
        let dt1:Date=new Date(test.testDateTime)
        obj['start']=dt1
        let dt2=new Date(dt1.getTime()+test.duration*60000)
        obj['end']=dt2
        obj['status']=='enrolled'?obj['color']='yellow':obj['color']=''
        this.testList.push(obj)
      })
    })
  }

  displayTestDetails(event){
    this.display = true;
    let index=event.title.substring(0,1)
    this.selectedTest=this.testList[index-1]
  }

  addToCart(selectedTest){
    this.feesTotal=0
    let arr=[]
    arr=[...this.testList]
    arr.find(test=>{
      if(test.testId==selectedTest.testId){
        test.status='cart'
        test.color='springgreen'
      } 
    })
    this.testList=[...arr]
    selectedTest.testFees=this.selectedTestFees.testFees
    this.testFeesCartList.push(selectedTest)
    this.testFeesCartList.forEach(test=> {
      let fees=+test.testFees
      this.feesTotal=this.feesTotal+fees
    })
    this.display=false
  }

  removeFromCart(selectedTest){
    let arr=[]
    arr=[...this.testList]
    arr.find(test=>{
      if(test.testId==selectedTest.testId){
        test.status='none'
        test.color=''
      } 
    })
    this.testList=[...arr]
    const index=this.testFeesCartList.findIndex(test=> test.testId==selectedTest.testId)
    this.testFeesCartList.splice(index,1)
    this.display=false
  }

  displayCartItem(){
    this.displayCart = true;
  }

  async securePay(){
    //this.displayCart=false
    this.payment.paymentDet={amount: this.feesTotal*100}
    let obj=await this.payment.pay()
     this.payment.response.subscribe(data => {
      if(data){
        console.log(data)
        this.http.post(this.module_endpoint.studentOptions.registerForTest,this.testFeesCartList)
            .subscribe(data => {
              this.dropdownSelected()
            })
      }
    }) 
  }
}
