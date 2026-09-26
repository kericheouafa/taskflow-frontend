import { Component } from '@angular/core';
import { MatFormField } from "@angular/material/input";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, MatFormField, MatSelectModule, MatDatepickerModule, MatInputModule, MatFormFieldModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  email: string = '';
  password: string = '';
  erreur: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.erreur = 'Erreur lors de l\'inscription';
      }
    });
  }
}