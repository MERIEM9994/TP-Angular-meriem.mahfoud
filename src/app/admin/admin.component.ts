import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService, User, NewUser } from '../admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = [];

  newUser: NewUser = {
    name: '',
    email: '',
    role: 'user',
    password: ''
  };

  loading = false;
  errorMsg = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    // 🔸 Vérifie si token existe, sinon refuse le chargement
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.errorMsg = 'Non autorisé. Veuillez vous reconnecter.';
      return;
    }

    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.errorMsg = '';
    this.adminService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Erreur lors du chargement des utilisateurs.';
        this.loading = false;
      }
    });
  }

  addUser() {
    this.errorMsg = '';
    if (!this.newUser.name || !this.newUser.email || !this.newUser.password) {
      this.errorMsg = 'Le nom, l\'email et le mot de passe sont obligatoires.';
      return;
    }

    this.adminService.addUser(this.newUser).subscribe({
      next: (user) => {
        this.users.push(user);
        this.newUser = { name: '', email: '', role: 'user', password: '' };
      },
      error: () => {
        this.errorMsg = 'Erreur lors de l\'ajout de l\'utilisateur.';
      }
    });
  }

  deleteUser(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.adminService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
        },
        error: () => {
          this.errorMsg = 'Erreur lors de la suppression de l\'utilisateur.';
        }
      });
    }
  }
}
