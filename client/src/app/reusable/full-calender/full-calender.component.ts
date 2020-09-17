import { Component, Input, OnChanges, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-full-calender',
  templateUrl: './full-calender.component.html',
  styleUrls: ['./full-calender.component.css']
})
export class FullCalenderComponent implements OnInit,OnChanges {
  calendarOptions: CalendarOptions
  calendarVisible = true;
  @Input() eventList: any[]
  @Output() clickedItem: EventEmitter<any>=new EventEmitter<any>()
  eventList2=[]
  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnChanges(){
    console.log(this.eventList)
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev', //'prev today',
        center: 'title',
        right: 'next'//'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      eventClick: this.handleDateClick.bind(this), // bind is important!
      events: [
        //{ title: 'event 1', start: '2020-09-03T12:30:00', end: '2020-08-04T06:30:00',color:'red', className:'dummy' },
        //{ title: 'event 2', start: '2020-09-03T06:00:00' }
        ...this.eventList
      ]
    };
  }

  ngOnInit() {
    
  }

 /*  ngDoCheck(){
    if(JSON.stringify(this.eventList2) !== JSON.stringify(this.eventList)){
      this.eventList2=this.eventList
      console.log(this.eventList2)
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev', //'prev today',
          center: 'title',
          right: 'next'//'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        eventClick: this.handleDateClick.bind(this), // bind is important!
        events: [
          //{ title: 'event 1', start: '2020-09-03T12:30:00', end: '2020-08-04T06:30:00',color:'red', className:'dummy' },
          //{ title: 'event 2', start: '2020-09-03T06:00:00' }
          ...this.eventList2
        ]
      };
    }
  } */

  handleDateClick(info) {
    var eventObj = info.event;
    let obj=eventObj._def.title
    this.clickedItem.emit({title:obj})
  }
  

}
