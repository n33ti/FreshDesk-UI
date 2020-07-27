import { Component, OnInit , PipeTransform} from '@angular/core';
import {TicketsService} from '../tickets.service';
import {ActivatedRoute} from '@angular/router'
import {Ticket} from '../ticket'
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import {FilterPipe} from '../filter.pipe';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
UserId
tickets: Ticket[] =[]
Username
role;
admin = false
selectedTicketid;
  filterForm : FormGroup;
  seacrhText;

  constructor(private service : TicketsService, 
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute, 
    pipe: DecimalPipe) { 
    this.filterForm = this.formBuilder.group({
      filter:  ['', ]
    })

     this.role = localStorage.getItem('role')
    if(this.role === 'admin')
     this.admin = true;
     console.log(this.admin)


      //  console.log("here");
    this.activatedRoute.params.subscribe((currentid)=>
    {
     // console.log(currentid)
      this.UserId = currentid.id
      
    });
 //   console.log(this.UserId)

 if(this.role ==='user')
 {
    this.service.getTicketById(this.UserId).subscribe(
      (data) =>
      {
        this.tickets =[]
     //   console.log(data)
       if(data !== null)
       {
        for(let i = 0; i<data.length; i++)
        {
            var ticket = new Ticket()
            console.log(data[i].contact.username)
            ticket.id = data[i].id
            ticket.query = data[i].query
            ticket.status = data[i].status
            ticket.contactPerson = data[i].contact.username
            ticket.userId = data[i].userId
          //console.log(ticket)
            this.tickets.push(ticket)
        }
        console.log(this.tickets.length)
        
      }
    }
    )
    console.log(this.role)
  }
 else
    {
      
      this.admin = true;
      this.service.getTickets().subscribe(
        
          (data) =>
          {
            console.log("here" + data)
            for(let i = 0; i<data.length; i++)
        {
            var ticket = new Ticket()
         //   console.log(data[i])
            ticket.id = data[i].id
            ticket.query = data[i].query
            ticket.status = data[i].status
            ticket.contactPerson = data[i].contact.username
            ticket.userId = data[i].userId
       //    console.log(ticket)
            this.tickets.push(ticket)
        }
          }
        )
        console.log(this.tickets)
    }
    
  }

  ngOnInit(): void {
  
 
  }

  createTicket()
  {
 
  }
  deleteTicket(e)
  {
    //console.log("here")
     this.service.deleteTicket(this.selectedTicketid).subscribe(
       (data) => {console.log(data)
        if(data === true)
        alert('ticket deleted')
       }

     )
  }
 updateTicket()
 {

 }
 currentTicket(value)
 {
   console.log(value)
   this.selectedTicketid = value;
 
 }

 search(value)
 {
  this.seacrhText = value
 }

}
