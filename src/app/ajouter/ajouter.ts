import { Component } from '@angular/core';
import { MatFormField } from "@angular/material/input";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';



@Component({
  selector: 'app-ajouter',
  imports: [MatFormField ,MatSelectModule, MatDatepickerModule , MatInputModule , MatFormFieldModule ],
  templateUrl: './ajouter.html',
  styleUrl: './ajouter.css',
})
export class Ajouter {}
