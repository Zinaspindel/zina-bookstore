import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { onErrorResumeNext } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error = false;
  errorMessage:string;
  success=false;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    this.success = false;
    this.error = false;
    this.errorMessage=null;
    if(!form.valid)
      return;
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signup(email,password).subscribe(
      resData =>{
        console.log(resData);
        this.success=true;
        this.router.navigate(['/']);
      },err=>{
        this.error = true;
        this.errorMessage = err;
      }
    );
    form.reset();
  }
 

}
