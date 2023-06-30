import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PeopleComponent } from './components/people/people.component';
import { TaskComponent } from './components/projects/task/task.component';
import { AuthGuardComponent } from './components/service/auth-guard/auth-guard.component';



const routes: Routes = [
  { path: '', component: AppComponent,
children:[
 { path: '', component: LoginSignupComponent,},
{ path: 'sidebar', component: SidebarComponent},
{ path: 'topbar', component: TopbarComponent},
{ path: 'signup', component: SignupComponent},
{ path: 'projects', component: ProjectsComponent,canActivate: [AuthGuardComponent]},
{ path: 'portfolio', component: PortfolioComponent,canActivate: [AuthGuardComponent]},
{ path: 'people', component: PeopleComponent,canActivate: [AuthGuardComponent]},
{ path: 'task', component: TaskComponent,canActivate: [AuthGuardComponent]},

]
 },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  

}
