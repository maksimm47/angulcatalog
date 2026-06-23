import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cart-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  imports: [CommonModule],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() quantityChange = new EventEmitter<{ productId: number; newQuantity: number }>();
  @Output() remove = new EventEmitter<number>();

  onIncrease() {
    const newQty = this.item.quantity + 1;
    this.quantityChange.emit({ productId: this.item.productId, newQuantity: newQty });
  }

  onDecrease() {
    const newQty = this.item.quantity - 1;
    this.quantityChange.emit({ productId: this.item.productId, newQuantity: newQty });
  }

  onRemove() {
    this.remove.emit(this.item.productId);
  }
}
