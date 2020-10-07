import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-roster',
  templateUrl: './view-roster.component.html',
  styleUrls: ['./view-roster.component.css']
})
export class ViewRosterComponent implements OnInit {
  module_endpoint=environment.server_endpoint
  batchList=[]
  unallocatedList:any=[]
  displayUnallocatedList: boolean=false
  displaybatchDetails: boolean=false
  clickedBatch: any
  daysRemaining=0
  batchCalendarOptions: CalendarOptions= {
    initialView: 'timeGridWeek',
    customButtons: {
      myCustomButton: {
        text: 'View Unallocated List',
        click: this.unallocatedOpen.bind(this),
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
    events: [],
    eventClick: this.openBatchDetails.bind(this)
  }
  constructor(
    private http:HttpClient
  ) { }

  ngOnInit() {
    this.http.get(this.module_endpoint.studentOptions.getAllScheduledBatch)
        .subscribe(data=>{
          this.batchList=data['batchList']
          this.batchList.forEach(batch=>{
            batch['title']=batch.subject
            batch['daysOfWeek']=[+batch.day]
            const date1 = new Date();
            const date2 = new Date(batch.endDate);
            var diff = Math.abs(date2.getTime() - date1.getTime());
            let dayDiff = Math.ceil(diff / (1000 * 3600 * 24)); 
            batch['nearExp']= dayDiff>59?false: true
            batch['color']=!batch['nearExp']?'#007ad9':'red'
          })
        }, error=>{
          console.log(error)
        })
    this.getUnallocatedList()
  }

  getUnallocatedList(){
    this.http.get(this.module_endpoint.studentOptions.getUnallocatedCourses)
        .subscribe(data=>{
          this.unallocatedList=data['unallocatedList']
          let obj={...this.batchCalendarOptions}
          obj.customButtons.myCustomButton.text=`Unallocated List (${this.unallocatedList.length})`
          this.batchCalendarOptions={...obj}
        })
  }

  unallocatedOpen(){
    this.displayUnallocatedList=true
  }

  openBatchDetails(event){
    this.displaybatchDetails=true
    this.clickedBatch=event.event._def.extendedProps
  }

}
