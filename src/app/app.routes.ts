import { Routes } from '@angular/router';
import { Accueil } from './accueil/accueil';

import { Taches } from './taches/taches';
import { Ajouter } from './ajouter/ajouter';


export const routes: Routes = [
{ path: '', component: Accueil },
{ path: 'taches', component: Taches },
{ path: 'ajouter', component: Ajouter }        
                              ];
