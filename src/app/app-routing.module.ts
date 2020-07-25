import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from './auth.guard'
import { AdminComponent } from './admin/admin.component';
import {AdminGuard} from './admin.guard'
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: ':id',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create',
        component: TicketFormComponent,
        canActivate: [AuthGuard]
      },
    ]
    
  
  },
 
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
