import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accueil } from './accueil';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { TachesService } from '../taches/taches.service';

describe('Accueil', () => {
  let component: Accueil;
  let fixture: ComponentFixture<Accueil>;
  const tachesServiceMock = {
    getTaches: () => of([]),
    deleteTache: () => of(null),
    updateTache: () => of({}),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accueil],
        providers: [
                provideRouter([]),
                { provide: TachesService, useValue: tachesServiceMock },
              ],
    }).compileComponents();

    fixture = TestBed.createComponent(Accueil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
