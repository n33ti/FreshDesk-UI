import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {TicketsService} from '../tickets.service';

@Component({
  selector: 'app-create-contact-form',
  templateUrl: './create-contact-form.component.html',
  styleUrls: ['./create-contact-form.component.css']
})
export class CreateContactFormComponent implements OnInit {
  createContactForm: FormGroup;
  submitted = false;
  error= false;
  loading = false
  constructor( private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service : TicketsService) { }

  ngOnInit(): void {
    this.createContactForm = this.formBuilder.group({
      contactPerson: ['', Validators.required]
     
  });
  }

  get f() { return this.createContactForm.controls; }

  onSubmit()
  {
    this.submitted = true;
    if (this.createContactForm.invalid) {
      return;
    
  }
  this.service.createContact(this.f.contactPerson.value).subscribe(
    (data)=>
    {
    console.log(data)
    if(data === true)
    alert('contact created')
    }
  )
    
  }

}
