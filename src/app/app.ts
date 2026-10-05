import { Component, signal } from '@angular/core';

import { RouterOutlet, NavigationEnd } from "@angular/router";
import { Navbar } from './navbar/navbar';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet , Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 private isAuthPage(url: string): boolean {
    return url.startsWith('/login') || url.startsWith('/register');
  }

  showNavbar = signal(!this.isAuthPage(window.location.pathname));

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => this.showNavbar.set(!this.isAuthPage(e.urlAfterRedirects)));
  }
}