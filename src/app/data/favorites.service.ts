import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FavoriteItem } from '../models/favorite-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoriteSubject = new BehaviorSubject<FavoriteItem[]>(
    this.loadFromStorage()
  )

  private loadFromStorage(): FavoriteItem[]{
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  }

  private saveFavorites(items: FavoriteItem[]){
    localStorage.setItem('favorites', JSON.stringify(items))
    this.favoriteSubject.next(items)
  }

  private get favoriteItems(): FavoriteItem[]{
    return [...this.favoriteSubject.value]
  }

  public favorites$ = this.favoriteSubject.asObservable()

  addToFavorites(product: Product){
    const items = this.favoriteItems;
    const existing = items.find(item => item.productId === product.id);
    if (existing){
      return
    }
    else{
      const newItem: FavoriteItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl || ''
      };
      items.push(newItem);
    }
    this.saveFavorites(items);
  }

  removeFromFavorites(productId: number){
    const items = this.favoriteItems;
    const filteredItems = items.filter(item => item.productId !== productId);
    this.saveFavorites(filteredItems);
  }

  toggleFavorite(product: Product){
    if(this.isFavorite(product.id)){
      this.removeFromFavorites(product.id);
    }
    else{
      this.addToFavorites(product);
    }
  }

  isFavorite(productId: number): boolean{
    return this.favoriteSubject.value.some(item => item.productId === productId);
  }

}

