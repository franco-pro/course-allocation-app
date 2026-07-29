import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

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

  menu = [

{
label:'Dashboard',
icon:'layout-dashboard',
route:'/dashboard'
},

{
label:'Attributions',
icon:'book-open',
route:'/assignments'
},

{
label:'Validations',
icon:'clipboard-check',
route:'/validations'
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
label:'Paramètres',
icon:'settings',
route:'/settings'
}

];

}