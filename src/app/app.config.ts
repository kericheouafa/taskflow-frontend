import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideNativeDateAdapter } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';
import { withRouterConfig } from '@angular/router';

registerLocaleData(localeFr);


export const appConfig: ApplicationConfig = {
  providers: [
      provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),
    provideHttpClient(),
    provideNativeDateAdapter(),
    { provide: LOCALE_ID, useValue: 'fr-FR' }
    
  ]
};