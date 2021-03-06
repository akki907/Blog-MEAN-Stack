import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component'
import { ProfileComponent } from './components/profile/profile.component'
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards//notAuth.guard';
import { BlogComponent } from './components/blog/blog.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
const appRoutes :Routes = [
    { path :'', component: HomeComponent },
    {path:'dashboard',component: DashboardComponent,canActivate:[AuthGuard]},
    {path:'register',component: RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
    {path:'editBlog/:id',component:EditBlogComponent,canActivate:[AuthGuard]},
    {path:'blog',component: BlogComponent,canActivate:[AuthGuard]},
    {path :'**',component: HomeComponent} 
]


@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports:[RouterModule]
  })
  export class AppRoutingModule { }