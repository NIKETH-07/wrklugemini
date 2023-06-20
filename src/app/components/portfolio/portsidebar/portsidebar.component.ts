import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogContentExampleDialog, AddDialogContentExampleDialog } from '../../sidebar/dialog/dialog.component';
import { EditDialog, PortDialogComponent,  } from '../port-dialog/port-dialog.component';
import { ServiceComponent } from '../../service/service.component';
export interface PeriodicElement {
  name: string;
  position: number;
  owner: string;
  description: string;
  date:string;
  percent:string;
  portId:string;
  
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 0,
//     name: 'test pro', 
//     owner: "nik", 
//     description: 'user1',
//     date:'user@gmail.com',
//     percent:'2/203/23',
    
//    },{position: 0,
//      name: 'edited', 
//      owner: "jaik", 
//      description: 'user2',
//      date:'us@gmail.com',
//      percent:'8012/2/23%',
    
//     },
 
  
  
// ];
@Component({
  selector: 'app-portsidebar',
  templateUrl: './portsidebar.component.html',
  styleUrls: ['./portsidebar.component.css']
})
export class PortsidebarComponent {
  isRowSelected: boolean = false;
   selectedSidebarItem!: string;
 
   ngOnInit(): void {
    this.getAllProjects();
  
  }



  displayedColumns: string[] = ['select',  'name', 'owner', 'description','percent','date',];
  dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource<PeriodicElement>();
 // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
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
    this.selectedSidebarItem = item;
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
    this.selectedSidebarItem = item;
    // TODO: Add logic to handle item selection
    console.log('Selected item:', item);
  }

  constructor(public dialog: MatDialog ,private router: Router,private http: HttpClient,private projectService: ServiceComponent,private apiService: ServiceComponent) {}

  openDialog() {
   
    const selectedRowData = this.selection.selected[0];
  
   
    const dialogRef = this.dialog.open(PortDialogComponent, {
      width: '700px', 
      data: selectedRowData ,
    });
    dialogRef.componentInstance.portAdded.subscribe(() => {
      this.getAllProjects();
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // Perform any actions with the returned data, if needed
    });
  }
  

  onDialog(): void {
    const selectedRowData = this.selection.selected[0];
  
    const dialogRef = this.dialog.open(EditDialog, {
      width: '700px',
      data:selectedRowData,
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
        portId:result.portId
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
      console.log('portid', row.portId);
      localStorage.setItem('portid',this.selection.selected[0].portId) // Log the selected row data
    }
  }

  deleteSelectedRow() {
    // Get the selected row(s) from the selection model
    const selectedRows = this.selection.selected;
  const ID =localStorage.getItem('portid')
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
    this.http.delete(deleteapi +'/api/portfolio/delete'+ '/' + ID, {
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
  this.http.get(apiUrl+'/api/portfolio/list-all').subscribe(
    (response) => {
      // Handle the successful response
      const projectData = response as any[]; // Assuming the response is an array of projects
      console.log( "jhhjk", projectData);
      
      
      this.processProjects(projectData);
      // Use the processed projects data to update ELEMENT_DATA
     

      
    },
    (error) => {
      // Handle the error response
      console.error(error);
    }
  );
}

processProjects(projects: any[]): void {
  const processedProjects: PeriodicElement[] = projects.map((project, index) => ({
    position: index + 1,
    name: project.portfolioName,
    owner: project.portfolioManager.name,
    description: project.portfolioDescription,
    date: project.updatedAt.$date,
    percent: project.createdAt.$date,
    portId: project.portfolioId
  }));

  this.dataSource.data = processedProjects;
}


  
  
}


