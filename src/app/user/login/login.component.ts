import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        // Ici on attend une réponse contenant user et token
        const { user, token } = response;

        // Stocker le token (pour les requêtes futures)
        localStorage.setItem('authToken', token);

        // On peut aussi stocker les infos utilisateur si besoin
        localStorage.setItem('user', JSON.stringify(user));

        // Naviguer vers le profil ou une autre page sécurisée
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        alert("Erreur : " + (err.error?.message || 'Connexion échouée.'));
      }
    });
  }
}


