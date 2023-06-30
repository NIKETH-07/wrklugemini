import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceComponent } from '../service/service.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
 

  constructor(public dialog: MatDialog ,private router: Router,private http: HttpClient ,private projectService: ServiceComponent,private apiService: ServiceComponent) {}
 logout() {
    const ID = localStorage.getItem('userId');
   const token = localStorage.getItem('token')
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const deleteapi = this.apiService.apiUrl;
    this.http.delete(deleteapi +'/api/auth/delete'+ '/' + ID, {
      headers
}).subscribe(
      (response) => {
        // Handle the successful login response
        console.log(response);
        alert('logout')
        localStorage.removeItem('token');
        this.router.navigate(['/']);
         
      },
      (error) => {
        // Handle the error response
        console.error(error);
      }
    );


  }
}
