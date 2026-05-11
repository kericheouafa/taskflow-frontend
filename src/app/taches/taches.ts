import { Component, OnInit } from '@angular/core';

import { TachesService } from './taches.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-taches',
  standalone: true,
  imports: [
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

  constructor(private tachesService: TachesService) {}

  ngOnInit(): void {
     console.log('ngOnInit appelé');  
    this.tachesService.getTaches().subscribe((data: any[]) => {
          console.log('données:', data);
      this.taches = data;
    });
  }
}