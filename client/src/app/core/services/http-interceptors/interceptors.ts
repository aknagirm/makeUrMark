import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { RequestHandlerInterceptor } from './request-handler.interceptor';

export const interceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: RequestHandlerInterceptor, multi: true}
]