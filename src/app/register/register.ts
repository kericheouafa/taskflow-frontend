import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  email = '';
  password = '';
  erreurs = signal<Record<string, string>>({});

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.erreurs.set({});
    this.authService.register(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err: HttpErrorResponse) => {
          console.log('ERREUR REÇUE :', err.error); 
        let body = err.error;
        if (typeof body === 'string') {
          try { body = JSON.parse(body); } catch { body = { message: body }; }
        }
        this.erreurs.set(body ?? { message: 'Une erreur est survenue' });
      },
    });
  }
}