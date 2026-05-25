import { Component } from '@angular/core';
import { Taches } from './taches/taches';
import { RouterOutlet } from "@angular/router";
import { Navbar } from './navbar/navbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Taches, RouterOutlet , Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
   constructor(private router: Router) {}

  title = 'taskflow-frontend';
  showNavbar(): boolean {
    return this.router.url !== '/login';
  }
}