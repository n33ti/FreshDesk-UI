import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartColor } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { Ticket } from '../ticket';
import {TicketsService} from '../tickets.service'
import * as Chart from 'chart.js';
@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {

 
  constructor(private service : TicketsService) { }
 
  resolved : number
 chart : any;
 data;
  Tickets : Ticket[] =[]
  ngOnInit(): void {
    
   // this.Tickets = this.tickets;
    //console.log()
    this.service.getTickets().subscribe(
      data=>
      {
      //  console.log(data)
        for(let i =0 ; i<data.length; i++)
        {
          var ticket = new Ticket();
          ticket.id = data[i].id
          ticket.query = data[i].query
          ticket.status = data[i].status
          ticket.contactPerson = data[i].contact.username
          ticket.userId = data[i].userId
     //    console.log(ticket)
          this.Tickets.push(ticket)
          
        }
        var r = 0
        var u = 0
        var p = 0
        var resolved = 0
       for(let i = 0; i<this.Tickets.length; i++)
      {
        console.log(this.Tickets[i].status)
        if(this.Tickets[i].status.toLowerCase() === 'raised')
        {
         r++
        }
        if(this.Tickets[i].status.toLowerCase() === 'under review')
        {
         u++
        }
        if(this.Tickets[i].status.toLowerCase() === 'processed')
        {
         p++
        }
        if(this.Tickets[i].status.toLowerCase() === 'resolved')
        {
         resolved++
        }
      }
      this.resolved = resolved
     
      this.chart = new Chart('canvas', {
        type: 'doughnut',
        data: {
          labels: ['raised','under review', 'processed'],
          datasets: [
            { 
              data: [r, u, p],
              backgroundColor: ['rgba( 240,128,128,0.8)','rgb(255,218,185)', 'rgb(255,182,193)'],
              fill: true
            },
          ]
        },
        options: {
          legend: {
            display: true
          },
          tooltips:{
            enabled:true
          }
        }
      });
     
      
      }
    )
    console.log(this.Tickets)
   
    
  }
 

}
