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
        component: PendingValidationsComponent
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];