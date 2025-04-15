import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import {CommonModule, CurrencyPipe, NgClass, NgForOf} from '@angular/common';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  imports: [
    CurrencyPipe,
    NgClass,
    NgForOf,
    CommonModule
  ],
  standalone: true
})
export class AdminPanelComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    this.orderService.getOrders().subscribe((orders: Order[]) => {
      console.log('Zamówienia z backendu:', orders); // 👈 Dodaj to
      this.orders = orders;
    });
  }

  acceptOrder(orderId: number): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      const updatedOrder: Order = { ...order, accepted: true };
      this.orderService.updateOrder(updatedOrder).subscribe(() => {
        const index = this.orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
          this.orders[index] = updatedOrder;
        }
      });
    }
  }

  deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(orderId).subscribe(() => {
      this.orders = this.orders.filter(o => o.id !== orderId);
    });
  }
}
