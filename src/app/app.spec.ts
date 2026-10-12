
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { provideRouter } from '@angular/router';
import { AuthService } from './services/auth';
import { InactivityService } from './services/inactivity';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: vi.fn(() => false)
          }
        },
        {
          provide: InactivityService,
          useValue: {
            start: vi.fn()
          }
        }
      ]
    }).compileComponents();
  });

  it('devrait créer le composant App', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

 
});