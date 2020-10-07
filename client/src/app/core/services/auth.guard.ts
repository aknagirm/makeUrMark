import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { defaultIfEmpty, finalize, isEmpty, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ExternalFilesService } from './external-files.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private injector: Injector,
    private router: Router
  ){}

   canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> {
  
    let auth=this.injector.get(AuthService)
    let externalFileService=this.injector.get(ExternalFilesService)
  
    auth.getCurrentUser()

    return auth.loggedInUserObj.pipe(
      map(data=>{
        if(data && data instanceof HttpErrorResponse){
          console.log(1)
          externalFileService.loginRegistrationOpen.next('login')
          this.router.navigate(['/home'])
          return false
        } else if(data && data.userName=='none'){
          console.log(2)
          externalFileService.loginRegistrationOpen.next('login')
          this.router.navigate(['/home'])
          return false
        } else {
          console.log(3)
          return true
        }
      })
    )

  }

}
