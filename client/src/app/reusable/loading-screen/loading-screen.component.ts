import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit {
  loading: boolean =false
  
  constructor(
    private loader:LoaderService,
    private cdRef : ChangeDetectorRef
  ){
  }

  ngOnInit() {
    this.checkLoader()
  }
  
  checkLoader(){
    this.loader.getLoaderStatus().subscribe(status => {
      console.log(status)
      this.loading =status
      this.cdRef.detectChanges()
    })
    
  }

  @HostListener('wheel', ['$event']) onScrollEvent(event){
    event.preventDefault();
  } 


}
