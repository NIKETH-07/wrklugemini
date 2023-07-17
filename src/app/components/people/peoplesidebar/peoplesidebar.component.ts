import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceComponent } from '../../service/service.component';
import { DialogContentExampleDialog, AddDialogContentExampleDialog } from '../../sidebar/dialog/dialog.component';
import { EditDialog, PeopleDialogComponent } from '../people-dialog/people-dialog.component';

import * as jspdf from 'jspdf';
import 'jspdf-autotable';

export interface PeriodicElement {
  name: string;
  position: number;
  owner: string;
  description: string;
  date:string;
  percent:string;
  peopleId:string;
  editMode: boolean;
 
  
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 0,
     name: 'wrkluge', 
     owner: "nik", 
     description: 'new project',
     date:'2/203/23',
     percent:'100%',
     peopleId:'',
     editMode:false
   
    },{position: 0,
      name: 'wrkluge2', 
      owner: "jaik", 
      description: 'new project',
      date:'12/2/23',
      percent:'80%',
      peopleId:'',
      editMode:false
      
     },
 
  
  
];
@Component({
  selector: 'app-peoplesidebar',
  templateUrl: './peoplesidebar.component.html',
  styleUrls: ['./peoplesidebar.component.css']
})

export class PeoplesidebarComponent {

  isRowSelected: boolean = false;
  selectedSidebarItem!: string;

  ngOnInit(): void {
    this.getAllProjects();
  
  }
  onEdit(element: PeriodicElement) {
    // Enable edit mode for the selected row
    element.editMode = true;
    
  }

  onSave(element: PeriodicElement) {
    // Disable edit mode for the selected row and save the changes
    element.editMode = false;
this.inEditpeople(element);
    // Perform any additional logic here to save the changes, such as making an API call or updating the data source
    console.log('Updated value:', element.name);
  }

  totalItems: number = 0;
  pageIndex: number = 0;
  pageSize: number = 5;

  displayedColumns: string[] = ['select',  'name', 'owner', 'description','percent','date'];
  dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource<PeriodicElement>();
  selection = new SelectionModel<PeriodicElement>(true, []);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllProjects();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  sidebarItems: string[] = ["Teams", "Add People", "People List", ];
  getIconClass(item: string): string {
    this.selectedSidebarItem = item;
    switch (item) {
      case "Teams":
        return "fa fa-users "; // Replace with the desired icon class for "Projects I Own"
      case "Add People":
        return "fa fa-plus-circle fa-lg"; // Replace with the desired icon class for "Projects I'm On"
      case "People List":
        return "fa fa-list-ul fa-lg"; // Replace with the desired icon class for "All Projects"
      default:
        return "";
    }
  }
  // Function to handle item selection
  selectItem(item: string) {
    this.selectedSidebarItem = item;
    // TODO: Add logic to handle item selection
    console.log('Selected item:', item);
  }
  

  constructor(public dialog: MatDialog ,private router: Router,private http: HttpClient ,private projectService: ServiceComponent,private apiService: ServiceComponent) {}

  openDialog() {
   
    const selectedRowData = this.selection.selected[0];
  
   
    const dialogRef = this.dialog.open(PeopleDialogComponent, {
      width: '700px', 
      data: selectedRowData ,
    });
    dialogRef.componentInstance.peopleAdded.subscribe(() => {
      this.getAllProjects();
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // Perform any actions with the returned data, if needed
    });
  }
  

  onDialog(): void {
    const selectedRowData = this.selection.selected[0];
    console.log('Selected row data:', selectedRowData);
    const dialogRef = this.dialog.open(EditDialog, {
      width: '700px',
      data:selectedRowData,
    });

    dialogRef.componentInstance.peopleEdited.subscribe(() => {
      this.getAllProjects();
    });

    
  
    dialogRef.afterClosed().subscribe(result => {
      this.getAllProjects();
      if (result) {
     
      console.log('New project data:', result);

     
      const newProject: PeriodicElement = {
        position: this.dataSource.data.length + 1,
        name: result.name,
        owner: result.owner,
        description: result.description,
        date:result.planstart,
        percent:result.percent,
        peopleId:result.peopleId,
        editMode:false
       
      };

      // Add the new project to the table's data source
      this.dataSource.data.push(newProject);

      // Refresh the table
      this.dataSource._updateChangeSubscription();
    }
  });
 }
  



  // onRowClick(row: any) {
  //   this.selection.toggle(row); // Toggle the row selection
  //   this.isRowSelected = this.selection.isSelected(row);
  //   console.log(this.isRowSelected) // Update the isRowSelected variable
  // }
  onRowClick(row: PeriodicElement) {
    
    this.selection.toggle(row); // Toggle the row selection
    
    this.isRowSelected = this.selection.isSelected(row);
    console.log(this.isRowSelected); // Update the isRowSelected variable
  
    if (this.isRowSelected) {
      console.log('portid', row.peopleId);
      localStorage.setItem('peopleid',this.selection.selected[0].peopleId) // Log the selected row data
    }
  }

  deleteSelectedRow() {
    const ID = this.selection.selected[0].peopleId;
    localStorage.setItem('peopleid',this.selection.selected[0].peopleId)
    // Get the selected row(s) from the selection model
    const selectedRows = this.selection.selected;
 // console.log('ro',this.selection.selected[0].iddd)
    // Perform the deletion logic here, e.g., remove the selected row(s) from your data source
    for (const row of selectedRows) {
      // Assuming dataSource is your MatTableDataSource instance
      this.dataSource.data = this.dataSource.data.filter((element) => element !== row);
    }
  
    // Clear the selection after deletion
    this.selection.clear();
    const token = localStorage.getItem('token')
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const deleteapi = this.apiService.apiUrl;
    this.http.delete(deleteapi +'/api/people/delete'+ '/' +ID, {
      headers
}).subscribe(
      (response) => {
        // Handle the successful login response
        console.log(response);
        alert('Person Delete Successfully')
         
      },
      (error) => {
        // Handle the error response
        console.error(error);
      }
    );


  }
 
  
  getAllProjects(): void {
    const apiUrl = this.apiService.apiUrl;
    const requestData = {
      onset: this.pageIndex * this.pageSize,
      offset: this.pageSize
    };
    this.http.post(apiUrl+'/api/people/list-all', requestData).subscribe(
      (response) => {
        // Handle the successful response
        const projectData = response as  { people: PeriodicElement[] }; // Assuming the response is an array of projects
        console.log( "people respo", projectData);
        
        
        this.processProjects(projectData.people);
        // Use the processed projects data to update ELEMENT_DATA
       
  
        
      },
      (error) => {
        // Handle the error response
        console.error(error);
      }
    );
  }
  
  processProjects(projects: any[]): void {
    if (Array.isArray(projects)) {
      const processedProjects: PeriodicElement[] = projects.map((project, index) => ({
        position: index + 1,
        name: project.name,
        owner: project.jobInfo,
        description: project.email,
        date: project.address,
        percent: project.phone,
        peopleId: project.peopleId,
        editMode:false

      }));
  
      this.dataSource.data = processedProjects;
      this.totalItems = projects.length;
      console.table(this.dataSource.data)
    } else {
      console.error('projects is not an array:', projects);
    }
  }
  inEditpeople(element:PeriodicElement) {
    
    const idd = localStorage.getItem('peopleid')
     const token =  localStorage.getItem('token');
     const id = localStorage.getItem('userId')
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     const editproject = this.apiService.apiUrl;
     const mail = localStorage.getItem('EMAIL')
     const requestBody = {
       name: element.name,
       "isActive": false,
       email: element.description,
       phone: element.percent,
       address: element.date,
       "accesslevel": "Manager",
       jobInfo: element.owner
     }
 
     this.http.put(editproject + '/api/people/update'+ '/' + idd, requestBody, { headers }).subscribe(
       (response) => {
         // Handle the successful login response
         console.log(response);
         
         alert('Project Update Successfully')
         this.getAllProjects()
        //  this.peopleEdited.emit();
        //  this.dialogRef.close();
         
       },
       (error) => {
         // Handle the error response
         console.error(error);
        
       }
     );
   
   }


   exportAsPdf(): void {
    const doc = new jspdf.default();
    const selectedSidebarItem = this.selectedSidebarItem;

    // Add the selected sidebar item as a heading in the PDF
    doc.setFontSize(20);
    doc.text(`${selectedSidebarItem}`, 10, 10);
    const headers = [['Name', 'Owner', 'Description', 'Percent Complete', 'Planned Start Date']];
    const data = this.dataSource.data.map(element => [
      element.name,
      element.owner,
      element.description,
      element.percent,
      element.date
    ]);
  
    (doc as any).autoTable({
      head: headers,
      body: data,
    });
  
    doc.save('table_details.pdf');
  }

}
