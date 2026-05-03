import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TachesService } from './taches.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-taches',
  standalone: true,
  imports: [
    CommonModule,
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
    this.tachesService.getTaches().subscribe((data: any[]) => {
      this.taches = data;
    });
  }
}