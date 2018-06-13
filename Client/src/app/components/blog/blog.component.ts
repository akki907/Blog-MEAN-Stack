import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators,FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MinLengthValidator } from '@angular/forms/src/directives/validators';
import { BlogService } from'./../../services/blog.service';
import { Profile } from 'selenium-webdriver/firefox';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  message;
  messageClass;
  newPost =false;
  loadingBlogs = false;
  form;
  processing = false;
  blogPost ;
  user;
  constructor(
    private formBuilder : FormBuilder,
    private blogService : BlogService,
    private auth : AuthService,
    ) { 
    this.createNewForm();
  
  }

  createNewForm(){
    this.form = this.formBuilder.group({
      title:['',Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumericValidation
      ])],
      body:['',Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])]
    })
  }

  alphaNumericValidation(controls){
          let regExp = new RegExp(/^[a-zA-Z0-9]+$/);
          if(regExp.test(controls.value)) {
            return null;
          }else{
            return {'alphanumericValidation':true}
          }
  }

  newBlogForm(){
    this.newPost = true;
  }

  reloadBlog(){
    this.loadingBlogs=true;
    this.getAllBlogs()
    setTimeout(()=>{
      this.loadingBlogs=false;
    },2000)
  }

  draftComment(){

  }

  goBack(){
    window.location.reload();
  }

  enableFormNewBlogForm(){
    this.form.get('title').enable();
    this.form.get('body').enable();
  }

  diasbleFormNewBlogForm(){
    this.form.get('title').disable();
    this.form.get('body').disable();
  }

  onSubmitBlog(){
    this.processing = true;
    this.diasbleFormNewBlogForm()

    const blog ={
      title:this.form.get('title').value,
      body:this.form.get('body').value,
    }
    this.blogService.newBlog(blog).subscribe(data=>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableFormNewBlogForm();
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.getAllBlogs()
        setTimeout(()=>{
          this.newPost = false;
          this.message = false;
          this.form.reset();
          this.processing = false;
          this.enableFormNewBlogForm();
        },2000)
      }
    })
  }

  getAllBlogs(){
    this.blogService.allBlogs().subscribe(data=>{
      console.log(data)
      this.blogPost =data.message
    })
  }

  likeBlog(id){
    let postData ={
      id:id
    }
    this.blogService.likeBlog(postData).subscribe(data=>{
      this.getAllBlogs()
    })
  }

  dislikeBlog(id){
    let postData ={
      id:id
    }
    this.blogService.dislikeBlog(postData).subscribe(data=>{
     this.getAllBlogs()
    })
  }

  ngOnInit() {
    this.auth.getProfile().subscribe(Profile=>{
      this.user= Profile.user.username;
    })

    this.getAllBlogs()
  }



}
