import { Component, OnInit } from '@angular/core';
import { TacheService } from './tache';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-taches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './taches.html',
  styleUrl: './taches.css'
})
export class Taches implements OnInit {

  taches: any[] = [];

  constructor(private tacheService: TacheService) {
    console.log('composant taches chargé !');
}
  ngOnInit(): void {
    this.tacheService.getTaches().subscribe((data: any[]) => {
        console.log('données reçues:', data);
      this.taches = data;
    }); 
  }
}
