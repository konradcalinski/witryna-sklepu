import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { CurrencyPipe, NgClass, NgForOf } from '@angular/common';
import {OrderService} from '../../services/order.service';
import { Order } from '../../models/order.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [
    CurrencyPipe,
    NgClass,
    NgForOf
  ],
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  isOpen: boolean = false;

  constructor(private cartService: CartService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  getTotal(): number {
    return this.cartService.getTotalPrice();
  }

  toggleCart(): void {
    this.isOpen = !this.isOpen;
  }

  closeCart(): void {
    this.isOpen = false;
  }

  get flattenedCartItems(): CartItem[] {
    const items: CartItem[] = [];
    this.cartItems.forEach(item => {
      const qty = item.quantity || 1;
      for (let i = 0; i < qty; i++) {
        items.push(item);
      }
    });
    return items;
  }
  placeOrder(): void {
    const order: Order = {
      products: this.cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      })),
      accepted: false
    };

    this.orderService.createOrder(order).subscribe(() => {
      alert('Zamówienie złożone!');
      this.cartService.clearCart(); // dodaj, jeśli masz tę metodę
      this.closeCart();
    });
}}
