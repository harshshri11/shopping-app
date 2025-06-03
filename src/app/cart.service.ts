// cart.service.ts
import { BehaviorSubject } from 'rxjs';
import { Product } from './models/product.model';
import { Injectable, signal } from '@angular/core';
import { WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);
  cart$ = this.cartSubject.asObservable();
  addToCart(product: Product) {
  this.cartItems.push(product);
  this.cartSubject.next(this.cartItems);
}

removeFromCart(productId: number) {
  this.cartItems = this.cartItems.filter(p => p.id !== productId);
  this.cartSubject.next(this.cartItems); 
}

getCartItems(): Product[] {
    return this.cartItems;
  }
}
