import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ServiceComponent } from 'src/app/components/service/service.component';

@Component({
  selector: 'app-adddialog',
  templateUrl: './adddialog.component.html',
  styleUrls: ['./adddialog.component.css']
})
export class AdddialogComponent {
  name!: string;
  position!: number;
  assignment!: string;
  duration!: string;
  planhour!:string;
  percent!:string;
  dueon!:string;
  starton!:string;
  no!:number
  taskid!:''
  @Output() taskAdded: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    public dialog: MatDialog,private router: Router,private http: HttpClient ,private apiService: ServiceComponent,
   
    public dialogRef: MatDialogRef<AdddialogComponent>
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
  
   Addtask() {
    
    // const email = this.loginForm.controls['email'].value;
    // const password = this.loginForm.controls['password'].value;
    const token =  localStorage.getItem('token');
    const id = localStorage.getItem('userId')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const addproject = this.apiService.apiUrl;
    const mail = localStorage.getItem('EMAIL')
    const requestBody ={
      "status": "inactive",
      assignee: this.assignment,
      planHours: this.planhour,
      duration: this.duration,
      startOn: this.starton,
      dueOn: this.dueon,
      taskName: this.name,
      "description": "Test",
      "createdBy": {
        "_id": "0001",
        "name": "User 4",
        "email": "Use5.techintl@gmail.com"
      },
      "projectID": "122124"
    }
    


    this.http.post(addproject + '/api/task/add', requestBody, { headers }).subscribe(
      (response) => {
        // Handle the successful login response
        console.log(response);
        
        alert('Project add Successfully')
        this.taskAdded.emit();
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
    return !!(this.name && this.dueon && this.starton && this.planhour && this.percent &&this.assignment &&this.duration );
  }
  
}


@Component({
  selector: 'TaskDialog',
  templateUrl: './editdialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,FormsModule, MatFormFieldModule, MatInputModule],
})
export class TaskDialog {
  name!: string;
  position!: number;
  assignment!: string;
  duration!: string;
  planhour!:string;
  percent!:string;
  dueon!:string;
  starton!:string;
  no!:number
  taskid!:''
  @Output() taskEdited: EventEmitter<void> = new EventEmitter<void>();

  
  constructor(public dialog: MatDialog,@Inject(MAT_DIALOG_DATA) public data: any,private router: Router,private http: HttpClient ,private apiService: ServiceComponent,public dialogRef: MatDialogRef<TaskDialog>) {

    
  }

  Edittask() {
    
   const idd = localStorage.getItem('taskid')
    const token =  localStorage.getItem('token');
    const id = localStorage.getItem('userId')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const editproject = this.apiService.apiUrl;
    const mail = localStorage.getItem('EMAIL')
    const requestBody = {
      "status": "inactive",
      assignee: this.data.assignment,
      planHours: this.data.planhour,
      duration: this.data.duration,
      startOn: this.data.starton,
      dueOn: this.data.dueon,
      taskName: this.data.name,
      "description": "Test",
      "createdBy": {
        "_id": "0001",
        "name": "User 4",
        "email": "Use5.techintl@gmail.com"
      },
      "projectID": "122124"
    }

    this.http.put(editproject + '/api/task/edit'+ '/' + idd, requestBody, { headers }).subscribe(
      (response) => {
        // Handle the successful login response
        console.log(response);
        
        alert('Project Update Successfully')
        this.taskEdited.emit();
        this.dialogRef.close();
        
      },
      (error) => {
        // Handle the error response
        console.error(error);
       
      }
    );
  
  }
  
}
