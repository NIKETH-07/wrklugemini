import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddDialogContentExampleDialog, DialogComponent, DialogContentExampleDialog } from './dialog/dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {  ServiceComponent } from '../service/service.component';

export interface PeriodicElement {
  editMode: boolean;
  name: string;
  position: number;
  owner: string;
  description: string;
  date:string;
  percent:string;
  iddd:string;
  
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 0,
     name: 'workluge', 
     owner: "john", 
     description: 'Human resource management',
     date:'2/203/23',
     percent:'100%',
     iddd:'',
     editMode: false,
    },{position: 0,
      name: 'eLOG', 
      owner: "jaik", 
      description: 'Employes workes monitoring',
      date:'12/2/23',
      percent:'80%',
      iddd:'',
      editMode: false
     },
 
  
  
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isRowSelected: boolean = false;
  selectedSidebarItem!: string;
  lastClickTime: number | undefined;
  editMode:false | undefined;

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
this.inEditproject(element);
    // Perform any additional logic here to save the changes, such as making an API call or updating the data source
    console.log('Updated value:', element.name);
  }


  displayedColumns: string[] = ['select',  'name', 'owner', 'description','percent','date'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  totalItems: number = 0;
  pageIndex: number = 0;
  pageSize: number = 5;

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
  sidebarItems: string[] = ["Projects I Own", "Projects I'm On", "All Projects", ];
  getIconClass(item: string): string {
    this.selectedSidebarItem = item;
    switch (item) {
      case "Projects I Own":
        return "fa fa-user-circle fa-lg"; // Replace with the desired icon class for "Projects I Own"
      case "Projects I'm On":
        return "fa fa-user-circle fa-lg"; // Replace with the desired icon class for "Projects I'm On"
      case "All Projects":
        return "fa fa-users"; // Replace with the desired icon class for "All Projects"
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
  
   
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      width: '700px', 
      data: selectedRowData ,
    });
  

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // Perform any actions with the returned data, if needed
    });
  }
  

  onDialog(): void {
  
  
    const dialogRef = this.dialog.open(AddDialogContentExampleDialog, {
      width: '700px',
      data: {}
    });
    dialogRef.componentInstance.projectAdded.subscribe(() => {
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
        date: result.planstart,
        percent: result.percent,
        iddd: result,
        editMode: false
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
  console.log('sele',  this.selection.selected)
  console.log('ro',this.selection.selected[0].iddd)
  localStorage.setItem('idd',this.selection.selected[0].iddd)
    if (this.isRowSelected) {
      const doubleClickDelayMs = 1500; // Adjust the delay as needed
    if (this.lastClickTime && (new Date().getTime() - this.lastClickTime) < doubleClickDelayMs) {
      // Double click occurred
      console.log('Double click');
      
      
      localStorage.setItem('selectedRow', JSON.stringify(this.selection.selected[0].name));
      localStorage.setItem('selectedRowuser', JSON.stringify(this.selection.selected[0].owner));
      this.router.navigate(['/task']);
    } else {
      
      // Single click occurred
      console.log('Single click');
    }
    this.lastClickTime = new Date().getTime();
  }
  }

  deleteSelectedRow() {
    const ID = this.selection.selected[0].iddd;
  
    // Get the selected row(s) from the selection model
    const selectedRows = this.selection.selected;
  console.log('ro',this.selection.selected[0].iddd)
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
    this.http.delete(deleteapi +'/api/project/delete'+ '/' + ID, {
      headers
}).subscribe(
      (response) => {
        // Handle the successful login response
        console.log(response);
        alert('Project Delete Successfully')
         
      },
      (error) => {
        // Handle the error response
        console.error(error);
      }
    );


  }
 
  
 getAllProjects() {
  const apiUrl = this.apiService.apiUrl;
  const requestData = {
    onset: this.pageIndex * this.pageSize,
    offset: this.pageSize
  };

  this.http.post(apiUrl+'/api/project/list-all', requestData).subscribe(
    (response) => {
      // Handle the successful response
      const projectData = response as any[]; // Assuming the response is an array of projects
      console.log(projectData);
      
      this.projectService.updateProjects(projectData);
      // Call the processProjects function and store the result in processedProjects property
      this.dataSource.data = this.processProjects(projectData);

      // Use the processed projects data to update ELEMENT_DATA
     
console.log('serviceeee',this.projectService)
      console.table(ELEMENT_DATA);
    },
    (error) => {
      // Handle the error response
      console.error(error);
    }
  );
}
showingResults: number = 5;
processProjects(projects: any[]): PeriodicElement[] {
  // Perform any further operations with the projects data

  console.log("Processing projects:", projects);
  // You can store the projects in a variable or use them directly in this function or pass them to another function
  // Example:
  const filteredProjects = projects.filter(project => project.status === 'active'&&'inactive');
  console.log("Filtered projects:", filteredProjects);

  const processedProjects: PeriodicElement[] = projects.map((project, index) => ({
    
    position: index,
    name: project.projectName,
    owner: project.projectOwner.name,
    description: project.projectDescription,
    date: project.projectedStartDate,
    percent: project.status === "active" ? "100%" : "0%",
    iddd:project.projectId,
    editMode:false
    
  }));
  this.totalItems = filteredProjects.length;
  return processedProjects;
}

 
inEditproject(element: PeriodicElement) {
  // Get the necessary data from the element and make the API request
  const IDD = element.iddd;
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('userId');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const editproject = this.apiService.apiUrl;
  const mail = localStorage.getItem('EMAIL');

  const requestBody = {
    status: 'active',
    projectName: element.name,
    projectDescription: element.description,
    projectDuration: 15,
    portfolioId: '0007',
    projectOwner: {
      _id: id,
      name: element.owner,
      email: mail
    },
    projectedStartDate: element.date,
    projectedCompletionDate: element.percent
  };

  this.http.put(editproject + '/api/project/update' + '/' + IDD, requestBody, { headers }).subscribe(
    (response) => {
      // Handle the successful response
      console.log(response);
     
    },
    (error) => {
      // Handle the error response
      console.error(error);
    }
  );
}

  
}
