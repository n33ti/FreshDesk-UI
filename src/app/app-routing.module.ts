import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from './auth.guard'
import { AdminComponent } from './admin/admin.component';
import {AdminGuard} from './admin.guard'
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { RegisterComponent } from './register/register.component';
import { UpdateTicketFormComponent } from './update-ticket-form/update-ticket-form.component';
import { CreateContactFormComponent } from './create-contact-form/create-contact-form.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
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
      {
        path: 'update/:id',
        component: UpdateTicketFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'createContact',
        component: CreateContactFormComponent,
        canActivate: [AuthGuard]
      }


    ]
    
  
  }

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
