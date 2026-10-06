import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';
import { Taches } from './taches/taches';
import { Ajouter } from './ajouter/ajouter';
import { LoginComponent } from './login/login';
import { authGuard } from './services/auth-guard';
import { Register } from './register/register';
import { Session } from './session/session';

export const routes: Routes = [
  { path: '', component: Accueil },
    { path: 'register', component: Register },
      { path: 'login', component: LoginComponent },
  { path: 'taches', component: Taches, canActivate: [authGuard] },
  { path: 'ajouter', component: Ajouter, canActivate: [authGuard] },
 { path: 'session-expiree', component: Session },
 { path: '**', redirectTo: '' }
];