import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module'
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './components/profile/profile.component'
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from'./guards/auth.guard'
import { NotAuthGuard } from './guards//notAuth.guard';
import { BlogComponent } from './components/blog/blog.component'
import { BlogService } from './services/blog.service';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component'
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    BlogComponent,
    EditBlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    FlashMessagesModule,
    FormsModule,
    CKEditorModule
  ],
  providers: [AuthService,AuthGuard,NotAuthGuard,BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
