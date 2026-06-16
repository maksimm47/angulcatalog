import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  standalone: true,
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() product!: Product;
  @Output() productButton = new EventEmitter<Product>();
  
  onProductButton() {
    this.productButton.emit(this.product);
  }
}
