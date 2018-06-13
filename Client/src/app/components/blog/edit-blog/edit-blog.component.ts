import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router'
import { BlogService } from'./../../../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  message;
  messageClass;
  processing = false;
  blog = {
    title:String,
    body:String
  }
  currentUrl;
  loading = true;

  constructor(
    private location: Location,
    private activeRoute: ActivatedRoute,
    private blogService: BlogService,
    private router:Router
  ) { }


  onSubmitBlog(){
    this.processing = true;
    this.blogService.editBlog(this.blog).subscribe(data =>{
      console.log(data)
      if(!data.success) {
        this.message = data.message;
        this.messageClass = 'alert alert-danger'
        this.processing = false;
      }else{
        this.messageClass = 'alert alert-success'
        this.message = data.message;
        setTimeout(()=>{
          this.router.navigate(['/blog'])
        },1000)
      }

    })
  }

  goBack(){
    this.location.back()
  }

  ngOnInit() {
    this.currentUrl = this.activeRoute.snapshot.params;
    this.blogService.getBlogById(this.currentUrl.id).subscribe(data =>{
      console.log(data)
      if(!data.success) {
        this.message = 'Blog Not Found.';
        this.messageClass = 'alert alert-danger'
      }else{
        this.blog = data.data;
        this.loading = false
      }

    })
  }



}
