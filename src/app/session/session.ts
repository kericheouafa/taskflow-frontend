import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-session',
  imports: [FormsModule, CommonModule, MatButtonModule, RouterModule],
  templateUrl: './session.html',
  styleUrl: './session.css',
})
export class Session {}
