import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error= false;
 // role = 'INVALID'
  constructor(
    private formBuilder: FormBuilder,
    private service : AuthService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
  

});

//this.role = this.registerForm.controls.role.status

}


get f() { return this.registerForm.controls; }

onSubmit()
{
  // if(this.f.role.status === 'INVALID')
  // this.role = 'VALID'
  console.log(this.f.role.status)
  this.submitted = true;
  this.loading = true;
  this.service.register(this.f.username.value, this.f.password.value, this.f.role.status).subscribe(
    (data)=>
    {
      console.log(data)

      this.loading = false;
      if(data)
      {
        alert('Registeration succesfull')
      }
      else{
        alert('Registeration failed. try again')
      }
    },
    err=> console.log(err)
  )
}

}