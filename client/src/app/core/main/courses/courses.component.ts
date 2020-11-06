import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable, interval, concat, merge, Subscription, combineLatest } from 'rxjs';
import { environment } from '../../../../environments/environment'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { concatMap, filter, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { GradeBoardSubDetails, TestTutionFeesDetails } from 'src/app/reusable/models/grade-subject-fees-options';
import { StructuralService } from '../../services/structural.service';
import { viewClassName } from '@angular/compiler';
import { PaymentService } from '../../services/payment.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  module_endpoint = environment.server_endpoint
  itemSelected: any=[]
  totalAllCost=0
  selectedBoardSubject: any
  selectedBoard: any
  userData: any= {}
  subjectList: GradeBoardSubDetails[]
  tutionFeesList: TestTutionFeesDetails[]
  totalMonths: number=1
  totalSelectedCostBasic=0
  totalDiscountedCost=0.0
  subDiscount:number=0.0
  monDiscount:number=0.0
  totalSelectedCost=0
  property: string
  allSubjectDiscount: TestTutionFeesDetails[]
  allMonthDiscount: TestTutionFeesDetails[]
  display: boolean=false
  paymentMode: string='regular'

  @ViewChild('grandTotal',{static:true}) grandTotal

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private struct: StructuralService,
    private payment:PaymentService,
    private messageService: MessageService,
  ) {
     
  }

  ngOnInit() {
    this.struct.getDetails({docType: 'Board'})
    this.struct.getDetails({docType: 'Grade'})
    this.struct.getDetails({docType: 'Subject'})
    this.struct.getDetails({docType: 'Tution Fees'})
    this.struct.getDetails({docType: 'Subject Discount'})
    this.struct.getDetails({docType: 'Month Discount'})

    this.struct.allSubjects.subscribe((subjetList:GradeBoardSubDetails[]) => {
      this.subjectList=subjetList
    })
    this.struct.allSubjectDiscount.subscribe((allSubDiscountList:TestTutionFeesDetails[])=> {
      this.allSubjectDiscount=allSubDiscountList
    })
    this.struct.allMonthDiscount.subscribe((allMonthDiscountList:TestTutionFeesDetails[])=> {
      this.allMonthDiscount=allMonthDiscountList
    })
    this.getCurrUser()
    this.getGradeSubjectBatchType()
  }

  getGradeSubjectBatchType(){
    const param$: Observable<any>=this.route.queryParams
    const grade$: Observable<GradeBoardSubDetails[]>=this.struct.allGrades
    const board$: Observable<GradeBoardSubDetails[]>=this.struct.allBoards
    const tutionFees$: Observable<TestTutionFeesDetails[]>=this.struct.allTutionFees
    combineLatest(board$,grade$,param$,tutionFees$).pipe(
      map(([boards,grades,params,tutionFees]) => {
        const selectedBoard= boards.find(board=>board.value == params.board)
        const selectedGrade= grades.find(grade=>grade.value == params.grade)
        const selectedTutionFees= tutionFees.filter(fees=>fees.grade==selectedGrade.label)
        return({board:selectedBoard,grade:selectedGrade,feeList:selectedTutionFees})
      })
    ).subscribe(data=> {
      this.selectedBoard=data.board
      this.selectedBoardSubject=data.grade
      this.tutionFeesList=data.feeList
    })
  }

  getCurrUser(){
    this.auth.loggedInUserObj
        .subscribe(data => {
          if(data instanceof HttpErrorResponse || data == null || data == undefined) {
            this.userData.referalChk=false
          } else {
            if(data['othersReferCode'].substring(0, 4)=="done"){
              this.userData.referalChk=false
              this.userData.walletPoint=data['walletPoint']
            }
            else {
              this.userData.referalChk=true
              this.userData.walletPoint=data['walletPoint']
            }
          }
        })
        this.auth.getCurrentUser()
  }


  displaySelected(itemList){
    this.totalSelectedCostBasic=0
    this.itemSelected=itemList
    this.totalSelectedCostBasic=this.totalCostCalculate(itemList, this.totalMonths)
    this.subCountDiscount()
    this.monCountDiscount(this.totalMonths)
  }

  totalCostCalculate(itemList, months): number{
    var total=0.0
    itemList.forEach(item => {
      var cost =+item.feesSelected.tutionFees
      total =total + cost
    })
    return total*months
  }

  subCountDiscount(){
    this.allSubjectDiscount.sort((a,b) => {return parseFloat(a.countForDiscount)-parseFloat(b.countForDiscount)})
    let subCount=this.itemSelected.length
      for(let i=0;i<this.allSubjectDiscount.length;i++){
        let lowerLimit=parseFloat(this.allSubjectDiscount[i].countForDiscount)
        let upperLimit
        i<this.allSubjectDiscount.length-1?upperLimit=parseFloat(this.allSubjectDiscount[i+1].countForDiscount)
                :lowerLimit
          if(subCount<lowerLimit){
            this.subDiscount=0
            break
          }
          else if(subCount>=lowerLimit && subCount<upperLimit){
            this.subDiscount=parseFloat(this.allSubjectDiscount[i].discount)
            break
          } else {
          this.subDiscount=parseFloat(this.allSubjectDiscount[i].discount)
        }
      }
    
      this.applyDiscount()}

  monCountDiscount(event){
    this.totalMonths=event
    this.totalSelectedCostBasic=this.totalCostCalculate(this.itemSelected, this.totalMonths)
    this.allMonthDiscount.sort((a,b) => {return parseFloat(a.countForDiscount)-parseFloat(b.countForDiscount)})
      for(let i=0;i<this.allMonthDiscount.length;i++){
        let lowerLimit=parseFloat(this.allMonthDiscount[i].countForDiscount)
        let upperLimit
        i<this.allMonthDiscount.length-1?upperLimit=parseFloat(this.allMonthDiscount[i+1].countForDiscount)
                :lowerLimit
          if(event<lowerLimit){
            this.monDiscount=0
            break
          }
          else if(event>=lowerLimit && event<upperLimit){
            this.monDiscount=parseFloat(this.allMonthDiscount[i].discount)
            break
          } else {
          this.monDiscount=parseFloat(this.allMonthDiscount[i].discount)
        }
       
    }
    this.applyDiscount()
  }

  applyDiscount(){
    this.totalSelectedCostBasic=this.totalCostCalculate(this.itemSelected, this.totalMonths)
    let dummyCost=this.totalSelectedCostBasic
    let discountedPrice=dummyCost-(dummyCost*this.monDiscount/100)-(dummyCost*this.subDiscount/100)
    if(discountedPrice>this.userData.walletPoint){
      this.userData.walletDeduction=this.userData.walletPoint
      discountedPrice=discountedPrice-this.userData.walletDeduction
      this.paymentMode='regular'
    } else {
      this.userData.walletDeduction=discountedPrice
      discountedPrice=0
      this.paymentMode='wallet'
    }
    this.totalDiscountedCost=discountedPrice
    
  }

  /* async securePay(){
    console.log("Hi")
    this.payment.paymentDet={amount: this.totalDiscountedCost*100}
    let obj=await this.payment.pay()
    this.payment.response.pipe(
      take(1)
    ).subscribe(data => {
     if(data){
       console.log(data,this.itemSelected)
        let arr=[]
        for(let sub of this.itemSelected){
          let courseObj={board:this.selectedBoard.label,grade:sub.feesSelected.grade,
             subject:sub.feesSelected.subject, duration: this.totalMonths*30,
             batchType:sub.feesSelected.batchType}
          arr.push(courseObj)
        }
        this.http.post(this.module_endpoint.studentOptions.addCourses, {courseList: arr})
            .subscribe(data=> {
              console.log("push called")
              this.display=false
              this.router.navigate(['explore/student/viewRoster'])
            }, error=> {
              this.display=false
              console.log(error)
              this.router.navigate(['explore/student/viewRoster'])
              this.messageService.add(
                {key: 'purchaseCourse', severity:'error', summary:'Failed', life:30000,
                detail:error['error']['msg']});
            })
      }
    })
  }
 */

async securePay(){
  let arr=[]
  for(let sub of this.itemSelected){
      let courseObj={board:this.selectedBoard.label,grade:sub.feesSelected.grade,
          subject:sub.feesSelected.subject, duration: this.totalMonths*30,
          batchType:sub.feesSelected.batchType}
      arr.push(courseObj)
    }
  this.payment.paymentDet={amount: this.totalDiscountedCost*100}
  let res=await this.payment.purchaseCourse(arr,this.totalMonths,this.userData.walletDeduction)
  console.log(res)
  this.payment.response.subscribe(data => {
    if(this.userData.referalChk){
      let obj={currDuration:this.totalMonths*30*this.itemSelected.length}
      this.http.post(this.module_endpoint.refer.referalCodeCheck,obj)
      .subscribe(console.log)
    }
    this.display=false
    this.router.navigate(['explore/student/viewRoster'])
    }, error=> {
      this.display=false
      console.log(error)
      this.router.navigate(['explore/student/viewRoster'])
      this.messageService.add(
        {key: 'purchaseCourse', severity:'error', summary:'Failed', life:30000,
        detail:error['error']['msg']});
  })
}

  walletPay(){
    console.log(this.itemSelected,this.totalMonths)
    let paymentObj={
      orderId: null,
      paymentId: null,
      paymentReason: 'Course purchase',
      subjectList: this.itemSelected.map(course=>course.feesSelected),
      totalDays: this.totalMonths*30,
      paymentTo: 'Institute',
      paymentIndicator: 'C',
      amount: this.userData.walletDeduction
    }
    let arr=[]
    for(let sub of this.itemSelected){
        let courseObj={board:this.selectedBoard.label,grade:sub.feesSelected.grade,
            subject:sub.feesSelected.subject, duration: this.totalMonths*30,
            batchType:sub.feesSelected.batchType}
        arr.push(courseObj)
      }
      if(this.userData.referalChk){
        let obj={currDuration:this.totalMonths*30*this.itemSelected.length}
        this.http.post(this.module_endpoint.refer.referalCodeCheck,obj)
        .subscribe(console.log)
      }
     this.payment.purchaseCourseSuccess(arr,this.userData.walletDeduction)
     this.payment.paymentCapture(paymentObj)
    this.display=false
    this.auth.getCurrentUser()
    this.router.navigate(['explore/student/viewRoster'])
  }


  displayCartItem(){
    this.display=true
  }
}
