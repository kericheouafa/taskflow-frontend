import { Component } from '@angular/core';
import { MatFormField } from "@angular/material/input";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { TachesService } from '../taches/taches.service';



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
constructor(private tachesService: TachesService) {}
}
