import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';




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
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
hidePassword = signal(true);

togglePassword(event: MouseEvent) {
  this.hidePassword.set(!this.hidePassword());
  event.stopPropagation();
}
  email: string = '';
  password: string = '';
  erreur = signal('');

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (token: string) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/']);
        
      },
    
       error: (err: HttpErrorResponse) => {
       this.erreur.set(
        err.status === 0
          ? 'Serveur injoignable, réessayez plus tard'
          : 'Email ou mot de passe incorrect'
      );
      },
    });
  }
}