import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http : HttpClient) { 

  }

  GetContacts() : Observable <any>
  {
    return this.http.get('https://neetifreshdesk.azurewebsites.net/api/Contacts');
  }
}
