import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {TicketsService} from './tickets.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FreshDesk-UI';
  currentUser: any;
  id;
  url
  chart= false
  constructor(private authenticationService : AuthService, 
    private router : Router, 
    private ticketService: TicketsService,
    private activatedRoute : ActivatedRoute
    )
  {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    // console.log(this.currentUser);
     if(this.currentUser == undefined)
     {
       this.router.navigate(['login']);
     }
     else
     {
      
      this.router.navigate([this.currentUser.username]);
     
     }
    // this.ticketService.getTickets().subscribe(
    //   (data) =>
    //   {console.log(data)},
    //   err=> console.log(err)
    // )
    }


    logout()
    {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
    }
   
  
  }



