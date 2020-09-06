import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {
  error=false;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    const email=form.value.email;
    const password=form.value.password;

    this.authService.login(email,password).subscribe(
      resData=>{
        this.router.navigate(['/']);
      },err=>{
        this.error=true;
      }
    )
    form.reset();
  }
}
