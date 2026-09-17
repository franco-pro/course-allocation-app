import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../../core/auth/authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {

  hidePassword = true;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, private authService: AuthService, private router: Router
  ) {
    this.loginForm = this.fb.group({
      matricule: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  login(){
  if(this.loginForm.invalid){
    this.loginForm.markAllAsTouched();
    return;
  }
  this.authService.login({
    matricule:this.loginForm.value.matricule!,
    password:this.loginForm.value.password!
  })
  .subscribe({
    next:(response)=>{
      console.log('LOGIN OK');
  console.log('TOKEN:', response.accessToken);

  console.log(
    'Token localStorage:',
    localStorage.getItem('access_token')
  );

   console.log(
    'Token valide ?',
    this.authService.isTokenValid()
  );

  console.log(
    'isAuthenticated ?',
    this.authService.isAuthenticated
  );
      this.router.navigate(['/dashboard']);
    },
    error:(err)=>{
      alert(
        err.error.message ??
        "Connexion impossible"
      );
    }
  });
}
}