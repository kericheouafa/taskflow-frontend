import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Taches } from './taches';
import { beforeEach, describe, it, expect } from 'vitest';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';


describe('Taches', () => {
  let component: Taches;
  let fixture: ComponentFixture<Taches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Taches, MatSortModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Taches);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
