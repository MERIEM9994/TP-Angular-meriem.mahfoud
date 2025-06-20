import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../auth.service';
import { Observable, catchError, of } from 'rxjs';

import { OrderService } from '../../orders/order.service';
import { Order } from '../../orders/order.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user$!: Observable<User | null>;
  orders$!: Observable<Order[]>;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.currentUser$;

    // Charger les commandes avec gestion d’erreur
    this.orders$ = this.orderService.getOrders().pipe(
      catchError(err => {
        console.error('Erreur chargement commandes:', err);
        return of([]); // retourner tableau vide si erreur
      })
    );
  }

  editProfile() {
    // TODO: Implémenter la logique de modification du profil
    console.log('Modifier le profil...');
  }
}



