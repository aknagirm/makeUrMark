import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable, interval, concat, merge, Subscription, combineLatest } from 'rxjs';
import { environment } from '../../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { concatMap, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { GradeBoardSubDetails, TestTutionFeesDetails } from 'src/app/reusable/models/grade-subject-fees-options';
import { StructuralService } from '../../services/structural.service';
import { viewClassName } from '@angular/compiler';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  module_endpoint = environment.server_endpoint.subjectDet
  itemSelected=[]
  totalAllCost=0
  selectedBoardSubject: any
  subjectList: GradeBoardSubDetails[]
  tutionFeesList: TestTutionFeesDetails[]
  totalMonths: number=1
  totalSelectedCostBasic=0
  totalDiscountedCost=0.0
  subDiscount:number=0.0
  monDiscount:number=0.0
  totalSelectedCost=0
  allSubjectDiscount: TestTutionFeesDetails[]
  allMonthDiscount: TestTutionFeesDetails[]
  display: boolean=false

  @ViewChild('grandTotal',{static:true}) grandTotal

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private struct: StructuralService,
    private payment:PaymentService
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

    this.getGradeSubjectBatchType()
  }


  getGradeSubjectBatchType(){
    const param$: Observable<any>=this.route.queryParams
    const grade$: Observable<GradeBoardSubDetails[]>=this.struct.allGrades
    const tutionFees$: Observable<TestTutionFeesDetails[]>=this.struct.allTutionFees
    combineLatest(grade$,param$,tutionFees$).pipe(
      map(([grades,params,tutionFees]) => {
        const selectedGrade= grades.find(grade=>grade.value == params.grade)
        const selectedTutionFees= tutionFees.filter(fees=>fees.grade==selectedGrade.label)
        return({grade:selectedGrade,feeList:selectedTutionFees})
      })
    ).subscribe(data=> {
      console.log(data.feeList)
      this.selectedBoardSubject=data.grade
      this.tutionFeesList=data.feeList
    })
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
    this.totalDiscountedCost=discountedPrice
  }

  async securePay(){
    this.payment.paymentDet={amount: this.totalDiscountedCost*100}
    /*let obj=await this.payment.pay()
     this.payment.response.subscribe(data => {
      if(data){

      }
    }) */
  }

  displayCartItem(){
    this.display=true
  }
}
