import { Component} from '@angular/core';
import { FavoritesItem } from "../../common-ui/favorites-item/favorites-item";
import { FavoritesService } from '../../data/favorites.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FavoriteItem } from '../../models/favorite-item.model';
import { CartService } from '../../data/cart.service';


@Component({
  selector: 'app-favorite-page',
  imports: [FavoritesItem, RouterLink, CommonModule],
  templateUrl: './favorite-page.html',
  styleUrl: './favorite-page.css',
})
export class FavoritePage {
  public favoriteItems$: Observable<FavoriteItem[]>;

  constructor(
    public favoritesService: FavoritesService,
    public cartService: CartService
  ) {
    this.favoriteItems$ = this.favoritesService.favorites$;
  }

  onRemove(productId: number) {
    this.favoritesService.removeFromFavorites(productId);
  }

  onAddToCart(item: FavoriteItem) {
    this.cartService.addToCart({
      id: item.productId,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl || '',
    });
    this.favoritesService.removeFromFavorites(item.productId);
    alert('Товар добавлен в корзину!');
  }
}

