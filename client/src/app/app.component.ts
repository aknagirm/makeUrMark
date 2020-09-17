import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from './core/services/loader.service';
import { NavigationEnd, Router } from '@angular/router';
import { StructuralService } from './core/services/structural.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fifth-project';

  constructor(
    private loader:LoaderService,
    private router: Router,
    private struct: StructuralService
  ){}

  ngOnInit(){
    
  }

  onActivate() {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        const urlTree = this.router.parseUrl(this.router.url)
        if(urlTree.fragment){
          const element =document.querySelector('#'+ urlTree.fragment)
          if(element) {
            let scrollPos = setTimeout(() => {
              element.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
              clearInterval(scrollPos)
          }, 500 );
          }
        } else {
          let scrollPos = setTimeout(() => {
            document.querySelector('body').scrollTo(0,0)
            clearInterval(scrollPos)
          }, 100 );
        }
      }
    })
  }

}
