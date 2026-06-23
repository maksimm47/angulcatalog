import { Injectable } from '@angular/core';
import { BehaviorSubject, find, map, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>(
    this.loadCartFromStorage()
  );

  private loadCartFromStorage(): CartItem[] {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  }

  private saveCart(items: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items))
    this.cartSubject.next(items)
  }

  private get cartItems(): CartItem[] {
    return [...this.cartSubject.value];
  }

  public cartItems$ = this.cartSubject.asObservable()

  public totalPrice$: Observable<number> = this.cartSubject.pipe(
    map(items => items.reduce((sum, item) => sum + item.price * item.quantity, 0))
  );

  addToCart(product: Product, quantity: number = 1) {
    const items = this.cartItems;
    const existing = items.find(item => item.productId === product.id);
    if (existing) {
      existing.quantity += 1
    }
    else {
      const newItem: CartItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl || '',
        quantity: quantity
      };
      items.push(newItem)
    }
    this.saveCart(items)
  }

  removeFromCart(productId: number) {
    const items = this.cartItems;
    const filteredItems = items.filter(item => item.productId !== productId);
    this.saveCart(filteredItems);
  }

  updateQuantity(productId: number, quantity: number) {
    const items = this.cartItems;
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    else {
      const findItem = items.find(item => item.productId === productId);
      if (findItem) {
        findItem.quantity = quantity
      }
      else {
        throw new Error(`Товар с id ${productId} не найден в корзине`)
      }
      this.saveCart(items)
    }
  }

  clearCart(): void {
    localStorage.removeItem('cart');
    this.cartSubject.next([]);
  }
}
