import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {TicketsService} from '../tickets.service';
@Component({
  selector: 'app-update-ticket-form',
  templateUrl: './update-ticket-form.component.html',
  styleUrls: ['./update-ticket-form.component.css']
})
export class UpdateTicketFormComponent implements OnInit {
ticketid: number;
updateForm: FormGroup;
  submitted = false;
  error= false;
  loading = false

  constructor( private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service : TicketsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((currentid)=>
    {
     // console.log(currentid)
      this.ticketid = currentid.id
      console.log(this.ticketid)
      
    });

    this.updateForm = this.formBuilder.group({
      query: ['',],
      status: ['', ],
      contactid : ['']
     
  });
  }
  get f() { return this.updateForm.controls; }
  onSubmit()
  {
   this.loading = true;
   this.submitted = true;
  // console.log(this.f.query.value !== undefined)
   var status, query, contactid;
   if(this.f.status.value === '')
   status = null
   else
   status = this.f.status.value
   
   if(this.f.query.value === '')
   query = null
   else
   query = this.f.query.value

   if(this.f.contactid.value === '')
   contactid = null
   else
   contactid = this.f.contactid.value

   this.service.updateTicket(this.ticketid, status, query, contactid).subscribe(
     (data) => { console.log(data)
    if(data === true)
    alert('contact updated refresh to see changes')
    else
    alert('some error occured')
    },
     err=> console.log(err),
  ()=>
  {
    this.loading = false
  }
   )


  }

}
