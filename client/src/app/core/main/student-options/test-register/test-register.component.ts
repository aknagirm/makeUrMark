import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CountdownTimerService } from 'src/app/core/services/countdown-timer.service';
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
  userData: any= {}
  testList: any=[]
  liveTests: any=[]
  display: boolean = false
  displayCart: boolean= false
  displayQPaper: boolean= false
  selectedTest: any={grade:'', subject:''}
  paymentMode: string='regular'
  testFees
  testFeesCartList: any[]=[]
  feesTotal=0
  feesTotalWalletAdjust=0
  zoomSize=1.0
  qPaperSRC=null
  testTimer: string
  testTimer$
  cartColumns=[{label:'Test Id',value:'testId'},{label:'Subject',value:'subject'},{label:'Fees',value:'testFees'}]
  module_endpoint= environment.server_endpoint
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    
    visibleRange: {
      start: '2021-03-22',
      end: '2021-03-25'
    },
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
    private auth: AuthService,
    private http: HttpClient,
    private struct: StructuralService,
    private payment:PaymentService,
    private counter: CountdownTimerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.struct.getDetails({docType: 'Grade'})
    this.struct.getDetails({docType: 'Subject'})
    this.struct.getDetails({docType: 'Test Fees'})
    this.struct.allTestFees.subscribe((testFeesList:TestTutionFeesDetails[]) => {
      this.allTestFees=testFeesList
    })
    this.getCurrUser()
    this.getGradeSubject()
  }

  getCurrUser(){
    this.auth.loggedInUserObj
        .subscribe(data => {
          if(data instanceof HttpErrorResponse || data == null || data == undefined) {
            this.userData.walletPoint=null
          } else {
            this.userData.walletPoint=data['walletPoint']
          }
        })
        this.auth.getCurrentUser()
  }

  getGradeSubject(){
    this.struct.allGrades.subscribe((gradeList: GradeBoardSubDetails[])=> {
      this.allGrades=gradeList
    })
    this.struct.allSubjects.subscribe((subjectList: GradeBoardSubDetails[])=> {
      this.allSubjects=subjectList
    })
  }

  getCurrLiveTest(gradeObj: any){
    this.http.post(this.module_endpoint.studentOptions.getAllTestForStudent,gradeObj)
        .subscribe(data=>{
          let currDateTime=new Date()
          this.liveTests=data['testList'].filter(test=>currDateTime>=new Date(test.testDateTime) 
            && currDateTime<=new Date((new Date(test.testDateTime)).getTime()+test.duration*60000)
          )
        })
  }

  dropdownSelected(){
    let grade=this.selectedGradeSub.grade
    let subject=this.selectedGradeSub.subject
    
    let testList$:Observable<any>
    this.testList=[]
    this.testFeesCartList=[]
    
    let obj={'grade':grade}
    console.log(obj,this.allTestFees)
    this.allTestFees?this.selectedTestFees=this.allTestFees.find(testFees=>testFees.grade==grade):''
    testList$=this.http.post(this.module_endpoint.studentOptions.getTestForGradeSub, obj)
    this.getCurrLiveTest(obj)

    testList$.subscribe(data=>{
      console.log(data)
      let list=data['upcomingTest']
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
    console.log(this.selectedTest)
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
    console.log(this.testFeesCartList)
    this.displayCart = true;
    let discountedPrice=this.feesTotal
    if(discountedPrice>this.userData.walletPoint){
      this.userData.walletDeduction=this.userData.walletPoint
      discountedPrice=discountedPrice-this.userData.walletDeduction
    } else {
      this.userData.walletDeduction=discountedPrice
      discountedPrice=0
    }
    this.feesTotalWalletAdjust=discountedPrice
  }

  async securePay(){
    this.displayCart=false
    //this.displayCart=false
    this.confirmationService.confirm({
      key: 'testResisterConfirm',
      message: 'Are you sure to proceed?',
      accept: async () => {
        if(this.feesTotalWalletAdjust>0){
          this.payment.paymentDet={amount: this.feesTotalWalletAdjust*100}
          let obj=await this.payment.payForTest(this.testFeesCartList)
          this.payment.response.subscribe(data => {
            if(data){
              console.log(data)
              let testRegisterObj={testList: this.testFeesCartList, deduction:this.userData.walletDeduction}
              this.http.post(this.module_endpoint.studentOptions.registerForTest,testRegisterObj)
                  .subscribe(data => {
                    this.displayCart=false
                    this.dropdownSelected()
                    this.auth.getCurrentUser()
                  })
            }
          })
        } else {
          let paymentObj={
            orderId: null,
            paymentId: null,
            paymentReason: 'Test purchase',
            testList: [...this.testFeesCartList],
            paymentTo: 'Institute',
            paymentIndicator: 'C',
            amount: this.userData.walletDeduction
          }
          console.log("hi")
          this.payment.paymentCapture(paymentObj)
          let testRegisterObj={testList: this.testFeesCartList, deduction:this.userData.walletDeduction}
          this.http.post(this.module_endpoint.studentOptions.registerForTest,testRegisterObj)
                  .subscribe(data => {
                    this.messageService.add(
                      {
                        key: 'testResisterSuccess', severity: 'success', summary: 'Successful', life: 1500,
                        detail: 'Purchase successful'
                      });
                    this.displayCart=false
                    this.dropdownSelected()
                    this.auth.getCurrentUser()
                },error=>{
                  this.messageService.add(
                    {
                      key: 'testResisterSuccess', severity: 'error', summary: 'Failed', life: 1500,
                      detail: error['error']['msg']
                    });
                })
        }
      }
    })
  }

  openQPaper(test){
    this.displayQPaper=true
    let duration=+test.duration
    let grade=this.selectedGradeSub.grade
    //this.fileName=material.fileName
    this.qPaperSRC =(this.module_endpoint.baseUrl + "/" + test.selectedQPaper + "#toolbar=0").replace(/\\/g,"/")
    let currDate=new Date()
    let sTime=new Date(test.testDateTime)
    var diff = Math.abs(currDate.getTime() - sTime.getTime());
    let timeRem=duration*60*1000-diff
    console.log(timeRem,duration*60*1000,diff)
    var seconds = Math.ceil((timeRem / 1000))
    let hr=seconds/3600>9?Math.floor(seconds/3600):`0${Math.floor(seconds/3600)}`
    let mi=(seconds%3600)/60>9?Math.floor((seconds%3600)/60):`0${Math.floor((seconds%3600)/60)}`
    let ss=(seconds%3600)%60>9?Math.floor((seconds%3600)%60):`0${Math.floor((seconds%3600)%60)}`
   // let dayDiff = Math.ceil(diff / (1000 * 3600 * 24)); 
   
   let timeStr=`${hr}:${mi}:${ss}`
   console.log(timeStr)
   
    this.testTimer$=this.counter.startTimer(timeStr).subscribe(data => {
     console.log(data)
      this.testTimer=data
      if(data=='00:00:00'){
        this.displayQPaper=false
        this.getCurrLiveTest({'grade':grade.label})
      }
    })
  }

  zoomInOut(indicator:string){
    indicator=='inc'?
    this.zoomSize=this.zoomSize<2?parseFloat((this.zoomSize+0.1).toFixed(1)):this.zoomSize:
      indicator=='dec'?
      this.zoomSize=this.zoomSize>0?parseFloat((this.zoomSize-0.1).toFixed(1)):this.zoomSize:''
  }
}
