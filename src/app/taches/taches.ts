import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { TachesService } from './taches.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatTableModule } from '@angular/material/table';
import { RouterModule, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';

import {inject} from '@angular/core';

@Component({
  selector: 'app-taches',
  standalone: true,

  imports: [
    RouterLink,
  RouterModule,
  MatIconModule,
  MatInputModule,
  DatePipe,
  MatTableModule,
  MatSortModule,
  MatSelectModule,
  MatButtonModule,
  MatFormFieldModule
],

  templateUrl: './taches.html',
  styleUrl: './taches.css',
})
export class Taches implements OnInit, AfterViewInit {
    private _liveAnnouncer = inject(LiveAnnouncer);

  taches: any[] = [];

  constructor( private tachesService: TachesService,
               private cdr: ChangeDetectorRef ,
                 private router: Router){}
dataSource = new MatTableDataSource<any>([]);



ngOnInit(): void {
   // this.taches = [{ id: 1, titre: 'Test statique', priorite: 1 }];   c'était pour forcer l'affichage
    
    this.tachesService.getTaches().subscribe((data: any[]) => {
        this.taches = data;
        this.dataSource.data = data;
        this.dataSource.filterPredicate = (tache: any, filtre: string) => {
  return filtre === 'tous' || tache.statut?.id === Number(filtre);
};
        this.cdr.detectChanges();
    });
}

supprimerTache(id: number, titre: string): void  {
const confirmation = confirm(
   `Voulez-vous supprimer la tâche "${titre}" ?`
  );
 if (!confirmation) {
    return;
  }
    this.tachesService.deleteTache(id).subscribe(() => {
      
        this.ngOnInit();
    });
}

updateStatut(tache: any, idStatut: number) {

  this.tachesService.updateTache(tache.id, idStatut).subscribe({
    next: (tacheModifiee: any) => {
      // On met à jour la tâche affichée dans le tableau
      tache.statut = tacheModifiee?.statut ?? { ...tache.statut, id: idStatut };

      // On relance le filtre pour que la ligne apparaisse ou disparaisse tout de suite
      this.dataSource.filter = this.filtreActif;
    },
    error: (error: any) => {
      console.error('Erreur lors de la modification du statut', error);
    }
  });

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

estUrgente(tache: any): boolean {
  const jours = this.joursRestants(tache);
  return jours !== null && jours <= 2;
}

estCritique(tache: any): boolean {
  const jours = this.joursRestants(tache);
  return jours !== null && jours > 2 && jours <= 5;
}


filtreActif: string = 'tous';

choisirFiltre(filtre: string) {
  this.filtreActif = filtre;
  this.dataSource.filter = filtre;
}


     
       //le ngOnInit  recharge toute la liste depuis la BDD en temps réel
    //   this.router.navigate(['/taches']); rafraichie la page mais ça garantie pas l'affichage de la nouvelle istance de notrebase

  /** Announce the change in sort state for assistive technology. */
    @ViewChild(MatSort)
set matSort(sort: MatSort | undefined) {
  if (sort) {
    this.dataSource.sort = sort;
  }
}

ngAfterViewInit() {
  this.dataSource.sortingDataAccessor = (item, property) => {
    switch (property) {
      case 'statut':
        return item.statut?.libelle ?? '';
      case 'dateLimite':
        return item.dateLimite
          ? new Date(item.dateLimite).getTime()
          : 0;
      default:
        return item[property];
    }
  };
}
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }



  }
