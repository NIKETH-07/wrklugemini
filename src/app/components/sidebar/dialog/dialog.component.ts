import { Component,Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from '../sidebar.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
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
  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any ) {

    
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
  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any) {

    
  }
  
}

@Component({
  selector: 'dialog-content-dialog',
  templateUrl: './adddialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,FormsModule, MatFormFieldModule, MatInputModule,],
})
export class AddDialogContentExampleDialog {
  name!: string;
  owner!: string;
  description!: string;
  planstart!: string;
  percent!: string;
  
  constructor(
    public dialog: MatDialog,private router: Router,private http: HttpClient ,
   
    public dialogRef: MatDialogRef<AddDialogContentExampleDialog>
  ) { }
   
  getData(): any {
    const data = {
      name: this.name,
      owner: this.owner,
      description: this.description,
      planstart:this.planstart,
      percent:this.percent
      // Include other fields
    };
  
    return data;
    
  }
  
  //  Addproject() {
    
  //   // const email = this.loginForm.controls['email'].value;
  //   // const password = this.loginForm.controls['password'].value;
  //   const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMDA2Iiwicm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE2ODY5MDQxMTQsImV4cCI6MTY4Njk5MDUxNH0.RMbthiJXMEOE-xw71pBY6wXbYQ5IXOipFzF_LrwWn48"
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   this.http.post('http://localhost:8080/api/project/add',
  //   {
  //     status: "active",
  //     projectName: "newww",
  //     projectDescription: "This is the updated project",
  //     projectDuration: 15,
  //     portfolioId: "0007",
  //      projectOwner: {
  //       _id: "0006",
  //        name: "test01",
  //        email: "test2@gmail.com"
  //      },
  //        projectedStartDate: "2023-06-12T12:00:00Z",
  //        projectedCompletionDate: "2023-06-25T12:00:00Z"
  // },
  // {headers}).subscribe(
  //     (response) => {
  //       // Handle the successful login response
  //       console.log(response);
  //       alert('Project add Successfully')
  //       this.router.navigate(['/projects']); 
  //     },
  //     (error) => {
  //       // Handle the error response
  //       console.error(error);
  //     }
  //   );
  //   this.dialogRef.close()
  // }
  
  
  
}

