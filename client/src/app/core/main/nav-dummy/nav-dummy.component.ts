import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-nav-dummy',
  templateUrl: './nav-dummy.component.html',
  styleUrls: ['./nav-dummy.component.css']
})
export class NavDummyComponent implements OnInit {

  isLoggedIn=true
  classList=['VI','VII','VIII','IX','X','XI','XII']
  constructor() { }

  ngOnInit() {
  }

  openSideNav(){}
  
  openSubMenu(event: ElementRef){
    document.getElementById('SideMenuBar').style.display=='block'?
    document.getElementById('SideMenuBar').style.display='none' :
    document.getElementById('SideMenuBar').style.display='block'
  }

}
