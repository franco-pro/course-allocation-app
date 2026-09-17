import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/authService';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  const requiredRoles = route.data?.['roles'] as string[] | undefined

  if(!requiredRoles || requiredRoles.length ===0){
    return true
  }

  if(authService.hasAnyRole(requiredRoles)){
    return true
  }

  return router.createUrlTree(['/dashboard'])
};
