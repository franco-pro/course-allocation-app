import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/authService';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  constructor(private readonly authService: AuthService){}

  get firstName():string {
    console.log("name:", this.authService.getCurrentUser());
    
    return this.authService.getCurrentUser()?.prenom ?? 'Utilisateur';
  }

  
}