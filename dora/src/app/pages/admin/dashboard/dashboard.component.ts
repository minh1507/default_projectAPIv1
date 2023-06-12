import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthAPIService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  username: string = '';

  constructor(
    private auth: AuthAPIService,
    private cookie: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.cookie.get('username');
  }

  logout() {
    this.cookie.deleteAll()
    this.auth.logout({username: this.username}).subscribe();
    this.router.navigate(['dang-nhap']);
  }
}
