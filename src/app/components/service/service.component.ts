import { Component, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  private projects: any[] = [];

  constructor() { }

  updateProjects(data: any[]): void {
    this.projects = data;
  }

  getProjects(): any[] {
    return this.projects;
  }
}
