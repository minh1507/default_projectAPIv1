import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthAPIService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  eye: string = 'pi pi-eye-slash';
  submitted: boolean = false;

  get loginAct() {
    return this.loginForm.controls;
  }
  loginForm: FormGroup = this.formBuilder.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private authService: AuthAPIService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {}

  actionEye = () => {
    if (this.type === 'password') {
      this.type = 'text';
      this.eye = 'pi pi-eye';
    } else {
      this.type = 'password';
      this.eye = 'pi pi-eye-slash';
    }
  };

  onSubmit() {
    let error = 0;
    this.submitted = true;

    if (this.loginAct.username.status == 'INVALID') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Cảnh báo',
        detail: 'Tài khoản không được để trống',
      });
      error++;
    }

    if (this.loginAct.password.status == 'INVALID') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Cảnh báo',
        detail: 'Mật khẩu không được để trống',
      });
      error++;
    }

    if (error) {
      return;
    }

    this.authService
      .login({ ...this.loginForm.value })
      .subscribe((response) => {
        if (response.errors) {
          response.errors.forEach((value: any) => {
            this.messageService.add({
              severity: 'warn',
              summary: 'Cảnh báo',
              detail: value.msg,
            });
          });
        } else {
          this.cookieService.deleteAll();
          let result = response.success[0].value;
          let message = response.success[0].msg;
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công',
            detail: message + ', Xin chào ' + result.username,
          });

          this.cookieService.set('role', result.role);
          this.cookieService.set('accessToken', result.accessToken);
          this.cookieService.set('refreshToken', result.refreshToken);
          this.cookieService.set('username', result.username);

          let role = response.success[0].value.role;
          if (role == 'Admin') {
            this.router.navigate(['quan-tri']);
          }
          if (role == 'User') {
            this.router.navigate(['trang-chu']);
          }
        }
      });
  }
}
