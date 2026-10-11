import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accueil } from './accueil';
import { describe, beforeEach, expect, it } from 'vitest';

describe('Accueil', () => {
  let component: Accueil;
  let fixture: ComponentFixture<Accueil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accueil],
    }).compileComponents();

    fixture = TestBed.createComponent(Accueil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
