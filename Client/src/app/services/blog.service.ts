import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import {AuthService} from './auth.service'

@Injectable()
export class BlogService {

  options
  constructor(
    private http : Http,
    private auth: AuthService
  ) {
    this.domain = this.auth.domain;
   }

  domain = this.auth.domain;
  createAuthenticationHeader(){
    this.auth.loadToken()
    this.options = new RequestOptions({
      headers :new Headers ({
        'Content-Type': 'application/json',
        'authorization':this.auth.authToken
      })
    })
  }

  newBlog(blog){
    this.createAuthenticationHeader();
    return this.http.post(this.domain + 'blogs/createBlog',blog,this.options).map(res=> res.json())
  }

  allBlogs(){
    this.createAuthenticationHeader();
    return this.http.get(this.domain + 'blogs/allBlogs',this.options).map(res=> res.json())
  }

  getBlogById(id){
    this.createAuthenticationHeader();
    return this.http.get(this.domain + 'blogs/getBlogById/'+id,this.options).map(res=> res.json())
  }

  editBlog(data){
    this.createAuthenticationHeader();
    return this.http.put(this.domain + 'blogs/updateBlog',data,this.options).map(res=> res.json())
  }

  likeBlog(data){
    console.log(data)
    this.createAuthenticationHeader();
    return this.http.post(this.domain + 'blogs/likeBlog',data,this.options).map(res=> res.json())
  }

  dislikeBlog(data){
    this.createAuthenticationHeader();
    return this.http.post(this.domain + 'blogs/disLikeBlog',data,this.options).map(res=> res.json())
  }

}
