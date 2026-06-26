import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FavoriteItem } from '../../models/favorite-item.model';

@Component({
  selector: 'app-favorites-item',
  imports: [CommonModule],
  templateUrl: './favorites-item.html',
  styleUrl: './favorites-item.css',
})
export class FavoritesItem {
  @Input() item!: FavoriteItem;
  @Output() addToCart = new EventEmitter<FavoriteItem>();
  @Output() remove = new EventEmitter<number>();

  onRemove(){
    this.remove.emit(this.item.productId)
  }

  onAddToCart() {
    this.addToCart.emit(this.item);
  }
}
