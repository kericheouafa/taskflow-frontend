
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { AuthService } from '../services/auth';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authServiceMock: { login: ReturnType<typeof vi.fn> };
  let router: Router;

  beforeEach(async () => {
    // Préparer un environnement de test propre
    localStorage.clear();

    // Simuler le service d'authentification sans appeler le backend
    authServiceMock = {
      login: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    // Nettoyer le stockage après chaque test
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('devrait créer le composant Login', () => {
    // Vérifier que le composant est correctement créé
    expect(component).toBeTruthy();
  });

  it('appelle le service avec l’email et le mot de passe saisis', () => {
    // 1. Préparer : simuler une connexion réussie
    authServiceMock.login.mockReturnValue(of('fake-jwt-token'));
    component.email = 'test@test.com';
    component.password = 'motdepasse';

    // 2. Agir : déclencher la connexion
    component.onLogin();

    // 3. Vérifier : le service reçoit les bons identifiants
    expect(authServiceMock.login).toHaveBeenCalledWith(
      'test@test.com',
      'motdepasse'
    );
  });

  it('stocke le token et redirige après une connexion réussie', () => {
    // 1. Préparer : le service renvoie un token JWT fictif
    authServiceMock.login.mockReturnValue(of('fake-jwt-token'));
    const navigateSpy = vi.spyOn(router, 'navigate');

    // 2. Agir : déclencher la connexion
    component.onLogin();

    // 3. Vérifier : le token est stocké et la page d’accueil est ouverte
    expect(localStorage.getItem('token')).toBe('fake-jwt-token');
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('affiche un message si les identifiants sont incorrects', () => {
    // 1. Préparer : simuler une erreur HTTP 401
    authServiceMock.login.mockReturnValue(
      throwError(() => ({ status: 401 }))
    );

    // 2. Agir : déclencher la connexion
    component.onLogin();

    // 3. Vérifier : le message d’erreur est affiché
    expect(component.erreur()).toBe(
      'Email ou mot de passe incorrect'
    );
  });

  it('affiche un message si le serveur est injoignable', () => {
    // 1. Préparer : simuler une erreur réseau
    authServiceMock.login.mockReturnValue(
      throwError(() => ({ status: 0 }))
    );

    // 2. Agir : déclencher la connexion
    component.onLogin();

    // 3. Vérifier : le message informe l’utilisateur du problème
    expect(component.erreur()).toBe(
      'Serveur injoignable, réessayez plus tard'
    );
  });
});