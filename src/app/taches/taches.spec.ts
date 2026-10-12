import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Taches } from './taches';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { TachesService } from './taches.service';

describe('Taches', () => {
  let component: Taches;
  let fixture: ComponentFixture<Taches>;

     //on FIGE la date à aujourd'huit (date de création de ce spec apres que le teste est bien passé)
       beforeEach(() => {
      vi.useFakeTimers({ toFake: ['Date'] });
      vi.setSystemTime(new Date('2026-10-12T10:00:00'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

  const tachesServiceMock = {
    getTaches: () => of([]),
    deleteTache: () => of(null),
    updateTache: () => of({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Taches, MatSortModule],
      providers: [
        provideRouter([]),
        { provide: TachesService, useValue: tachesServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Taches);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


    describe('estUrgente', () => {

   
    it('est faux pour une tâche sans date', () => {
      // 1. Préparer : une tâche sans date limite
      const tache = { id: 1, titre: 'Test', dateLimite: null, statut: { id: 1 } };

      // 2. Agir : appeler la méthode
      const resultat = component.estUrgente(tache);

      // 3. Vérifier : le résultat doit être false
      expect(resultat).toBe(false);
    });
    
    it('est faux pour tache terminée',() => {

   
      // 1 préparer la tâche terminé 
      const tache ={id: 1 , titre : 'Tache',dateLimite: '2026-10-01' , statut: {id: 3}};
      //2 appeler la méthode
      const resultat = component.estUrgente(tache);
      //3 vérifier resultat
      expect (resultat).toBe(false);
      
    }

  
  );
      it('est vrai quand l\'échéance est dépassée', () => {
      // on est le 12/10/2026, l'échéance était le 09/10
      const tache = { id: 1, titre: 'Test', dateLimite: '2026-10-09', statut: { id: 1 } };

      const resultat = component.estUrgente(tache);

      expect(resultat).toBe(true);
    });
        it.each([
      ["l'échéance est aujourd'hui", '2026-10-12', true],
      ["l'échéance est dans 2 jours", '2026-10-14', true],
      ["l'échéance est dans 3 jours", '2026-10-15', false],
      ["l'échéance est dans 10 jours", '2026-10-22', false],
    ])('quand %s', (_nom, date, attendu) => {
      const tache = { id: 1, titre: 'Test', dateLimite: date, statut: { id: 1 } };

      expect(component.estUrgente(tache)).toBe(attendu);
    });


    // une tâche terminée dont l'échéance est dépassée doit rester non urgente.
      it('est faux quand la tâche terminé et échéance dépassée  ', () => {
      // on est le 12/10/2026, l'échéance était le 09/10
      const tache = { id: 1, titre: 'Test', dateLimite: '2026-10-09', statut: { id: 3 } };

      const resultat = component.estUrgente(tache);

      expect(resultat).toBe(false);
    });

  });




    describe('estCritique', () => {
   //statut null
    it('ne plante pas pour une tâche sans statut', () => {
      const tache = { id: 1, titre: 'Test', dateLimite: '2026-10-16' };

      expect(component.estCritique(tache)).toBe(true);
    });

    //une tâche terminée dont l'échéance se situe dans 3 à 5 jours doit rester non critique.
    it('est faux quand la tâche terminé et échéance entre 3 et 5 jours  ', () => {
      // on est le 12/10/2026, l'échéance entre 3 et 5  jours le :16
      const tache = { id: 1, titre: 'Test', dateLimite: '2026-10-16', statut: { id: 3 } };

      const resultat = component.estCritique(tache);

      expect(resultat).toBe(false);
    }); 

///////////
    it.each([
      ["l'échéance est dépassée", '2026-10-09', false],
      ["l'échéance est dans 2 jours", '2026-10-14', false],
      ["l'échéance est dans 3 jours", '2026-10-15', true],
      ["l'échéance est dans 5 jours", '2026-10-17', true],
      ["l'échéance est dans 6 jours", '2026-10-18', false],
    ])('quand %s', (_nom, date, attendu) => {
      const tache = { id: 1, titre: 'Test', dateLimite: date, statut: { id: 1 } };

      expect(component.estCritique(tache)).toBe(attendu);
    });

    it('est faux pour une tâche terminée', () => {
      const tache = { id: 1, titre: 'Test', dateLimite: '2026-10-16', statut: { id: 3 } };

      expect(component.estCritique(tache)).toBe(false);
    });

    it('est faux pour une tâche sans date', () => {
      const tache = { id: 1, titre: 'Test', dateLimite: null, statut: { id: 1 } };

      expect(component.estCritique(tache)).toBe(false);
    });

  });
});