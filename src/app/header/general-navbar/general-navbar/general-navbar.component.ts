import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-navbar',
  templateUrl: './general-navbar.component.html',
  styleUrls: ['./general-navbar.component.css']
})
export class GeneralNavbarComponent implements OnInit,OnDestroy {
  isAuthenticated = false;
  username:string; 
  isAdmin = false;
  constructor(private router:Router,private authService:AuthService,) { }

  ngOnInit(): void {
    this.isAdmin=false;
    this.authService.user.subscribe(user=>{
      this.isAdmin=false;
      this.isAuthenticated = !!user;
      if(this.isAuthenticated)
        this.username = this.authService.getUsername();
        if(this.username=='Admin')
          this.isAdmin = true;
    });
  }
  ngOnDestroy(){
    this.username = null
  }
  onLogout(){
    this.authService.logout();
  }
}
