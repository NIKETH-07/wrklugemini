import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceComponent } from '../../service/service.component';
import { DialogContentExampleDialog, AddDialogContentExampleDialog } from '../../sidebar/dialog/dialog.component';
import { AdddialogComponent, TaskDialog } from './adddialog/adddialog.component';



export interface PeriodicElement {
  name: string;
  position: number;
  assignment: string;
  duration: string;
  planhour:string;
  percent:string;
  dueon:string;
  starton:string;
  no:number
  taskid:''
  
  
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 0,
     name: 'wrkluge', 
     assignment: "nik", 
     duration: 'new project',
     planhour:'2/203/23',
     percent:'100%',
      dueon:'',
     starton:'',
     no:0,
     taskid:''
    
    },{position: 0,
      name: 'wrkluge2', 
      assignment: "jaik", 
      duration: 'new project',
      planhour:'12/2/23',
      percent:'80%',
     
      dueon:'',
      starton:'',
     no:0,
     taskid:''
     },
 
  
  
];

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {


  isRowSelected: boolean = false;
  selectedSidebarItem!: string;

  ngOnInit(): void {
    this.getAllProjects();
  
  }


  displayedColumns: string[] = ['select','no',  'name', 'assignment', 'duration','planhour','starton','dueon','percent'];
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
  sidebarItems: string[] = ["Tasks", "Project Details", "Updates","Documents","Issues","Staffing","Approvals","Queses","Hours" ];
  getIconClass(item: string): string {
    this.selectedSidebarItem = item;
    switch (item) {
      case "Tasks":
        return "fa fa-tasks"; // Replace with the desired icon class for "Projects I Own"
      case "Project Details":
        return "fa fa-file-text fa-lg"; // Replace with the desired icon class for "Projects I'm On"
      case "Updates":
        return "fa fa-plus-square fa-lg"; 
        case "Documents":
        return "fa fa-book fa-lg";
        case "Issues":
        return "fa fa-exclamation-circle fa-lg";
        case "Staffing":
        return "fa fa-users";
        case "Approvals":
        return "fa fa-thumbs-up fa-lg";
        case "Queses":
          return "fa fa-question-circle fa-lg";
          case "Hours":
            return "fa fa-clock fa-lg";// Replace with the desired icon class for "All Projects"
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
  
   
    const dialogRef = this.dialog.open(AdddialogComponent, {
      width: '700px', 
      data: selectedRowData ,
    });
    dialogRef.componentInstance.taskAdded.subscribe(() => {
      this.getAllProjects();
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // Perform any actions with the returned data, if needed
    });
  }
  

  onDialog(): void {
    const selectedRowData = this.selection.selected[0];
  
    const dialogRef = this.dialog.open(TaskDialog, {
      width: '700px',
      data: selectedRowData
    });
   
    dialogRef.componentInstance.taskEdited.subscribe(() => {
      this.getAllProjects();
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllProjects();
      if (result) {
     
      console.log('New project data:', result);

     
      const newProject: PeriodicElement = {
        position: this.dataSource.data.length + 1,
        name: result.name,
        assignment: result.assignment,
        duration: result.duration,
        planhour:result.planhour,
        percent:result.percent,
        dueon:result.dueOn,
        starton:result.startOn,
        no:this.dataSource.data.length + 1,
        taskid:result.taskId
        
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
     // console.log('rowww', row.iddd);
     console.log('sele row',this.selection.selected[0])
     // localStorage.setItem('idd',this.selection.selected[0].iddd) 
    localStorage.setItem('taskid', this.selection.selected[0].taskid)
      
      // Log the selected row data
    }
  }

  deleteSelectedRow() {
    const ID = this.selection.selected[0].taskid;
    // localStorage.setItem('taskid', this.selection.selected[0].taskid)
  //  localStorage.setItem('idd',this.selection.selected[0].iddd)
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
    this.http.delete(deleteapi +'/api/task/delete'+ '/' + ID , {
      headers
}).subscribe(
      (response) => {
        // Handle the successful login response
        console.log(response);
        alert('Task Delete Successfully')
         
      },
      (error) => {
        // Handle the error response
        console.error(error);
      }
    );


  }
 
  
 getAllProjects() {
  const apiUrl = this.apiService.apiUrl;
  this.http.get(apiUrl+'/api/task/list-all').subscribe(
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
    name: project.taskName,
    assignment: project.assignee,
    duration: project.duration,
    planhour: project.planHours,
    percent: project.status === "active" ? "100%" : "0%",
    starton:project.startOn,
    dueon:project.dueOn,
    no:index,
    taskid:project.taskId
    
    
  }));

  return processedProjects;
}

}
