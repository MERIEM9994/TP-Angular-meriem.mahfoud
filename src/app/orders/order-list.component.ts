import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from './order.service';
import { Order, OrderStatus } from './order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data;
    });
  }

  getStatusClass(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.EnCours:
        return 'en-cours';
      case OrderStatus.Expediee:
        return 'expediee';
      case OrderStatus.Livree:
        return 'livree';
      default:
        return '';
    }
  }
}
