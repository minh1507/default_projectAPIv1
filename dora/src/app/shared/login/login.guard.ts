import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { AuthAPIService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private messageService: MessageService,
    private cookieService: CookieService,
    private router: Router,
    private auth: AuthAPIService
  ) {}

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token = this.cookieService.get('accessToken');
      if(token){
        let check = this.auth.isAuthenticated(token);
        if(check){
          let result: any = this.getDecodedAccessToken(token);
          if(result.data.role == "Admin"){
            this.messageService.add({
              severity: 'warn',
              summary: 'Cảnh báo',
              detail:
                'Bạn đã quay trở lại',
            });
            this.router.navigate(['quan-tri']);
            return false
          }
          if(result.data.role == "User"){
            this.messageService.add({
              severity: 'warn',
              summary: 'Cảnh báo',
              detail:
                'Bạn đã quay trở lại',
            });
            this.router.navigate(['trang-chu']);
            return false
          }
          return true
        }
        return true
      }
    return true;
  }

}
