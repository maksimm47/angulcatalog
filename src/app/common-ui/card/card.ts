import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() product!: Product;
  @Output() productButton = new EventEmitter<Product>();
  @Output() cartButton = new EventEmitter<Product>();
  
  onProductButton() {
    this.productButton.emit(this.product);
  }

  onCartButton() {
    this.cartButton.emit(this.product);
  }
}
