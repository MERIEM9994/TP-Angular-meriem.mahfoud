import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

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
  private apiUrl = 'http://localhost:3000/api/v1/products'; // Modifie si nécessaire

  constructor(private http: HttpClient) {}

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

  // ✅ Mise à jour du stock côté backend
  updateProductStock(productId: number, newQuantity: number) {
    return this.http.patch(`${this.apiUrl}/${productId}`, { quantity: newQuantity });
  }

  // ✅ Commande : envoie les mises à jour de stock pour chaque produit
  checkout(): Promise<void> {
    const updates = this.cartItems.value.map(item => {
      const newQty = item.product.quantity - item.quantity;
      return this.updateProductStock(item.product.id, newQty).toPromise();
    });

    return Promise.all(updates)
      .then(() => {
        this.clearCart();
        alert("✅ Merci pour votre commande !");
      })
      .catch(error => {
        console.error("Erreur lors de la mise à jour du stock :", error);
        alert("❌ Une erreur est survenue lors de la commande.");
      });
  }
}

