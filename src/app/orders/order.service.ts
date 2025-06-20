import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order, OrderStatus } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // Données simulées localement
  private orders: Order[] = [
    { id: 1, customerName: 'Alice', date: new Date('2025-06-15'), status: OrderStatus.EnCours, totalAmount: 149.99 },
    { id: 2, customerName: 'Bob', date: new Date('2025-06-12'), status: OrderStatus.Expediee, totalAmount: 299.50 },
    { id: 3, customerName: 'Charlie', date: new Date('2025-06-10'), status: OrderStatus.Livree, totalAmount: 89.00 }
  ];

  constructor() {}

  /** Retourne la liste des commandes (simulé) */
  getOrders(): Observable<Order[]> {
    // Ici, tu pourrais remplacer par un vrai appel HTTP plus tard
    return of(this.orders);
  }

  /** Recherche une commande par son ID */
  getOrderById(id: number): Observable<Order | undefined> {
    const order = this.orders.find(o => o.id === id);
    return of(order);
  }
}
