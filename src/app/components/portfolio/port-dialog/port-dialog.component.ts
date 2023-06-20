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

@Component({
  selector: 'app-port-dialog',
  templateUrl: './port-dialog.component.html',
  styleUrls: ['./port-dialog.component.css']
})
export class PortDialogComponent {
  name!: string;
  owner!: string;
  description!: string;
  planstart!: string;
  percent!: string;
  projectAdded: any;
  @Output() portAdded: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public dialog: MatDialog,private router: Router,private http: HttpClient ,private apiService: ServiceComponent,
   
    public dialogRef: MatDialogRef<AddDialogContentExampleDialog>
  ) { }
  
  Addproject() {
    
    // const email = this.loginForm.controls['email'].value;
    // const password = this.loginForm.controls['password'].value;
    const token =  localStorage.getItem('token');
    const id = localStorage.getItem('userId')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const addproject = this.apiService.apiUrl;
    const mail = localStorage.getItem('EMAIL')
    const requestBody = {
      portfolioDescription: this.description,
      "status": "active",
      portfolioManager: {
        "_id": "000123",
        name: this.owner
    },
    "projectId": {
        "ids": [
            "123","1234567890"
        ]
    },
      portfolioName: this.name
    }
    

    this.http.post(addproject + '/api/portfolio/add', requestBody, { headers }).subscribe(
      (response) => {
        // Handle the successful login response
        console.log(response);
        
        alert('Project add Successfully')
        this.portAdded.emit();
        this.dialogRef.close();
      },
      (error) => {
        // Handle the error response
        console.error(error);
       
      }
    );
    this.dialogRef.close()
  }
}



@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './portedit.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,FormsModule, MatFormFieldModule, MatInputModule],
})
export class EditDialog {
  name!: string;
  owner!: string;
  description!: string;
  planstart!: string;
  percent!: string;
  
  
  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,private router: Router,private http: HttpClient ,private apiService: ServiceComponent) {

    
  }

  Editproject() {
    
   const idd = localStorage.getItem('portid')
    const token =  localStorage.getItem('token');
    const id = localStorage.getItem('userId')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const editproject = this.apiService.apiUrl;
    const mail = localStorage.getItem('EMAIL')
    const requestBody = {
      portfolioDescription: this.data.description,
      "status": "active",
      portfolioName: this.data.name,
      "projectId": {
          "ids": [
              "6544",
              "5675",
              "56724"
          ]
      }
  }

    this.http.put(editproject + '/api/portfolio/update'+ '/' + idd, requestBody, { headers }).subscribe(
      (response) => {
        // Handle the successful login response
        console.log(response);
        
        alert('Project Update Successfully')
        
        
      },
      (error) => {
        // Handle the error response
        console.error(error);
       
      }
    );
  
  }
  
}