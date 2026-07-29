import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideLucideIcons, LucideLayoutDashboard, LucideGraduationCap,
  LucideBookOpen,
  LucideUsers,
  LucideUserCog,
  LucideClipboardCheck,
  LucideSettings,
  LucideLogOut,
  LucideMenu } from '@lucide/angular';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),

    provideLucideIcons(
      LucideLayoutDashboard,
      LucideGraduationCap,
      LucideBookOpen,
      LucideUsers,
      LucideUserCog,
      LucideClipboardCheck,
      LucideSettings,
      LucideLogOut,
      LucideMenu
    )
  ]
};
