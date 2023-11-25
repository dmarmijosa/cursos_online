import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../../config/config';
import { catchError, map, of } from 'rxjs';
import { LoginUser, UserRegister } from '../../../interfaces/auth.interface';
import { UserClass } from '../../../interfaces/auth.interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user!: UserClass;
  token:string='';
  constructor(private http: HttpClient, private router: Router) {
    this.initAuthToken();
  }

  initAuthToken() {
    if (localStorage.getItem('token')) {
      this.user = JSON.parse(localStorage.getItem('user') || '');
      this.token =  localStorage.getItem('token') || '';
    }
  }

  /**
   * Login User
   * @param loginuser Login with email and password
   * @returns boolean or ErrrorObservable
   */
  login(loginuser:LoginUser) {
    let url = `${URL_SERVICIOS}/users/login_tienda`;
    return this.http.post(url,loginuser).pipe(
      map((auth:any) => {
        console.log(auth);
        if(auth && auth.USER.token){
          localStorage.setItem('user', JSON.stringify(auth.USER.user));
          localStorage.setItem('token', JSON.stringify(auth.USER.token));
          return true;
        }else{
          return false;
        }
      }),
      catchError((error: Error) => {
        return of(error);
      })
    );
  }

  register(userRegister:UserRegister){
    let url = `${URL_SERVICIOS}/users/register`;
    return this.http.post(url,userRegister);

  }

  logout(){
    localStorage.clear();
    setTimeout(() => {
      this.router.navigate(['/auth/login']).then(()=>{
        location.reload();
      });
    }, 50);
  }
}
