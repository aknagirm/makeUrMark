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
    events: []
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
          })
        }, error=>{
          console.log(error)
        })
    this.getUnallocatedList()
  }

  getUnallocatedList(){
    this.http.get(this.module_endpoint.studentOptions.getUnallocatedCourses)
        .subscribe(data=>{
          console.log(data['unallocatedList'])
          this.unallocatedList=data['unallocatedList']
          let obj={...this.batchCalendarOptions}
          obj.customButtons.myCustomButton.text=`Unallocated List (${this.unallocatedList.length})`
          this.batchCalendarOptions={...obj}
        })
  }

  unallocatedOpen(){
    this.displayUnallocatedList=true
  }

  openBatchDetails(){
    
  }



}
