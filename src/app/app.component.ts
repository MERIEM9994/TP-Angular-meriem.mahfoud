import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // 👉 pour *ngIf, *ngFor etc.
import { RouterModule } from '@angular/router';

import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,  // ✅ pour *ngIf etc.
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public authService: AuthService) {}  // public pour utiliser dans le template
}






