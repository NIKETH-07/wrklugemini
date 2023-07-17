import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ServiceComponent } from '../../service/service.component';
import { AdddialogComponent, TaskDialog } from './adddialog/adddialog.component';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { DatePipe } from '@angular/common';



export interface PeriodicElement {
  expandable: boolean;
  editMode: boolean;
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
  children?: PeriodicElement[];
  
  
  
  
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 0,
     name: 'Workluge',
     children: [
      { name: 'workluge 2',position: 0,assignment: "jaffer",duration: '22',planhour:'14',percent:'100%',dueon:'10/02/2023',starton:'01/02/2023',no:1,taskid:'',editMode: false,  expandable:false },
      { name: 'workluge 3',position: 1,assignment: "jan",duration: '24',planhour:'17',percent:'80%',dueon:'11/02/2023',starton:'02/02/2023',no:2,taskid:'',editMode: false, expandable:false },

     
    ],
    editMode: false,
     assignment: "john", 
     duration: '20',
     planhour:'20',
     percent:'100%',
      dueon:'10/02/2023',
     starton:'01/02/2023',
     no:0,
     taskid:'',
     expandable:false
    
    },{position: 1,
      editMode: false,
      name: 'eLOG', 
      assignment: "jaik", 
      duration: '15',
      planhour:'10',
      percent:'80%',
     
      dueon:'20/06/2023',
      starton:'1/6/2023',
     no:1,
     taskid:'',
     expandable:false
     },
 ];


 interface ExampleFlatNode extends PeriodicElement {
  expandable: boolean;
  level: number;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  selectedRow: PeriodicElement | undefined;
  selectedRowuser: PeriodicElement | undefined;
  editMode: boolean | undefined;
  isRowSelected: boolean = false;
  selectedSidebarItem!: string;
  filteredData: PeriodicElement[] = [];

  datePipe: DatePipe = new DatePipe('en-US');


  ngOnInit(): void {
    this.getAllProjects();
    
    const selectedRowData = localStorage.getItem('selectedRow');
    if (selectedRowData) {
      this.selectedRow = JSON.parse(selectedRowData);
      console.log('route',this.selectedRow)
    }

    const selectedRowDataowner = localStorage.getItem('selectedRowuser');
    if (selectedRowDataowner) {
      this.selectedRowuser = JSON.parse(selectedRowDataowner);
      console.log('route',this.selectedRow)
    }
  }
  formatDate(date: string | null): string | null {
    if (date) {
      // Check if the date is from the API (using a specific format)
      if (date.includes('/')) {
        const [month, day, year] = date.split('/');
        const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));
        return this.datePipe.transform(parsedDate, 'dd MMM yyyy');
      } else {
        // Date is from static data (using a different format)
        const parsedDate = new Date(date);
        return this.datePipe.transform(parsedDate, 'MMM dd, yyyy');
      }
    }
    return null;
  }
  

  onEdit(element: PeriodicElement) {
    // Enable edit mode for the selected row
    element.editMode = true;
  }

  onSave(element: PeriodicElement) {
    // Disable edit mode for the selected row and save the changes
    element.editMode = false;
    this.inEdittask(element)

    // Perform any additional logic here to save the changes, such as making an API call or updating the data source
    console.log('Updated value:', element.name);
  }


  displayedColumns: string[] = ['select','no',  'name', 'assignment', 'duration','planhour','starton','dueon','percent'];

  private transformer = (node: PeriodicElement, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      assignment:node.assignment,
      duration:node.duration,
      planhour:node.planhour,
      starton:node.starton,
      dueon:node.dueon,
      percent:node.percent,
      no:node.no,
      position:node.position,
      taskid:node.taskid,
      editMode: node.editMode,
level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener<PeriodicElement, ExampleFlatNode>(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource<PeriodicElement, ExampleFlatNode>(
    this.treeControl,
    this.treeFlattener
  );
  totalItems: number = 0;
  pageIndex: number = 0;
  pageSize: number = 5;

  
  selection = new SelectionModel<PeriodicElement>(true, []);
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
  //   if (filterValue) {
  //     this.filteredData = this.filterTreeData(this.dataSource.data, filterValue);
  //     this.dataSource.data = this.filteredData;
  //   } else {
  //     this.dataSource.data = ELEMENT_DATA;
  //   }
  // }
  
  filterTreeData(data: PeriodicElement[], filterValue: string): PeriodicElement[] {
    const filteredData: PeriodicElement[] = [];
  
    data.forEach((node) => {
      const newNode: PeriodicElement = { ...node };
  
      if (node.children) {
        newNode.children = this.filterTreeData(node.children, filterValue);
        if (newNode.children.length > 0) {
          // Preserve the expandable state based on the filtered children
          newNode.expandable = true;
        }
      }
  
      if (
        newNode.name.toLowerCase().includes(filterValue) ||
        newNode.assignment.toLowerCase().includes(filterValue) ||
        newNode.planhour.toLowerCase().includes(filterValue) ||
        newNode.duration.toLowerCase().includes(filterValue) ||
        newNode.starton.toLowerCase().includes(filterValue) ||
        newNode.dueon.toLowerCase().includes(filterValue) ||
        (newNode.children && newNode.children.length > 0)
      ) {
        filteredData.push(newNode);
      }
    });
  
    return filteredData;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    if (filterValue) {
      this.filteredData = this.filterTreeData(this.dataSource.data, filterValue);
      this.dataSource.data = this.filteredData;
  
      // Expand all nodes in the tree
      this.treeControl.expandAll();
    } else {
      this.dataSource.data = ELEMENT_DATA;
    }
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
  

  constructor(public dialog: MatDialog ,private router: Router,private http: HttpClient ,private projectService: ServiceComponent,private apiService: ServiceComponent,) {
    this.dataSource.data = ELEMENT_DATA;
  }

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
        taskid:result.taskId,
        editMode: result,
        expandable:false
        
      };

      // Add the new project to the table's data source
      this.dataSource.data.push(newProject);

      // Refresh the table
    //  this.dataSource._updateChangeSubscription();
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
        this.getAllProjects();
         
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
  this.http.post(apiUrl+'/api/task/list-all', requestData).subscribe(
    (response) => {
      // Handle the successful response
      const projectData = response as any[];
       // Assuming the response is an array of projects
      console.log(projectData);
      
      if (projectData.length > 0) {
        this.projectService.updateProjects(projectData);
        this.dataSource.data = this.processProjects(projectData);
        this.totalItems = projectData.length;
      } else {
        this.dataSource.data = ELEMENT_DATA;
       
      } 
    },
    (error) => {
      // Handle the error response
      console.error(error);
    }
  );this.totalItems = ELEMENT_DATA.length;
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
   
    assignment: project.createdBy.name ? project.assignee[0]?.name: '', // Access the name property of the assignee object
    duration: project.duration,
    planhour: project.planHours,
    percent: project.status === "active" ? "100%" : "0%",
    starton: project.startOn,
    dueon: project.dueOn,
    no: index,
    taskid: project.taskId,
    editMode: false,
    expandable:false
  }));
  
  
  
  this.filteredData = processedProjects;
  return processedProjects;
}
hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


inEdittask(element:PeriodicElement) {
    
  const idd = localStorage.getItem('taskid')
   const token =  localStorage.getItem('token');
   const id = localStorage.getItem('userId')
   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
   const editproject = this.apiService.apiUrl;
   const mail = localStorage.getItem('EMAIL')
   const requestBody = {
     "status": "inactive",
     assignee: element.assignment,
     planHours: element.planhour,
     duration: element.duration,
     startOn: element.starton,
     dueOn: element.dueon,
     taskName: element.name,
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
       
       
      //  this.taskEdited.emit();
      //  this.dialogRef.close();
       
     },
     (error) => {
       // Handle the error response
       console.error(error);
      
     }
   );
 
 }

}
