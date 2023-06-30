import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceComponent } from '../service/service.component';


@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  hide: boolean = true;
  isLoginVisible = true;
  isSignupVisible = false;


  constructor(private fb: FormBuilder,private router: Router,private http: HttpClient,private apiService: ServiceComponent) {
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
        alert('User login Successfully')
        this.router.navigate(['/projects']); 
      },
      (error) => {
        // Handle the error response
        console.error(error);
        alert('User Not Found')
        
      }
    );
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
  }

  
  
}
