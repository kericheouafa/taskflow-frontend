import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonToggleModule, MatButtonModule, RouterModule],
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

  go(url: string) {
    this.router.navigateByUrl(url);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}