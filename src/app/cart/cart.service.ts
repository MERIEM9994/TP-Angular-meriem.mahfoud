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

  private apiProductsUrl = 'http://localhost:3000/api/v1/products';
  private apiOrdersUrl = 'http://localhost:3000/api/v1/orders';

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

  // PATCH pour mise à jour du stock
  updateProductStock(productId: number, newQuantity: number) {
    return this.http.patch(`${this.apiProductsUrl}/${productId}`, { quantity: newQuantity });
  }

  // ✅ Commande complète : envoie vers API /orders + met à jour stock + vide le panier
  async checkout(token: string, customerName: string): Promise<void> {
    const cartItems = this.cartItems.value;

    // 1️⃣ Construction de la commande
    const orderPayload = {
      customerName: customerName,
      totalAmount: this.getTotal(),
      items: cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }))
    };

    try {
      // 2️⃣ POST la commande vers l'API
      await this.http.post(this.apiOrdersUrl, orderPayload, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).toPromise();

      // 3️⃣ PATCH des stocks
      const stockUpdates = cartItems.map(item => {
        const newQty = item.product.quantity - item.quantity;
        return this.updateProductStock(item.product.id, newQty).toPromise();
      });

      await Promise.all(stockUpdates);

      // 4️⃣ Clear le panier
      this.clearCart();

      // 5️⃣ Confirmation
      alert("✅ Merci pour votre commande !");
    } catch (error) {
      console.error("Erreur lors du checkout :", error);
      alert("❌ Une erreur est survenue lors de la commande.");
    }
  }
}
