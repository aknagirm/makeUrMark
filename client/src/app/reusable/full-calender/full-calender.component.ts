import { Component, Input, OnChanges, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-full-calender',
  templateUrl: './full-calender.component.html',
  styleUrls: ['./full-calender.component.css']
})
export class FullCalenderComponent implements OnInit,OnChanges {
  @Input() calendarOptions: CalendarOptions
  @Input() eventClick: string
  calendarVisible = true;
  @Input() eventList: any[]
  @Output() clickedItem: EventEmitter<any>=new EventEmitter<any>()
  eventList2=[]
  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnChanges(){
    
    console.log(this.calendarOptions)
    if(this.eventClick=='dateEvent'){
      this.calendarOptions.dateClick=this.handleDateClick.bind(this)
    }
    if(this.eventClick=='slotEvent'){
      this.calendarOptions.eventClick=this.handleEventClick.bind(this)
    }
    this.calendarOptions.events=this.eventList?[...this.eventList]:[]
  }

  ngOnInit() {
    
  }

  handleEventClick(info) {
    var eventObj = info.event;
    let obj=eventObj._def.title
    this.clickedItem.emit({title:obj})
  }
  
  handleDateClick(arg) {
    /* console.log(arg)
    alert('date click! ' + arg.dateStr) */
    this.clickedItem.emit(arg)
  }
}
