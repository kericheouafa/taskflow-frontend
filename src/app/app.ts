import { Component } from '@angular/core';
import { Taches } from './taches/taches';

@Component({
  selector: 'app-root',
  imports: [Taches],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'taskflow-frontend';
}