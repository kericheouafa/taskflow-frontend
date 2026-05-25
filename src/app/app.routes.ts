import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';

import { Taches } from './taches/taches';
import { Ajouter } from './ajouter/ajouter';
import { LoginComponent } from './login/login';


export const routes: Routes = [
{ path: '', component: Accueil },
  { path: 'login', component: LoginComponent },
{ path: 'taches', component: Taches },
{ path: 'ajouter', component: Ajouter }        
                              ];
