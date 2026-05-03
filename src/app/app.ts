import { Component } from '@angular/core';
import { Taches } from './taches/taches';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [Taches, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'taskflow-frontend';
}