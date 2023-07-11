import { Component,EventEmitter,Inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from '../sidebar.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServiceComponent } from '../../service/service.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common'; // Add this line

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
 
})
export class DialogComponent {
  name!: string;
  owner!: string;
  description!: string;
  planstart!: string;
  percent!: string;
  projectAdded: any;
  startDate!: Date;
  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,private router: Router,private http: HttpClient ,private apiService: ServiceComponent ) {

    
  }

  
  Editproject() {
    
    const IDD = localStorage.getItem('idd')
    const token =  localStorage.getItem('token');
    const id = localStorage.getItem('userId')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const editproject = this.apiService.apiUrl;
    const mail = localStorage.getItem('EMAIL')
    const requestBody = {
      status: 'active',
      projectName: this.data.name,
      projectDescription: this.data.description,
      projectDuration: 15,
      portfolioId: '0007',
      projectOwner: {
        _id: id,
        name: this.data.owner,
        email: mail
      },
      projectedStartDate: this.data.planstart,
      projectedCompletionDate: this.data.percent
    };

    this.http.put(editproject + '/api/project/update'+ '/' + IDD, requestBody, { headers }).subscribe(
      (response) => {
        // Handle the successful login response
        console.log(response);
        
        alert('Project Update Successfully')
      
        this.projectAdded.emit();
        
      },
      (error) => {
       
        console.error(error);
       
      }
    );
  
  }
  

}




@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,FormsModule, MatFormFieldModule, MatInputModule],
})
export class DialogContentExampleDialog {
  name!: string;
  owner!: string;
  description!: string;
  planstart!: string;
  percent!: string;
  
  
  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,private router: Router,private http: HttpClient ,private apiService: ServiceComponent) {

    
  }

  Editproject() {
    
    const IDD = localStorage.getItem('idd')
    const token =  localStorage.getItem('token');
    const id = localStorage.getItem('userId')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const editproject = this.apiService.apiUrl;
    const mail = localStorage.getItem('EMAIL')
    const requestBody = {
      status: 'active',
      projectName: this.data.name,
      projectDescription: this.data.description,
      projectDuration: 15,
      portfolioId: '0007',
      projectOwner: {
        _id: id,
        name: this.data.owner,
        email: mail
      },
      projectedStartDate: this.data.planstart,
      projectedCompletionDate: this.data.percent
    };

    this.http.put(editproject + '/api/project/update'+ '/' + IDD, requestBody, { headers }).subscribe(
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

@Component({
  selector: 'dialog-content-dialog',
  templateUrl: './adddialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,FormsModule, MatFormFieldModule, MatInputModule,MatDatepickerModule,CommonModule],
})
export class AddDialogContentExampleDialog {
  name!: string;
  owner!: string;
  description!: string;
  planstart!: Date;
  percent!: string;
  
  @Output() projectAdded: EventEmitter<void> = new EventEmitter<void>();
picker: any;
  constructor(
    public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) public data: any,private router: Router,private http: HttpClient ,private apiService: ServiceComponent,
   
    public dialogRef: MatDialogRef<AddDialogContentExampleDialog>
  ) { }
   
  // getData(): any {
  //   const data = {
  //     name: this.name,
  //     owner: this.owner,
  //     description: this.description,
  //     planstart:this.planstart,
  //     percent:this.percent
  //     // Include other fields
  //   };
  
  //   return data;
    
  // }
  
   Addproject() {
    
    // const email = this.loginForm.controls['email'].value;
    // const password = this.loginForm.controls['password'].value;
    const token =  localStorage.getItem('token');
    const id = localStorage.getItem('userId')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const addproject = this.apiService.apiUrl;
    const mail = localStorage.getItem('EMAIL')
    const requestBody = {
      status: 'active',
      projectName: this.name,
      projectDescription: this.description,
      projectDuration: 15,
      portfolioId: '0007',
      projectOwner: {
        _id: id,
        name: this.owner,
        email: mail
      },
      projectedStartDate: this.planstart,
      projectedCompletionDate: this.percent
    };

    this.http.post(addproject + '/api/project/add', requestBody, { headers }).subscribe(
      (response) => {
        // Handle the successful login response
        console.log(response);
        
        alert('Project add Successfully')
        this.projectAdded.emit();
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
    return !!(this.name && this.owner && this.planstart && this.percent);
  }

  
}

