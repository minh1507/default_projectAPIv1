import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { login } from 'src/app/models/auth.model';
import { enviroment } from 'eviroment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthAPIService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}
  sub: string = 'auth/';

  public login(data: any) {
    return this.http.post<login>(enviroment.api_domain + this.sub + 'login', {
      username: data.username,
      password: data.password,
    });
  }

  // public signup(username: string, password: string, type: number) {
  //   return this.http.post<register>(this.domain + 'register', {
  //     username: username,
  //     password: password,
  //     type: type,
  //   });
  // }

  public logout(data: any) {
    return this.http.post<any>(enviroment.api_domain + this.sub + 'logout', {
      username: data.username,
    });
  }

  public isAuthenticated(token: any): boolean {
    try {
      return !this.jwtHelper.isTokenExpired(token);
    } catch {
      return true;
    }
  }
}
