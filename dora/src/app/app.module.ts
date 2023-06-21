import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortalComponent } from './pages/portal/portal.component';

import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { LoginComponent } from './pages/login/login.component';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { HeaderComponent } from './pages/admin/layout/header/header.component';
import { FooterComponent } from './pages/admin/layout/footer/footer.component';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Interceptor } from './interceptor';
import { SidebarComponent } from './pages/admin/layout/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    PortalComponent,
    LoginComponent,
    AdminComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CalendarModule,
    InputTextModule,
    CardModule,
    DividerModule,
    PasswordModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
    SidebarModule
  ],
  providers: [
    CookieService,
    MessageService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
