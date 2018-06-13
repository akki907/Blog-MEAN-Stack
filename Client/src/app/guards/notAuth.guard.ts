import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router,CanActivate } from '@angular/router';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(
    private auth : AuthService,
    private router : Router
  ) { }

  canActivate(){
      if(this.auth.loggedIn()){
        this.router.navigate(['/dashboard'])
          return false
      }else{
          true
      }
  }
}
