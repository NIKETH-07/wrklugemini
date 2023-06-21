import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  [x: string]: any;
  private projects: any[] = [];

  constructor(private router: Router,private http: HttpClient, ) { }

  updateProjects(data: any[]): void {
    this.projects = data;
   
  }
   apiUrl = 'https://workluge-test-production.up.railway.app';
  getProjects(): any[] {
    return this.projects;
  }
}



