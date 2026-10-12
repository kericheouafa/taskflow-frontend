
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ajouter } from './ajouter';
import { TachesService } from '../taches/taches.service';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { provideNativeDateAdapter } from '@angular/material/core';

describe('Ajouter', () => {
  let component: Ajouter;
  let fixture: ComponentFixture<Ajouter>;
  let tachesServiceMock: {
    createTache: ReturnType<typeof vi.fn>;
  };
  let router: Router;

  beforeEach(async () => {
    // Simuler le service pour ne pas appeler le vrai backend
    tachesServiceMock = {
      createTache: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [Ajouter],
      providers: [
         provideNativeDateAdapter(),
        provideRouter([
  { path: 'taches', component: Ajouter }
]),
        { provide: TachesService, useValue: tachesServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Ajouter);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('devrait créer le composant Ajouter', () => {
    // Vérifier que le composant est correctement créé
    expect(component).toBeTruthy();
  });

  it('envoie les données de la tâche au service', () => {
    // 1. Préparer : saisir les données d'une tâche valide
    tachesServiceMock.createTache.mockReturnValue(of({ id: 1 }));

    component.titre = 'Préparer le portfolio';
    component.priorite = 3;
    component.dateLimite = new Date(2026, 9, 20);

    // 2. Agir : déclencher l'ajout
    component.ajouterTache();

    // 3. Vérifier : le service reçoit les bonnes données
    expect(tachesServiceMock.createTache).toHaveBeenCalledWith({
      titre: 'Préparer le portfolio',
      priorite: 3,
      dateLimite: '2026-10-20'
    });
  });

  it('redirige vers les tâches après un ajout réussi', () => {
    // 1. Préparer : simuler un ajout réussi
    tachesServiceMock.createTache.mockReturnValue(of({ id: 1 }));
    const navigateSpy = vi.spyOn(router, 'navigate');

    // 2. Agir : déclencher l'ajout
    component.ajouterTache();

    // 3. Vérifier : l'utilisateur est redirigé vers la liste
    expect(navigateSpy).toHaveBeenCalledWith(['/taches']);
  });

  it('affiche une erreur si le serveur est injoignable', () => {
    // 1. Préparer : simuler une erreur réseau
    tachesServiceMock.createTache.mockReturnValue(
      throwError(() => ({ status: 0 }))
    );

    // 2. Agir : déclencher l'ajout
    component.ajouterTache();

    // 3. Vérifier : un message explicite est affiché
    expect(component.erreurs()).toEqual({
      message: 'Serveur injoignable, réessayez plus tard'
    });
  });

  it('affiche les erreurs renvoyées par le backend', () => {
    // 1. Préparer : simuler une erreur de validation du backend
    const erreursBackend = {
      titre: 'Le titre doit contenir au moins 3 caractères'
    };

    tachesServiceMock.createTache.mockReturnValue(
      throwError(() => ({
        status: 400,
        error: erreursBackend
      }))
    );

    // 2. Agir : déclencher l'ajout
    component.ajouterTache();

    // 3. Vérifier : les erreurs du backend sont conservées
    expect(component.erreurs()).toEqual(erreursBackend);
  });


  //4 ajout sans date
    it("envoie dateLimite à null quand aucune date n'est choisie", () => {
    tachesServiceMock.createTache.mockReturnValue(of({ id: 1 }));

    component.titre = 'Tâche sans date';
    component.priorite = 1;
    component.dateLimite = null;

    component.ajouterTache();

    expect(tachesServiceMock.createTache).toHaveBeenCalledWith({
      titre: 'Tâche sans date',
      priorite: 1,
      dateLimite: null
    });
  });
});