import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import {DecimalPipe} from '@angular/common';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { RegisterComponent } from './register/register.component';
import { UpdateTicketFormComponent } from './update-ticket-form/update-ticket-form.component';
import { CreateContactFormComponent } from './create-contact-form/create-contact-form.component';
import { FilterPipe } from './filter.pipe';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AdminComponent,
    TicketFormComponent,
    RegisterComponent,
    UpdateTicketFormComponent,
    CreateContactFormComponent,
    FilterPipe,
    DonutChartComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
