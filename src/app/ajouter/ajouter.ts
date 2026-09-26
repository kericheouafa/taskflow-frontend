
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
  imports: [ FormsModule, MatFormField ,MatSelectModule, MatDatepickerModule , MatInputModule , MatFormFieldModule ],
  templateUrl: './ajouter.html',
  styleUrl: './ajouter.css',
})
export class Ajouter {
titre: string = '';
priorite: number = 1;
dateLimite: Date | null = null;
message: string = '';
constructor(private tachesService: TachesService ,  private router: Router) {}

  
ajouterTache(): void {

  if (this.dateLimite === null) {
    this.message = 'Veuillez choisir une date limite.';
    return;
  }

  const aujourdHui = new Date();

  if (this.dateLimite > aujourdHui) {
    this.message = 'La date limite est valide.';

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
    });

  } 
   if (this.dateLimite <= aujourdHui) {
  this.message = "Veuillez sélectionner une date limite ultérieure à aujourd'hui.";


  } 
  else {
    this.message = 'La date limite doit être dans le futur.';
  }
}}
