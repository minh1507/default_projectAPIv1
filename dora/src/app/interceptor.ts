import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.cookieService.get("token");
    if(token){
      const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token);
    const AuthRequest = request.clone({ headers: headers });
    return next.handle(AuthRequest);
    }
    else{
      const headers = new HttpHeaders()
      .set('Access', "auth");
    const AuthRequest = request.clone({ headers: headers });
      return next.handle(AuthRequest);
    }

  }
}
