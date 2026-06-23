import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItemComponent } from '../../common-ui/cart-item/cart-item';
import { CartService } from '../../data/cart.service';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule, RouterLink, CartItemComponent],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage {
  constructor(public cartService: CartService) { }

  onQuantityChange(event: { productId: number; newQuantity: number }) {
    this.cartService.updateQuantity(event.productId, event.newQuantity);
  }

  onRemove(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  checkout() {
    alert('Заказ оформлен!');
    this.clearCart();
  }
}
