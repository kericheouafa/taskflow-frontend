import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, MatButtonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

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