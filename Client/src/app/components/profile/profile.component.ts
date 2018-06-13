import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  constructor(
    private auth : AuthService
  ) { }

  ngOnInit() {
    this.auth.getProfile().subscribe(profile =>{
      console.log(profile)
      this.user = profile.user
    })
  }

}
