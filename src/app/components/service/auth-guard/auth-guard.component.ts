import { Component, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthComponent } from '../auth/auth.component';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-auth-guard',
  templateUrl: './auth-guard.component.html',
  styleUrls: ['./auth-guard.component.css']
})
export class AuthGuardComponent implements CanActivate {


  constructor(private authService: AuthComponent, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.onLogin() ) {
      return true;
    } else {
      this.router.navigate(['/']); // Replace '/login' with the path of your sign-in page
      return false;
    }
  }
}
