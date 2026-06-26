import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product.model';
import { map, Observable } from 'rxjs';
import { FavoritesService } from '../../../data/favorites.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-modal',
  imports: [CommonModule],
  templateUrl: './product-modal.html',
  styleUrl: './product-modal.css',
})
export class ProductModal {
  @Input() product!: Product;
  @Output() close = new EventEmitter<void>()
  @Output() addToCart = new EventEmitter<Product>()

  isFavorite$: Observable<boolean>;

  constructor(public favoritesService: FavoritesService) {
    this.isFavorite$ = this.favoritesService.favorites$.pipe(
      map((items) => items.some((item) => item.productId === this.product.id))
    );
  }

  onToggleFavorite() {
    this.favoritesService.toggleFavorite(this.product);
  }

  onCloseButton(){
    this.close.emit()
  }

  onAddToCart(){
    this.addToCart.emit(this.product)
  }
}
