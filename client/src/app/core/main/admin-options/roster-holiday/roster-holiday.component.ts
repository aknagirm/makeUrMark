import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { StructuralService } from 'src/app/core/services/structural.service';
import { FormViewOptions, TestTutionFeesDetails, headerList, GradeBoardSubDetails, NewBatchDetails } from 'src/app/reusable/models/grade-subject-fees-options';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-roster-holiday',
  templateUrl: './roster-holiday.component.html',
  styleUrls: ['../admin-options.component.css'],
  providers: [ConfirmationService]
})
export class RosterHolidayComponent implements OnInit {
  
  @Input() allBoards: GradeBoardSubDetails[] =[]
  @Input() allGrades: GradeBoardSubDetails[] =[]
  @Input() allSubjects: GradeBoardSubDetails[] =[]
  @Input() allBatchType: GradeBoardSubDetails[] =[]
  allScheduledBatches: NewBatchDetails[]=[]

  holidayCalDisplay:boolean= false
  batchDayShow:boolean= false
  batchFilterShow: boolean=false
  batchStudentShow: boolean=false
  studentWaitingTable: boolean=false
  allStudentWaitingTable: boolean=false


  holidayInput: string=''
  selectedBatchForMap: any
  selectedDate: any
  newBatch: NewBatchDetails={day:'',grade:'',subject:'',batchType:'',startTime:'',endTime:'',userList:[]}
  scheduledBatchFilter={gradeList:'',subjectList:'',batchTypeList:'',startTime:'',endTime:''}
  studentWaitingList=[]
  studentInBatchList: NewBatchDetails
  selectedStudentForBatch=[]
  selectedStudentForRemove=[]
  holidayList=[]
  batchListDummy=[]
  batchList=[]

  viewOptionsFormat=FormViewOptions
  allColumns=headerList
  module_endpoint=environment.server_endpoint

  batchCalendarOptions: CalendarOptions= {
    initialView: 'timeGridWeek',
    customButtons: {
      myCustomButton: {
        text: 'Filter',
        click: this.openScheduledBatchFilter.bind(this)
      }
    },
    allDaySlot: false,
    headerToolbar: {
      left: 'myCustomButton',
      center: '',
      right: 'timeGridWeek,listWeek'
    },
    slotMinTime: "06:00:00",
    slotMaxTime: "22:00:00",
    dayHeaderFormat: { weekday: 'short' },
    listDaySideFormat: false,
    events: []
  }
  holidayCalendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next'
    },
    events: [],
    eventColor: '#378006',
    dateClick: this.displayDate.bind(this)
  };
  
  constructor(
    private http: HttpClient,
    private struct: StructuralService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getHolidayList()
    this.getAllWaitingStudent()
    this.getAllScheduledBatch()
  }


  getAllWaitingStudent(){
    this.http.get(this.module_endpoint.auth.getAllStudents).pipe(
      map(student=>{
        let arr=[]
        let studentList=student['studentList']
        studentList.forEach(student=>{  
          student.courses.forEach(element => {
            if(element.status=='waiting'){
              arr.push({userName: student['userName'], firstName:student['firstName'],lastName:student['lastName'],
                grade:element.grade, subject:element.subject, batchType:element.batchType, courseObjId:element._id,
                duration:element.duration,admissionDate:element.admissionDate})
            }
          });
        })
        return arr
      })
    ).subscribe(data=> {
      this.studentWaitingList=[...data]
    })
  }

  showWaitingStudent(){
    this.allStudentWaitingTable=true
  }

  batchRosterOpen(event){
    if(event.date){
      this.batchDayShow=true
      let date=new Date((event.date).setHours((event.date).getHours()+1))
      let hrs=date.getHours()<10?`0${date.getHours()}`:date.getHours()
      let min=date.getMinutes()<10?`0${date.getMinutes()}`:date.getMinutes()
      this.newBatch.startTime=event.dateStr.substr(11,5)
      this.newBatch.endTime=`${hrs}:${min}`
      this.newBatch.day=event.date.getDay()
    }
    if(event.event){
      this.batchStudentShow=true
      this.studentWaitingTable=true
      let arr=[...this.studentWaitingList]
      let batch=event.event._def.extendedProps
      this.studentInBatchList=this.allScheduledBatches.find(eachBatch=>eachBatch['_id']==batch['_id'])
      arr.forEach(student=>{
        if(student.grade==batch.grade && student.subject==batch.subject && student.batchType==batch.batchType){
          student.canAllocate=true
        } else {
          student.canAllocate=false
        }
      })
      arr.sort((a,b)=>{return b.canAllocate-a.canAllocate})
      this.studentWaitingList=[...arr]
      this.selectedBatchForMap=batch
    }
  }

  getAllScheduledBatch(){
    this.struct.getAllScheduledBatch().pipe(
      map(data=>{
        let arr=[]
        this.allScheduledBatches=data['scheduledBatchList']
        data['scheduledBatchList'].forEach(batch => {
          let obj={...batch}
          obj.title=`${batch.grade}-${batch.subject.substr(0,3)}-${batch.batchType.substr(0,1)}`
          obj.daysOfWeek=[+batch.day]
            arr.push(obj)
        });
        return arr
      })
    ).subscribe(data => {
          console.log(data)
          data.forEach(batch=>{
            if(batch.userList.length==0){
              batch.color='green'
            }
            if(batch.userList.length==batch.maxStudent){
              batch.color='red'
            }
          })
          this.batchList=[...data]
          this.batchListDummy=[...data]
        })
  }

  scheduleBatch(){
    this.newBatch.grade=this.newBatch.grade['label']
    this.newBatch.subject=this.newBatch.subject['label']
    this.newBatch.batchType=this.newBatch.batchType['label']
    this.allBatchType.forEach(batchType=>{
      if(batchType.label==this.newBatch.batchType){
        this.newBatch.maxStudent=batchType.maxCount
      }
    })

    this.http.post(this.module_endpoint.adminOptions.scheduleBatch, this.newBatch)
        .subscribe(data=> {
          this.getAllScheduledBatch()
          this.batchDayShow=false
        }, error=> {
          console.log(error)
          this.batchDayShow=false
          this.messageService.add(
          {
            key: 'deleteToast', severity: 'error', summary: 'Failed', life: 2000,
            detail: error['error']['msg']
          });
        })
  }

  openScheduledBatchFilter(){
    this.batchFilterShow=true
  }

  schedledBatchFilter(){
    this.batchList=[...this.batchListDummy]
    let arr=[...this.batchList]
    if(this.scheduledBatchFilter.gradeList.length>0){
      let res=arr.filter(batch=>this.scheduledBatchFilter.gradeList.includes(batch.grade))
      arr=[...res]
    }
    if(this.scheduledBatchFilter.subjectList.length>0){
      let res=arr.filter(batch=>this.scheduledBatchFilter.subjectList.includes(batch.subject))
      arr=[...res]
    }
    if(this.scheduledBatchFilter.batchTypeList.length>0){
      let res=arr.filter(batch=>this.scheduledBatchFilter.batchTypeList.includes(batch.batchType))
      arr=[...res]
    }
    if(this.scheduledBatchFilter.startTime){
      this.batchCalendarOptions.slotMinTime=this.scheduledBatchFilter.startTime
    }
    if(this.scheduledBatchFilter.endTime){
      this.batchCalendarOptions.slotMaxTime=this.scheduledBatchFilter.endTime
    }
    this.batchList=[...arr]
    this.batchFilterShow=false
  }

  allocateToBatch(){
    let obj={batchId: this.selectedBatchForMap._id, userList: this.selectedStudentForBatch}
    this.http.post(this.module_endpoint.adminOptions.addStudentToBatch, obj)
        .subscribe(data=> {
          this.selectedStudentForBatch=[]
          this.getAllWaitingStudent()
          this.getAllScheduledBatch()
          this.batchStudentShow=false
        }, error=> {
          this.batchStudentShow=false
          console.log(error)
          this.messageService.add(
          {
            key: 'deleteToast', severity: 'error', summary: 'Failed', life: 2500,
            detail: error['error']['msg']
          });
        })
  }

  removeFromBatch(){
    console.log(this.selectedStudentForRemove, this.selectedBatchForMap)
    let obj={batchId: this.selectedBatchForMap._id, userList: this.selectedStudentForRemove}
    this.http.post(this.module_endpoint.adminOptions.removeFromBatch, obj)
        .subscribe(data=> {
          this.selectedStudentForRemove=[]
          this.studentInBatchList.userList=[]
          this.getAllWaitingStudent()
          this.getAllScheduledBatch()
          this.batchStudentShow=false
        }, error=> {
          console.log(error)
          this.messageService.add(
          {
            key: 'deleteToast', severity: 'error', summary: 'Failed', life: 2500,
            detail: error['error']['msg']
          });
        }) 
  }

  deleteBatch(){
    console.log(this.selectedBatchForMap)
    this.batchStudentShow=false
    this.confirmationService.confirm({
      key: 'deleteConfirm',
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        if(this.selectedBatchForMap.userList.length>0){
          this.messageService.add(
            {
              key: 'deleteToast', severity: 'error', summary: 'Failed', life: 2500,
              detail: 'Batch has active users'
            });
        } else {
          this.http.post(this.module_endpoint.adminOptions.deleteBatch,this.selectedBatchForMap)
              .subscribe(
                data=> {
                  this.getAllScheduledBatch()
                  this.messageService.add(
                    {
                      key: 'deleteToast', severity: 'success', summary: 'Successful', life: 1500,
                      detail: data['msg']
                    });
                },error=> {
                  console.log(error)
                  this.messageService.add(
                  {
                    key: 'deleteToast', severity: 'error', summary: 'Failed', life: 2500,
                    detail: error['error']['msg']
                  });
                }
              )
        }
        }
    })
  }


  /*------------------------------------ HOLIDAY FUNCTION -------------------------------- */

  getHolidayList(){
    let arr=[]
    this.http.get(this.module_endpoint.adminOptions.getHolidayList)
      .subscribe(data=> {
        let list=data['holidayList']
        list.forEach(holiday => {
          holiday.title=holiday.event
          holiday.start=holiday.holidayDate
          holiday.allDay=true
          arr.push(holiday)
        });
        this.holidayList=[...arr]
      })
  }

  addHoliday(selectedDate){
    this.holidayCalDisplay=false
    let arr=[...this.holidayList]
    let obj={holidayDate:selectedDate.date,event:this.holidayInput}
    this.http.post(this.module_endpoint.adminOptions.addHoliday, obj)
      .subscribe(data => {
        let holiday=data['holiday']
        holiday.title=holiday.event
        holiday.start=holiday.holidayDate
        holiday.allDay=true
        const index=arr.findIndex(el=>el.start==holiday.start)
        index==-1?arr.push(holiday):arr[index].title=holiday.event
        this.holidayList=[...arr]
      })
  }


  deleteHoliday(selectedDate){
    this.holidayCalDisplay=false
    let arr=[...this.holidayList]
    const obj=arr.find(el=>(new Date(el.start)).getTime()==selectedDate.date.getTime())
    this.http.post(this.module_endpoint.adminOptions.holidayDelete, obj)
        .subscribe(data=> {
          this.getHolidayList()
        }, error=> {
            console.log(error)
            this.messageService.add(
            {
              key: 'deleteToast', severity: 'error', summary: 'Failed', life: 2000,
              detail: error['error']['msg']
            });
        })
  }

  displayDate(event){
    this.holidayCalDisplay=true
    this.holidayList.forEach(holiday=> {
     let dt1 =new Date(holiday.holidayDate)
     let dt2 =new Date(event.date)
     if(dt1.getTime()==dt2.getTime()){
       this.holidayInput=holiday.event
     }
    })
    this.selectedDate=event
  }

  clearDialogInput(){
      this.holidayInput=null
  }

}
