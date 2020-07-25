import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error= false;
  
 
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service : AuthService
  ) {
    //take endpoint from address bar
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  //   if(this.loginForm.status !== null && this.loginForm.status.toString() === 'VALID' )
  //   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
    }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
  });
  console.log(this.loginForm.controls.role)
  
  }

   // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }

   onSubmit()
   {
    
   this.service.login(this.f.username.value, this.f.password.value, this.loginForm.controls.role.status).subscribe(
     (data)=>
     {
     console.log(data)
      //console.log(this.loginForm.controls.role)
      this.error = true
      this.submitted = true
       
      

      console.log(this.returnUrl)
      if(data !== undefined)
      {
        this.returnUrl = this.returnUrl + data.username;
       this.router.navigate([this.returnUrl])
      
      }
     //alert(data);
     },
     err =>
     {
     console.log("login failed")
     this.error = true
     this.submitted = true
     },
     ()=>{ 
     }
   )

   }

   register(e)
   {
      
   }

}
