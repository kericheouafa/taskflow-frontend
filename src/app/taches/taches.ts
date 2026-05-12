import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { TachesService } from './taches.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-taches',
  standalone: true,
  imports: [
    DatePipe,
    MatTableModule,
     NgIf,
    NgFor,

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

supprimerTache(id: number): void {
    this.tachesService.deleteTache(id).subscribe(() => {
        this.ngOnInit();
    });
}

      
       //le ngOnInit  recharge toute la liste depuis la BDD en temps réel
    //   this.router.navigate(['/taches']); rafraichie la page mais ça garantie pas l'affichage de la nouvelle istance de notrebase
}