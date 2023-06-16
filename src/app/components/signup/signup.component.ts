import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
 hide: boolean = true;
  constructor(private fb: FormBuilder,private router: Router,private http: HttpClient) {
  }
  signupForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    name: ['', [Validators.required]],
    role: ['', [Validators.required]],
  })


 

  onSignup() {
    const email = this.signupForm.controls['email'].value;
    const password = this.signupForm.controls['password'].value;
    const name = this.signupForm.controls['name'].value;
    const role = this.signupForm.controls['role'].value;
  
    // Make the HTTP POST request to the login endpoint of your Node.js backend
    this.http.post('http://localhost:8080//api/auth/register', { 
      name:this.signupForm.value.name,
      email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        role:"manager"
     }).subscribe(
      (response: any) => {
        // Handle the successful login response
        console.log(response);
        alert('User login Successfully')
        this.router.navigate(['/projects']); 
      },
      (error: any) => {
        // Handle the error response
        console.error(error);
      }
    );
    if (!this.signupForm.valid) {
      return;
    }
    console.log(this.signupForm.value);
  }
}
