import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './pages/portal/portal.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AdminGuard } from './shared/admin/admin.guard';
import { LoginGuard } from './shared/login/login.guard';
import { PortalGuard } from './shared/portal/portal.guard';

const routes: Routes = [
  { path: '', redirectTo: 'trang-chu', pathMatch: 'full' },
  { path: 'trang-chu', component: PortalComponent, canActivate: [PortalGuard] },
  { path: 'dang-nhap', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: 'quan-tri',
    component: AdminComponent,
    canActivateChild: [AdminGuard],
    children: [
      { path: '', redirectTo: 'tong-hop-truc-quan', pathMatch: 'full' },
      { path: 'tong-hop-truc-quan', component: DashboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminGuard]
})
export class AppRoutingModule {}
