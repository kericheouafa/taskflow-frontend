import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { TachesService } from './taches.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-taches',
  standalone: true,
  imports: [
    
    RouterModule,
    MatIconModule,
    MatInputModule,
    DatePipe,
    MatTableModule,
      MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './taches.html',
  styleUrl: './taches.css',
})
export class Taches implements OnInit {

  taches: any[] = [];

  constructor( private tachesService: TachesService,
               private cdr: ChangeDetectorRef ,
                 private router: Router){}



ngOnInit(): void {
   // this.taches = [{ id: 1, titre: 'Test statique', priorite: 1 }];   c'était pur forcer l'affichage
    
    this.tachesService.getTaches().subscribe((data: any[]) => {
        this.taches = data;
        this.cdr.detectChanges();
    });
}

supprimerTache(id: number, titre: string): void  {
const confirmation = confirm(
   `Voulez-vous supprimer la tâche "${titre}" ?`
  );
 if (!confirmation) {
    return;
  }


    this.tachesService.deleteTache(id).subscribe(() => {
      
        this.ngOnInit();
    });
}

updateStatut(id: number, idStatut: number) {
  this.tachesService.updateTache(id, idStatut).subscribe({
    next: (tache: any) => {
      console.log('Statut modifié', tache);
    },
    error: (error: any) => {
      console.error('Erreur lors de la modification du statut', error);
    }
  });
}




      
       //le ngOnInit  recharge toute la liste depuis la BDD en temps réel
    //   this.router.navigate(['/taches']); rafraichie la page mais ça garantie pas l'affichage de la nouvelle istance de notrebase
}