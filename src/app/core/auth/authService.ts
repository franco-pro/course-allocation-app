import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from '../services/api.service';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { Router } from '@angular/router';
import { UserInterface } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  login(dto: LoginRequest){

    return this.http.post<LoginResponse>(

      `${this.api}/auth/login`,
      dto
    ).pipe(
      tap(response=>{
        localStorage.setItem(
          'access_token',
          response.accessToken
        );
        localStorage.setItem(
          'user',
          JSON.stringify(response.user)
        );
      })

    );

  }

  getCurrentUser(): UserInterface | null {
    const user = localStorage.getItem('user');
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }

  logout(){
const router = inject(Router)
    localStorage.removeItem('access_token');

    localStorage.removeItem('user');
    router.navigate(['/login']);

  }

  get token(){

    return localStorage.getItem('access_token');

  }

  get isAuthenticated(){

    return !!this.token;

  }

}