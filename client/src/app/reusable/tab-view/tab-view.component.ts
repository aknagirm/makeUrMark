import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tab-view',
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.css']
})
export class TabViewComponent implements OnInit, OnChanges {

  @Input() subjectList
  @Output() selectedItems =new EventEmitter()
  
  subjectSelected: string[]=[]
  constructor() { }

  ngOnChanges(){
  }

  ngOnInit() {
  }

  subjectSelectionChange(event,id){
    event.checked? this.subjectSelected.push(id)
              : this.subjectSelected.splice(this.subjectSelected.indexOf(id),1)
    this.selectedItems.emit(this.subjectSelected)
  }
}
