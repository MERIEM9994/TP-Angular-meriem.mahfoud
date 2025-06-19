import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartService = inject(CartService);
  cart$ = this.cartService.cart$;
  private router = inject(Router);

  get total() {
    return this.cartService.getTotal();
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  updateQuantity(id: number, event: Event) {
    const quantity = +(event.target as HTMLInputElement).value;
    if (quantity < 1) {
      this.cartService.removeFromCart(id);
    } else {
      this.cartService.updateQuantity(id, quantity);
    }
  }

  clear() {
    this.cartService.clearCart();
  }

  // 🚀 Aller vers la page de paiement
  order() {
    this.router.navigate(['/payment']);
  }

  // Retour au catalogue
  goToCatalog(): void {
    this.router.navigate(['/catalog']);
  }
}



