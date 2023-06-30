import { Component, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  onLogin() : boolean {
    // Implement your logic to check if the user is signed in.
    // Return true if the user is signed in, otherwise return false.
    // You can use localStorage, session storage, or any other method to store the user's authentication status.
    // Example:
     const token = localStorage.getItem('token');
    return !!token; // If token exists, consider the user as logged in
    return false; // Replace this with your own logic
  }

}
