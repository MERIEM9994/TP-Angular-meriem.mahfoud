import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartItems.asObservable();

  addToCart(product: Product, quantity: number = 1) {
    const items = this.cartItems.value;
    const index = items.findIndex(item => item.product.id === product.id);

    if (index !== -1) {
      items[index].quantity += quantity;
    } else {
      items.push({ product, quantity });
    }
    this.cartItems.next([...items]);
  }

  removeFromCart(productId: number) {
    const items = this.cartItems.value.filter(item => item.product.id !== productId);
    this.cartItems.next(items);
  }

  updateQuantity(productId: number, quantity: number) {
    const items = this.cartItems.value.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    this.cartItems.next(items);
  }

  clearCart() {
    this.cartItems.next([]);
  }

  getTotal(): number {
    return this.cartItems.value.reduce((total, item) =>
      total + item.product.price * item.quantity, 0);
  }
}
