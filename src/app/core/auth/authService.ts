import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from '../services/api.service';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { Router } from '@angular/router';
import { UserInterface } from '../models/user.model';
import { JwtPaloadModel } from '../models/jwtPayload.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  constructor(private readonly router: Router){
    super()
  }

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
      console.log('❌ Aucun user dans localStorage');
      return null;
    }
    try{
      
      return JSON.parse(user);
    }catch{
      return null
    }
  }

  

  get token():string | null{
    return localStorage.getItem('access_token');
  }

  getTokenPayload():JwtPaloadModel | null{
    const token = this.token
    if(!token){
      return null
    }

    try{
      const parts = token.split('.')
      // console.log("parts in authservice:", parts);
      
      if(parts.length !== 3){
        return null
      }

      const payload = parts[1]
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')

      const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=')

      return JSON.parse(atob(padded)) as JwtPaloadModel
    }catch(error){
      console.error('Error decoding token payload:', error)
      return null
    }
  }

  getRoles(): string[]{
    const payload = this.getTokenPayload();
    // console.log("payload in getRoles:", payload);
    
    return payload ? payload.roles : [];
  }


  hasRole(role: string): boolean{
    const roles = this.getRoles();
    return roles.includes(role);
  }


  hasAnyRole(roles: string[]): boolean{
    const userRoles = this.getRoles();
    return roles.some(role => userRoles.includes(role));
  }

  get matricule(): string | null{
    const payload = this.getTokenPayload();
    return payload ? payload.matricule : null;
  }

  get isTeacher(): boolean{
    const payload = this.getTokenPayload();
    return payload ? payload.isTeacher === 1 : false;
  }
  
  get departementId(): number | null{
    const payload = this.getTokenPayload();
    return payload ? payload.departementId ?? null : null;
  }

  isTokenValid(): boolean{
    // const token = this.token
    // if(!token){
    //   return false
    // }

    // try{
    //   const payload = JSON.parse(atob(token.split('.')[1]))

    //   if(!payload.exp){
    //     return false
    //   }

    //   const now = Math.floor(Date.now()/1000)

    //   return payload.exp> now
    // }catch{
    //   return false
    // }

    const payload = this.getTokenPayload();
    if(!payload || !payload.exp){
      return false
    }

    const now = Math.floor(Date.now()/1000)
    return payload.exp > now
  }

    get isAuthenticated(): boolean {

    return this.isTokenValid();

  }

  logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}