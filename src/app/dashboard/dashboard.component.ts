import { Component, OnInit , PipeTransform} from '@angular/core';
import {TicketsService} from '../tickets.service';
import {ActivatedRoute} from '@angular/router'
import {Ticket} from '../ticket'
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import {FilterPipe} from '../filter.pipe';
import {ContactService} from '../contact.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
UserId
tickets: Ticket[] =[]
ticketsOfUser: Ticket[]=[]
Usernames: string[] =[]
User
role;
admin = false
selectedTicketid;
filterForm : FormGroup;
seacrhText;
contacts =[]
ShowTickets = true;
ShowGraph = false;
ShowContacts = false;
ticketByContact:Ticket[] =[]
closeResult = ''
query= ''
status = ''

  constructor(private service : TicketsService, 
    
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute, 
    private pipe: DecimalPipe,
    private contactService : ContactService,
    private userService : AuthService
    ) { 
      this.ShowContacts = false;
      this.ShowGraph = false;
      this.ShowTickets = true;

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
  this.tickets = this.getTickets();
  //  console.log(this.role)
  }
 else
    {
      
      this.admin = true;
      this.service.getTickets().subscribe(
        
          (data) =>
          {
          //  console.log("here" + data)
        
        
        for(let i = 0; i<data.length; i++)
        {
            var ticket = new Ticket()
         //   console.log(data[i])
            ticket.id = data[i].id
            ticket.query = data[i].query
            ticket.status = data[i].status
            ticket.contactPerson = data[i].contact.username
            ticket.userId = data[i].userId
            this.tickets.push(ticket)
         this.userService.getUserDetails(ticket.userId).subscribe(
           data1=> {
          //   ticket.username = null;
          //   console.log(JSON.parse(JSON.stringify(data)))
             var detail = JSON.parse(JSON.stringify(data1))
           //  console.log(detail[0].username)
            
              this.tickets[i].username = detail[0].username
            
           
            // ticket.username = data1.username
           }
         )
             
          //      console.log(this.tickets)
        }
          }
        )
      //  localStorage.removeItem('name')
       // console.log(this.userService.getUserDetails(1))
        console.log(this.tickets)
        
      
    }
    this.contactService.GetContacts().subscribe(
      (data) =>
      {
        for(let i = 0; i<data.length; i++)
        {
          this.contacts.push(data[i]);
        }
        console.log(this.contacts)
      }
    )

    //  this.ticketsOfUser = this.getTickets()
   
    
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
        alert('ticket deleted. Refresh to seee changes')
       }

     )
  }
 updateTicket()
 {

 }
 currentTicket(value)
 {
   console.log(this.tickets)
   //console.log(this.tickets.filter(a=> a.id === value))
  
   this.selectedTicketid = value;
   this.query = this.tickets.find(a=> a.id === parseInt(value)).query
   this.status = this.tickets.find(a=> a.id === parseInt(value)).status

 // console.log(this.query)
  localStorage.setItem('query', JSON.stringify(this.query))
  localStorage.setItem('status', JSON.stringify(this.status))
 }

 search(value)
 {
  this.seacrhText = value
 }

 showTickets()
 {
   

   this.ShowTickets = true;
   this.ShowGraph = false;
   this.ShowContacts = false;
//   console.log(this.ShowContacts)

 }

 showGraph()
 {
   this.ShowTickets = false;
   this.ShowGraph = true;
   this.ShowContacts = false;
  // console.log(this.ShowContacts)

 }
 showContacts()
 {
   this.ShowTickets = false;
   this.ShowGraph = false;
   this.ShowContacts = true;

 }

 viewTickets(value)
 {
  //console.log(value)
  this.contactService.GetTicketsByContact(value).subscribe(
    (data)=>
    {
      this.ticketByContact = []
      //console.log(data);
      for(let i = 0; i<data.length; i++)
      {
      var  ticket = new Ticket()
        ticket.id = data[i].id
        ticket.query = data[i].query
        ticket.status = data[i].status
        this.ticketByContact.push(ticket);
      }
     // console.log(this.ticketByContact)
    }
  )
 

 }

 getTickets(userId=this.UserId)
 {
   
  var tickets =[]
  this.service.getTicketById(userId).subscribe(
    (data) =>
    {
    
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
  return tickets
 }
 ViewUsersTicket(value)
 {
  if(this.seacrhText != value)
  this.seacrhText = value
  else
  this.seacrhText = ''
 }

}
