import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})
export class TimeTableComponent implements OnInit {
  dummy=new Date().toString()
  testEventClick='dateEvent'
  testList: any=[{ title: 'event 1', start: '2020-09-21T12:30:00', end: '2020-09-21T16:30:00',color:'red', className:'dummy' },
  { title: 'event 2', startTime: '10:00', 
  endTime: '14:00', 
  daysOfWeek: [ 1, 4 ] }]
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: '', //'prev today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    dayHeaderFormat: { weekday: 'short' },
    //eventClick: this.handleDateClick.bind(this), // bind is important!
    events: [
     // { title: 'event 1', start: '2020-09-21T12:30:00', end: '2020-09-21T16:30:00',color:'red', className:'dummy' },
     // { title: 'event 2', start: '2020-09-22T06:00:00' }
      //...this.testList
    ]
  };
  timeSlots: any[]=[]
  
  constructor() { }

  ngOnInit() {
    this.createSlot()
    console.log(this.timeSlots)
    
  }

  createSlot(){
    var currDate=new Date()
    let slot="00:00"
    currDate.setHours(0,0,0)
    while(slot!="23:30"){
      let hrs=currDate.getHours()<10?`0${currDate.getHours()}`:currDate.getHours()
      let min=currDate.getMinutes()<10?`0${currDate.getMinutes()}`:currDate.getMinutes()
      slot=`${hrs}:${min}`
      currDate=new Date(currDate.setMinutes(currDate.getMinutes()+30))
     this.timeSlots.push({'slotTime':slot})
    }
  }

}
