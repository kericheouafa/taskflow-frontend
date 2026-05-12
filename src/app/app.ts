import { Component } from '@angular/core';
import { Taches } from './taches/taches';
import { RouterOutlet } from "@angular/router";
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [Taches, RouterOutlet , Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'taskflow-frontend';
}