import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private injector: Injector
  ) { }

  intercept(req, next){
    let auth = this.injector.get(AuthService)
    let tokenizedReq= req.clone({
      setHeaders: {
        Authorization: `Bearer ${auth.getLocalStorageItem()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
