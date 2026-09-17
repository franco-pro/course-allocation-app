import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/authService';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles?: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class SidebarComponent {

  constructor(private readonly authService: AuthService){}
  menu: MenuItem[]= [

{
label:'Dashboard',
icon:'layout-dashboard',
route:'/dashboard'
},

{
label:'Attributions',
icon:'book-open',
route:'/assignments',
roles:[
'Administrateur Principal'
]
},

{
label:'Validations',
icon:'clipboard-check',
route:'/validations',
roles:[
  'Administrateur Principal'
]
},

{
label:'Enseignants',
icon:'graduation-cap',
route:'/teachers'
},

{
label:'Utilisateurs',
icon:'users',
route:'/users'
},
{
label:'Fiche de suivie',
icon:'person',
route:'/fiche_suivie',
roles:[
  'Administrateur Principal'
]
},

{
label:'Paramètres',
icon:'settings',
route:'/settings'
},
];

get visibleMenu(): MenuItem[]{
  return this.menu.filter(item=>{
    if(!item.roles || item.roles.length ===0){
      return true
    }

    return this.authService.hasAnyRole(item.roles)
  })
}

showLogoutModal = false;
  openLogoutModal(): void{
    this.showLogoutModal = true;
  }
  closeLogoutModal(): void{
    this.showLogoutModal = false;
  }
  confirmLogout():void{
    this.showLogoutModal = false;
    this.authService.logout();
  }

logout(): void{
  this.authService.logout()
}
}