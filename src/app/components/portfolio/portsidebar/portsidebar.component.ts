import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogContentExampleDialog, AddDialogContentExampleDialog } from '../../sidebar/dialog/dialog.component';
export interface PeriodicElement {
  name: string;
  position: number;
  owner: string;
  description: string;
  date:string;
  percent:string;
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 0,
     name: '', 
     owner: "", 
     description: '',
     date:'',
     percent:'',
    },
 
  
  
];
@Component({
  selector: 'app-portsidebar',
  templateUrl: './portsidebar.component.html',
  styleUrls: ['./portsidebar.component.css']
})
export class PortsidebarComponent {
  isRowSelected: boolean = false;
 



  displayedColumns: string[] = ['select',  'name', 'owner', 'description','percent','date'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  sidebarItems: string[] = ["Portfolios I Own",  'All Portfolios', ];
  getIconClass(item: string): string {
    switch (item) {
      case "Portfolios I Own":
        return "fa fa-address-card"; // Replace with the desired icon class for "Projects I Own"
     // Replace with the desired icon class for "Projects I'm On"
      case "All Portfolios":
        return "fa fa-users"; // Replace with the desired icon class for "All Projects"
      default:
        return "";
    }
  }
  // Function to handle item selection
  selectItem(item: string) {
    // TODO: Add logic to handle item selection
    console.log('Selected item:', item);
  }

  constructor(public dialog: MatDialog ,private router: Router,private http: HttpClient) {}

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
  //   const dialogRef = this.dialog.open(AddDialogContentExampleDialog, {
  //     data: {} // Pass an empty object or provide any initial data if needed
  //   });
  
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       console.log(result.name);
  //       console.log(result.owner);
  //       console.log(result.description);
  //       // Access other fields
  //     }
  //   });
  // }
  
    const dialogRef = this.dialog.open(AddDialogContentExampleDialog, {
      width: '700px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
     
      console.log('New project data:', result);

     
      const newProject: PeriodicElement = {
        position: this.dataSource.data.length + 1,
        name: result.name,
        owner: result.owner,
        description: result.description,
        date:result.planstart,
        percent:result.percent,
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
  onRowClick(row: any) {
    this.selection.toggle(row); // Toggle the row selection
    this.isRowSelected = this.selection.isSelected(row);
    console.log(this.isRowSelected); // Update the isRowSelected variable
  
    if (this.isRowSelected) {
      console.log( row); // Log the selected row data
    }
  }

  deleteSelectedRow() {
    // Get the selected row(s) from the selection model
    const selectedRows = this.selection.selected;
  
    // Perform the deletion logic here, e.g., remove the selected row(s) from your data source
    for (const row of selectedRows) {
      // Assuming dataSource is your MatTableDataSource instance
      this.dataSource.data = this.dataSource.data.filter((element) => element !== row);
    }
  
    // Clear the selection after deletion
    this.selection.clear();
  }
  Addproject() {
    // const email = this.loginForm.controls['email'].value;
    // const password = this.loginForm.controls['password'].value;
    const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMDA2Iiwicm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE2ODY4MTkwNzMsImV4cCI6MTY4NjkwNTQ3M30.l9RHxeOZHSZ_UisdBrl0vUwJGL-ZHpy7GGbyIAwVXKA"
    this.http.post('https://workluge-test-production.up.railway.app/api/project/add', {
    status: "active",
    projectName: "Updated Project",
    projectDescription: "This is the updated project",
    projectDuration: 15,
    portfolioId: "0001",
     projectOwner: {
      _id: "0006",
       name: "test01",
       email: "test2@gmail.com"
     },
       projectedStartDate: "2023-06-12T12:00:00Z",
       projectedCompletionDate: "2023-06-25T12:00:00Z"
}).subscribe(
      (response) => {
        // Handle the successful login response
        console.log(response);
        alert('Project add Successfully')
        this.router.navigate(['/sidebar']); 
      },
      (error) => {
        // Handle the error response
        console.error(error);
      }
    );
    
  }
  
 getAllProjects() {
  this.http.get('https://workluge-test-production.up.railway.app/api/project/list-all').subscribe(
    (response) => {
      // Handle the successful response
      const projectData = response as any[]; // Assuming the response is an array of projects
      console.log(projectData);
      alert('All projects retrieved successfully');

      // Call the processProjects function and store the result in processedProjects property
      this.dataSource.data = this.processProjects(projectData);
console.log('filter:' ,  this.dataSource._filterData)
      // Use the processed projects data to update ELEMENT_DATA
     

      console.table(ELEMENT_DATA);
    },
    (error) => {
      // Handle the error response
      console.error(error);
    }
  );
}

processProjects(projects: any[]): PeriodicElement[] {
  // Perform any further operations with the projects data

  console.log("Processing projects:", projects);
  // You can store the projects in a variable or use them directly in this function or pass them to another function
  // Example:
  const filteredProjects = projects.filter(project => project.status === 'active');
  console.log("Filtered projects:", filteredProjects);

  // Process the filtered projects and return the processed data
  const processedProjects: PeriodicElement[] = filteredProjects.map((project, index) => ({
    position: index,
    name: project.projectName,
    owner: project.projectOwner.name,
    description: project.projectDescription,
    date: project.projectedStartDate,
    percent: project.status === "active" ? "100%" : "0%",
  }));

  return processedProjects;
}

  
  
}


