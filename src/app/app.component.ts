// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <header>
      <h1>Ma Boutique Angular</h1>
      <nav>
        <a routerLink="/catalog" routerLinkActive="active">Catalogue</a>
      </nav>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <footer>
      <p>&copy; 2024 - Tous droits réservés</p>
    </footer>
  `,
  styles: [`
    header {
      background: #1976d2;
      color: white;
      padding: 1rem;
      text-align: center;
    }
    nav a {
      color: white;
      margin: 0 1rem;
      text-decoration: none;
    }
    nav a.active {
      font-weight: bold;
      text-decoration: underline;
    }
    footer {
      text-align: center;
      padding: 1rem;
      background: #f5f5f5;
    }
  `]
})
export class AppComponent {}
