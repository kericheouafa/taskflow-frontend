import { Component } from '@angular/core';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MatButtonToggleModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {}
