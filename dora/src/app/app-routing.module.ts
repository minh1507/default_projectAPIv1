import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { PortalComponent } from './portal/portal.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'trang-chu', pathMatch: "full"},
  {
    path: 'quan-tri',
    component: AdminComponent,
    children: [{ path: 'bang-quan-tri', component: DashboardComponent }],
  },
  { path: 'trang-chu', component: PortalComponent },
  { path: 'dang-nhap', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
