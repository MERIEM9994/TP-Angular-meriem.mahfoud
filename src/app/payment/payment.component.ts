import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  private cartService = inject(CartService);
  private router = inject(Router);

  mode: 'card' | 'cash' | null = 'card';
  paymentDone = false;
  customerName: string = '';

  selectMode(mode: 'card' | 'cash') {
    this.mode = mode;
    this.paymentDone = false;
  }

  async submitCard() {
    await this.processPayment();
  }

  async submitCash() {
    await this.processPayment();
  }

  private async processPayment() {
    if (!this.customerName.trim()) {
      alert("Veuillez entrer votre nom.");
      return;
    }

    // Récupération du token JWT avec la clé uniforme 'jwt_token'
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      alert("❌ Utilisateur non connecté.");
      this.router.navigate(['/login']);
      return;
    }

    try {
      await this.cartService.checkout(token, this.customerName.trim());
      this.paymentDone = true;
    } catch (err) {
      console.error("Erreur lors du paiement:", err);
      alert("❌ Une erreur est survenue.");
    }
  }

  backToCatalog() {
    this.router.navigate(['/catalog']);
  }
}



