import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private auth : AuthService,
    private router : Router
  ) { }

  canActivate(){
      if(this.auth.loggedIn()){
          return true

      }else{
          this.router.navigate(['/login'])
          false
      }
  }
}
