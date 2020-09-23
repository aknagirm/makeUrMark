import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { StructuralService } from 'src/app/core/services/structural.service';
import { GradeBoardSubDetails, TestTutionFeesDetails } from '../models/grade-subject-fees-options';

@Component({
  selector: 'app-tab-view',
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.css']
})
export class TabViewComponent implements OnInit, OnChanges {

  feesSelected=[]
  subjectTypeSelected=[]
  subTutionFees: any[]
  @Input() tutionFeesList: TestTutionFeesDetails[]
  @Input() boardSubject: any
  @Output() selectedItems =new EventEmitter()
  
  constructor(
    private struct: StructuralService,
  ) { }

  ngOnChanges(){
    
    
    if(this.subjectTypeSelected.length>0){
      this.subjectTypeSelected=[]
      this.addToCart()
    }
    if(this.tutionFeesList){
      
      let uniqueSubList=[]
      this.tutionFeesList.forEach(fees=> {
        let sub=uniqueSubList.find(sub=>sub.subject == fees.subject)
        !sub?uniqueSubList.push({subject: fees.subject}): ''
      })
      this.subTutionFees=[]
      uniqueSubList.forEach(sub=> {
        let fees=this.tutionFeesList.filter(fees=>fees.subject ==sub.subject)
        if(fees){
          let obj={ subject:sub.subject, batch:[]}
          obj.batch=[...fees]
          this.subTutionFees.push(obj)
        }
      })
        this.subTutionFees.forEach(sub => {
          let generalFees=sub.batch.find(type=>type.batchType=='GENERAL')
          sub.feesSelected=generalFees
        })
    }
  }

  ngOnInit() {
  }

  feesChange(event,subject){
    this.subjectTypeSelected.forEach(sub => {
        if(sub.value == subject.value){
          this.selectedItems.emit(this.subjectTypeSelected)
        }
    })
  }

  addToCart(){
    this.selectedItems.emit(this.subjectTypeSelected)
  }

}
