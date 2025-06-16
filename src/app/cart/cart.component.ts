import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  get total() {
    return this.cartService.getTotal();
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  updateQuantity(id: number, event: Event) {
    const quantity = +(event.target as HTMLInputElement).value;
    this.cartService.updateQuantity(id, quantity);
  }

  clear() {
    this.cartService.clearCart();
  }

  // ✅ La méthode à ajouter :
  order() {
    alert("✅ Merci pour votre commande !");
    this.clear(); // Facultatif : vide le panier après commande
  }
}
