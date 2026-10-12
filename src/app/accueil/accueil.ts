import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { TachesService } from '../taches/taches.service';


@Component({
  selector: 'app-accueil',
  imports: [RouterLink, MatButtonModule, RouterModule, DatePipe],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil implements OnInit {

  private tachesService = inject(TachesService);

  taches = signal<any[]>([]);

  nbAFaire = computed(() =>
    this.taches().filter(t => t.statut?.id === 1).length
  );

  nbTerminees = computed(() =>
    this.taches().filter(t => t.statut?.id === 3).length
  );

  nbEnRetard = computed(() =>
    this.taches().filter(t => {
      const jours = this.joursRestants(t);
      return jours !== null && jours < 0;
    }).length
  );

  prochaines = computed(() =>
    this.taches()
      .filter(t => this.joursRestants(t) !== null)
      .sort((a, b) => a.dateLimite.localeCompare(b.dateLimite))
      .slice(0, 3)
  );

  ngOnInit(): void {
    this.tachesService.getTaches().subscribe(taches => this.taches.set(taches));
  }

  estUrgente(tache: any): boolean {
    const jours = this.joursRestants(tache);
    return jours !== null && jours <= 2;
  }

  private joursRestants(tache: any): number | null {
    if (!tache.dateLimite || tache.statut?.id === 3) {
      return null;
    }

    const limite = new Date(tache.dateLimite + 'T00:00:00');
    const aujourdhui = new Date();
    aujourdhui.setHours(0, 0, 0, 0);

    return Math.round((limite.getTime() - aujourdhui.getTime()) / (1000 * 60 * 60 * 24));
  }
}