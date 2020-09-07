import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from '../loader.service';

@Injectable({
  providedIn: 'root'
})
export class RequestHandlerInterceptor implements HttpInterceptor{

  constructor(
    private loader: LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    this.loader.startLoader()
    return next.handle(req).pipe(
      tap(event=> {
        if(event instanceof HttpResponse){
          this.loader.stopLoader()
        }
      },error =>{ 
        console.log(event)
        if(error instanceof HttpErrorResponse) {
          this.loader.resetLoader()
        }})
    )
  }
}
