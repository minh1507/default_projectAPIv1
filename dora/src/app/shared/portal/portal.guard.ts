import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import jwt_decode from 'jwt-decode';
import { AuthAPIService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PortalGuard implements CanActivate {
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
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    // let token = this.cookieService.get('accessToken');
    // let check = this.auth.isAuthenticated(token);
    // if (!check) {
    //   this.messageService.add({
    //     severity: 'warn',
    //     summary: 'Cảnh báo',
    //     detail:
    //       'Bạn không có quyền được truy cập địa chỉ này. Vui lòng đăng nhập lại!',
    //   });
    //   this.router.navigate(['dang-nhap']);
    //   return false;
    // }

    // let result: any = this.getDecodedAccessToken(token);
    // if (result.data?.role == 'User') {
    //   return true;
    // } else if(result.data?.role == 'Admin'){
    //   this.messageService.add({
    //     severity: 'warn',
    //     summary: 'Cảnh báo',
    //     detail:
    //       'Bạn không có quyền được truy cập dịa chỉ này. Vui lòng đăng nhập lại!',
    //   });
    //   this.router.navigate(['quan-tri']);
    //   return false
    // }
    // else{
    //   this.messageService.add({
    //     severity: 'warn',
    //     summary: 'Cảnh báo',
    //     detail:
    //       'Bạn không có quyền được truy cập dịa chỉ này. Vui lòng đăng nhập lại!',
    //   });
    //   this.router.navigate(['dang-nhap']);
    //   return false;
    // }
    return true
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
}
