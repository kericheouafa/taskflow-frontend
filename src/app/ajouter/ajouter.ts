import { Component, signal } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TachesService } from '../taches/taches.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ajouter',
  imports: [
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
   
  ],
  templateUrl: './ajouter.html',
  styleUrl: './ajouter.css',
})
export class Ajouter {

  erreurs = signal<Record<string, string>>({});

  titre: string = '';
  priorite: number = 1;
  dateLimite: Date | null = null;
  message: string = '';

  constructor(
    private tachesService: TachesService,
    private router: Router
  ) {}

  ajouterTache(): void {

    this.erreurs.set({});

    const nouvelleTache = {
      titre: this.titre,
      priorite: this.priorite,
      dateLimite: this.dateLimite
    };

    this.tachesService.createTache(nouvelleTache).subscribe({

      next: () => {
        this.router.navigate(['/taches']);
      },

      error: (err: HttpErrorResponse) => {

        // Serveur éteint ou inaccessible
        if (err.status === 0) {
          this.erreurs.set({
            message: 'Serveur injoignable, réessayez plus tard'
          });
          return;
        }

        let body = err.error;

      

        this.erreurs.set(
          body ?? { message: 'Une erreur est survenue' }
        );
      }

    });
  }
}