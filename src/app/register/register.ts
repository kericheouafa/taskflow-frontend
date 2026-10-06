import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormsModule,
    MatFormFieldModule,   // <mat-form-field> et <mat-label>
    MatInputModule,       // matInput
    MatIconModule,        // <mat-icon>
    MatButtonModule       // mat-icon-button
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  hidePassword = signal(true);

togglePassword(event: MouseEvent) {
  this.hidePassword.set(!this.hidePassword());
  event.stopPropagation();
}
  email = '';
  password = '';
  erreurs = signal<Record<string, string>>({});

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.erreurs.set({});
    this.authService.register(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err: HttpErrorResponse) => {
        // Serveur éteint ou injoignable
        if (err.status === 0) {
          this.erreurs.set({ message: 'Serveur injoignable, réessayez plus tard' });
          return;
        }

        // Le back renvoie du JSON, mais Angular le lit en texte
        // (responseType: 'text'), donc on le retransforme en objet
        let body = err.error;
        if (typeof body === 'string') {
          try {
            body = JSON.parse(body);
          } catch {
            body = { message: body };
          }
        }
        this.erreurs.set(body ?? { message: 'Une erreur est survenue' });
      },
    });
  }
}