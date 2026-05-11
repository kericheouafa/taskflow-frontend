import { Component } from '@angular/core';
import { MatFormField } from "@angular/material/input";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TachesService } from '../taches/taches.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-ajouter',
  imports: [FormsModule, MatFormField ,MatSelectModule, MatDatepickerModule , MatInputModule , MatFormFieldModule ],
  templateUrl: './ajouter.html',
  styleUrl: './ajouter.css',
})
export class Ajouter {
titre: string = '';
priorite: number = 1;
dateLimite: Date | null = null;
constructor(private tachesService: TachesService ,  private router: Router) {}

  
ajouterTache(): void {
    const nouvelleTache = {
        titre: this.titre,
        priorite: this.priorite,
        dateLimite: this.dateLimite
    };

    console.log('titre:', this.titre);
    console.log('priorite:', this.priorite);
    console.log('dateLimite:', this.dateLimite);
    
    this.tachesService.createTache(nouvelleTache).subscribe(() => {
        this.router.navigate(['/taches']);
    // on va a la page liste de tâches après l'ajout , on peut le rajouter dans le html c'est la navigation template HTML mais Nooooooo let's make it hard and put in the code , c'est navigatio par code TypeScript comme ça la redirection elle sera après l'ajout :D niceeeee
    });
}
 

}
