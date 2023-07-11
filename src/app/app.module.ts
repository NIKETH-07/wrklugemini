import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {RouterModule} from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import { TopbarComponent } from './components/topbar/topbar.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
import { SignupComponent } from './components/signup/signup.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import {MatBadgeModule} from '@angular/material/badge';
import { ProjectsComponent } from './components/projects/projects.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './components/sidebar/dialog/dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PortsidebarComponent } from './components/portfolio/portsidebar/portsidebar.component';
import {   ServiceComponent } from './components/service/service.component';
import { PortDialogComponent } from './components/portfolio/port-dialog/port-dialog.component';
import { PeopleComponent } from './components/people/people.component';
import { PeoplesidebarComponent } from './components/people/peoplesidebar/peoplesidebar.component';
import { PeopleDialogComponent } from './components/people/people-dialog/people-dialog.component';
import { TaskComponent } from './components/projects/task/task.component';
import { AdddialogComponent } from './components/projects/task/adddialog/adddialog.component';
import {MatTreeModule} from '@angular/material/tree';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AuthComponent } from './components/service/auth/auth.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ErrorDialogComponent } from './components/login-signup/errordialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

@NgModule({
  declarations: [
    AppComponent,
    LoginSignupComponent,
    SidebarComponent,
    TopbarComponent,
    SignupComponent,
    ProjectsComponent,
    DialogComponent,
    PortfolioComponent,
    PortsidebarComponent,
    ServiceComponent,
    PortDialogComponent,
    PeopleComponent,
    PeoplesidebarComponent,
    PeopleDialogComponent,
    TaskComponent,
    AdddialogComponent,
    AuthComponent,
    ErrorDialogComponent
   
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatTabsModule,
    MatInputModule,
    HttpClientModule,
    MatSidenavModule,
    MatGridListModule,
    MatToolbarModule,
    MatChipsModule,
    MatBadgeModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatTreeModule,
    CdkTreeModule,
    MatPaginatorModule,
    MatTooltipModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule
    
    
    
    
  ],
  providers: [ServiceComponent], 
  bootstrap: [AppComponent]
})
export class AppModule { }
