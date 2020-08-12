import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-full-calender',
  templateUrl: './full-calender.component.html',
  styleUrls: ['./full-calender.component.css']
})
export class FullCalenderComponent implements OnInit {
  calendarOptions: CalendarOptions
  calendarVisible = true;
  constructor() { }

  ngOnInit() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      dateClick: this.handleDateClick.bind(this), // bind is important!
      events: [
        { title: 'event 1', start: '2020-08-03T12:30:00', end: '2020-08-04T06:30:00' },
        { title: 'event 2', start: '2020-08-03T06:00:00' }
      ]
    };
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
  

}
