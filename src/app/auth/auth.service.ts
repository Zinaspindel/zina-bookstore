import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, pipe, BehaviorSubject } from 'rxjs';
import { User } from './user/user.module';
import { Router } from '@angular/router';

export interface AuthResponseData{
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user=new BehaviorSubject<User>(null);
  private tokenExpirationTimer:any;
  username:string;
  constructor(private router:Router,private http:HttpClient) { }
  
  private handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
    const expirationDate = new Date(new Date().getTime()+ +expiresIn * 1000);
    this.username = email=='admin@admin.com'?'Admin':email;
    const user = new User(email,userId,token,expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn*1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
  getUsername(){
    return this.username;
  }
  signup(email:string,password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCK9kSNun28AVsJl68q9VL3l3hIRl4Y4H4',
    {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(errorRes =>{
      let errorMessage = 'An unknown error occured!';
      if(!errorRes.error || !errorRes.error.error){
        return throwError(errorMessage);
      }
      switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS':
          errorMessage = "This email already exists";
      }
      return throwError(errorMessage);
    }),tap(resData=>{
      this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
    }));
  }
  login(email:string,password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCK9kSNun28AVsJl68q9VL3l3hIRl4Y4H4',
    {
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(
      tap(resData=>{
        this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
    })
  );
  }
  logout(){
    this.user.next(null);
    this.router.navigate(['/']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer)
      clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer=null;
  }
  autoLogin(){
    const userData:{
      email:string;
      id:string;
      _token:string;
      _tokenExpirationDate:string;
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData)
      return;
    
    const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
    if(loadedUser.token){
      this.username = loadedUser.email=='admin@admin.com'?'Admin':loadedUser.email;
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }
  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout();
    },expirationDuration);
  }
}
