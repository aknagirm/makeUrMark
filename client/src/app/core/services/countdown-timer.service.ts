import { Injectable } from '@angular/core';
import { timer, interval, Observable } from 'rxjs';
import { map, take, takeLast, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountdownTimerService {

  constructor() { }

  startTimer(str: string): Observable<any> {
    var startHrs: number=+str.substr(0,2)
    var startMin: number=+str.substr(3,2)
    var startSec: number=+str.substr(6,2)
    var  maxCount=(startHrs*3600)+(startMin*60)+startSec
    var count=0
    return  Observable.create(obs =>{
      var intervalId=setInterval(()=>{
        count=count+1
        if(startSec == 0  && startMin != 0) {
          startMin=startMin-1
          startSec=60
        }
        if(startMin == 0 && startSec ==0){
          startHrs=startHrs-1
          startMin=60
          startSec=60
        }

        if(count==maxCount) {
          clearInterval(intervalId)
        }
      
      
      startSec=startSec-1
      obs.next(("0" + startHrs).slice(-2)+":"+("0" + startMin).slice(-2)+":"+("0" + startSec).slice(-2))
      }, 1000)

    })
  }
  }
