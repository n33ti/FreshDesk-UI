import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {TicketsService} from '../tickets.service';
@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit {
  ticketForm: FormGroup;
  submitted = false;
  error= false;
  loading = false
  constructor(private formBuilder: FormBuilder,
    private service : TicketsService) { }

  ngOnInit(): void {
    this.ticketForm = this.formBuilder.group({
      query: ['', Validators.required],
     
  });
  }
  get f() { return this.ticketForm.controls; }

  onSubmit()
  {
    this.submitted =true;
    this.loading = true;
    this.service.createTicket(this.f.query.value).subscribe(
     (data) =>
     {
     console.log(data)
     if(data === true)
     alert('ticket raised')
     this.loading = false
     },
     err=>
      this.loading = false
    )
  }

}
