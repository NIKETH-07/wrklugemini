import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceComponent } from '../service/service.component';
import { ErrorDialogComponent } from './errordialog';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})


export class LoginSignupComponent implements OnInit {

  hide: boolean = true;
  isLoginVisible = true;
  isSignupVisible = false;
  initials: string = '';


  constructor(private fb: FormBuilder,private router: Router,private http: HttpClient,private apiService: ServiceComponent,private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

 
  signup(){
    this.router.navigate(['/signup']); 
  }

  onLogin() {
    const email = this.loginForm.controls['email'].value;
    
    localStorage.setItem('EMAIL',email);
    const password = this.loginForm.controls['password'].value;
    const apiUrl = this.apiService.apiUrl;
    // Make the HTTP POST request to the login endpoint of your Node.js backend
    this.http.post(apiUrl +'/api/auth/login', { 
      email: this.loginForm.value.email,
       
        password: this.loginForm.value.password,
     }).subscribe(
      (response: any) => {
        // Handle the successful login response
        console.log( 'token', response);
        
        const token =response.token;
        
        
        localStorage.setItem('token',token );
        
        this.router.navigate(['/projects']); 

        const dialogRef = this.dialog.open(ErrorDialogComponent, {
          data: {
            success: true,
            successMessage: 'User login successfully!'
          },
          width: '300px',
          panelClass: 'custom-dialog'
        });
      },
      (error) => {
        console.error(error);
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
          data: { message: 'User Not Found' },
          width: '300px', // Set the width of the dialog box
          // Apply a custom CSS class to the dialog box
        });
      }
      
    );
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
  }
  getInitials(): string {
    const email = localStorage.getItem('EMAIL');
    if (email) {
      const initials = email.substr(0, 2).toUpperCase();
      return initials;
    }
    return 'N/A';
  }
  
  
}
