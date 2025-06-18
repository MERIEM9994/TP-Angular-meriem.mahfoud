import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    const data = { name: this.name, email: this.email, password: this.password };
    this.auth.register(data).subscribe({
      next: () => {
        alert("✅ Inscription réussie !");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert("❌ Erreur : " + (err.error?.message || 'Inscription échouée.'));
      }
    });
  }
}
