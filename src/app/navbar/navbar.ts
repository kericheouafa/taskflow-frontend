import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../services/auth';
import { MatMenu} from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatMenuModule, MatDivider, MatIcon, MatMenu, MatButtonToggleModule, MatButtonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  selected = '';

  constructor(private authService: AuthService, private router: Router) {
    this.selected = this.router.url;

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => (this.selected = e.urlAfterRedirects));
  }

  get email(): string {
    return this.authService.getEmail();
  }

get initiale(): string {
  const local = (this.email.split('@')[0] || '').trim();
  if (!local) return '?';

  // "wafa.keriche" ou "wafa_keriche" -> "WK"
  const parts = local.split(/[._-]+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  // "teststatut" -> "TE"
  return local.slice(0, 2).toUpperCase();
}

  go(url: string) {
    this.router.navigateByUrl(url);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}