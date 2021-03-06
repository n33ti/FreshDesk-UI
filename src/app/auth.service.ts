import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable, config , from} from 'rxjs';
import { map } from 'rxjs/operators';
import { invalid } from '@angular/compiler/src/render3/view/util';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl: string
  role: string
  name
  private currentUserSubject: BehaviorSubject<any> = null;
    public currentUser: Observable<any>;

  constructor(private http : HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue() {
    return this.currentUserSubject.value;
}

logout()
{
  localStorage.removeItem('currentUser');
  this.currentUserSubject.next(null);
}

login(username, password, status) {
 console.log(status.toString())
  this.role = status.toString();
 if(status.toString() === 'VALID')
this.loginUrl = 'https://neetifreshdesk.azurewebsites.net/api/Admin/Admin'
else
this.loginUrl= 'https://neetifreshdesk.azurewebsites.net/api/Users'
console.log(this.loginUrl);
   return this.http.get<any>(this.loginUrl)
      .pipe(map(user => {
        console.log(user)
          for(let i = 0; i<user.length; i++)
          {
      //      console.log(user[i].username === username && user[i].password === password)
            if(user[i].username === username && user[i].password === password)
            {
          
            
            localStorage.setItem('currentUser', JSON.stringify(user[i]));
            //console.log("logged in")
           
            this.currentUserSubject.next(user);
            if(user[i] !== undefined)
            {
            if(status.toString() === 'VALID')
            localStorage.setItem('role' , 'admin')
            else
            localStorage.setItem('role' , 'user')
            return user[i];
            }
            }
        
          }
      
          // store user details and jwt token in local storage to keep user logged in between page refreshes
        
          localStorage.removeItem('currentUser');
          return;
         
      }));
      // else
      // return this.http.get<any>('https://neetifreshdesk.azurewebsites.net/api/Admin/Admin')
  
}

public get CurrentRoleValue()
{
  return this.role
}

  register(username , password, role)
  {
    var url ;
    var body= {Username : username ,Password: password }
    if(role.toString() === 'INVALID' )
     url = 'https://neetifreshdesk.azurewebsites.net/api/AddUser';
    else
    url = 'https://neetifreshdesk.azurewebsites.net/api/Admin/AddAdmin'
    console.log(body)
    return this.http.post <any>(url, body).pipe(map(user => {
 
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      
      return user;
               
  }));
}

getUserDetails(userId) : Observable <any>
{
 
  
 return this.http.get('https://neetifreshdesk.azurewebsites.net/api/Admin/Users/' + userId.toString())
}

  }


