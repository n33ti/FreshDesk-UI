import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) { }
 user
  getTickets() : Observable <any>
  {
    return this.http.get('https://neetifreshdesk.azurewebsites.net/api/Tickets')
  }
  getTicketById(UserId): Observable <any>
  {
   // console.log("https://neetifreshdesk.azurewebsites.net/api/Tickets/" + UserId.toString())
    return this.http.get('https://neetifreshdesk.azurewebsites.net/api/Tickets/' + UserId.toString())
  }

  createTicket(query)
  {
    this.user = JSON.parse(localStorage.getItem('currentUser'))
    console.log(this.user)
    return this.http.post('https://neetifreshdesk.azurewebsites.net/api/AddTicket/' + this.user.id.toString(), {Query: query})
  }

  deleteTicket(id)
  {
   // console.log()
    return this.http.get('https://neetifreshdesk.azurewebsites.net/api/Admin/DeleteTicket/' + id.toString())
  }

  updateTicket(id, status, query, contact ) : Observable <any>
  {
    console.log(contact)
    var body
    if(contact === null)
     body ={Id: parseInt(id), Query: query, Status: status};
    else
   
     body ={Id: parseInt(id), Query: query, Status: status, ContactId: parseInt(contact)} 
    
    console.log(body)
    return this.http.post('https://neetifreshdesk.azurewebsites.net/api/UpdateTicket', 
    body)
  }

  createContact(contactPerson)
  {
    console.log(contactPerson)
    return this.http.post('https://neetifreshdesk.azurewebsites.net/api/Admin/CreateContact', {Username: contactPerson})
  }
}
