import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout';

import { DashboardComponent } from './features/dashboard/home/home';
import { TeachersComponent } from './features/teachers/teachers';
import { UsersComponent } from './features/users/users';
import { AssignmentProposalComponent } from './features/assignment-proposals/assignment-proposal';
// import { ValidationsComponent } from './features/validations/validations';

import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';
import { PendingValidationsComponent } from './features/assignment-proposals/pending-validations/pending-validations';
import { FicheSuivieComponent } from './features/fiche-suivie/fiche-suivie';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard]
  },

  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [

      {
        path: 'dashboard',
        component: DashboardComponent
      },

      {
        path: 'teachers',
        component: TeachersComponent
      },

      {
        path: 'users',
        component: UsersComponent
      },

      {
        path: 'assignments',
        component: AssignmentProposalComponent
      },

      {
        path: 'validations',
        component: PendingValidationsComponent,
        canActivate:[
          authGuard,
          roleGuard
        ],
        data:{
          roles:[
            'Administrateur Principal'
          ]
        }
      },
      {
        path: 'fiche_suivie',
        component: FicheSuivieComponent
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];