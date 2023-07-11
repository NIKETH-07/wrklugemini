import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceComponent } from '../../service/service.component';
import { AddDialogContentExampleDialog } from '../../sidebar/dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-people-dialog',
  templateUrl: './people-dialog.component.html',
  styleUrls: ['./people-dialog.component.css']
})
export class PeopleDialogComponent {
  name!: string;
  email!: string;
  jobinfo!: string;
  phone!: string;
  address!: string;
  projectAdded: any;
  @Output() peopleAdded: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public dialog: MatDialog,private router: Router,private http: HttpClient ,private apiService: ServiceComponent,
   
    public dialogRef: MatDialogRef<AddDialogContentExampleDialog>
  ) { }
  
  Addpeople() {
    
    // const email = this.loginForm.controls['email'].value;
    // const password = this.loginForm.controls['password'].value;
    const token =  localStorage.getItem('token');
    const id = localStorage.getItem('userId')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const addproject = this.apiService.apiUrl;
    const mail = localStorage.getItem('EMAIL')
    const requestBody = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      address: this.address,
      "isActive": true,
      "accessLevel": "User",
      jobInfo: this.jobinfo,
      "createdByID": "1000"
    }
    
    

    this.http.post(addproject + '/api/people/add', requestBody, { headers }).subscribe(
      (response) => {
        // Handle the successful login response
        console.log(response);
        
       
        this.peopleAdded.emit();
        this.dialogRef.close();
      },
      (error) => {
        // Handle the error response
        console.error(error);
       
      }
    );
    this.dialogRef.close()
  }
  isValidForm(): boolean {
    return !!(this.name && this.email && this.jobinfo && this.phone && this.address);
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './peopledit.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,FormsModule, MatFormFieldModule, MatInputModule],
  
})
export class EditDialog {
  name!: string;
  owner!: string;
  description!: string;
  planstart!: string;
  percent!: string;
  @Output() peopleEdited: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,private router: Router,private http: HttpClient ,private apiService: ServiceComponent,public dialogRef: MatDialogRef<EditDialog>) {

    
  }

  Editpeople() {
    
   const idd = localStorage.getItem('peopleid')
    const token =  localStorage.getItem('token');
    const id = localStorage.getItem('userId')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const editproject = this.apiService.apiUrl;
    const mail = localStorage.getItem('EMAIL')
    const requestBody = {
      name: this.data.name,
      "isActive": false,
      email: this.data.description,
      phone: this.data.percent,
      address: this.data.date,
      "accesslevel": "Manager",
      jobInfo: this.data.owner
    }

    this.http.put(editproject + '/api/people/update'+ '/' + idd, requestBody, { headers }).subscribe(
      (response) => {
        // Handle the successful login response
        console.log(response);
        
        alert('Project Update Successfully')
        this.peopleEdited.emit();
        this.dialogRef.close();
        
      },
      (error) => {
        // Handle the error response
        console.error(error);
       
      }
    );
  
  }
  
}

