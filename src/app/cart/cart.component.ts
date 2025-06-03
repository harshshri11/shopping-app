// cart.component.ts
import { Component, OnInit ,computed} from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatCardModule,CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
  this.cartService.cart$.subscribe(items => this.cartItems = items);
  }
  
  remove(id: number) {
    this.cartService.removeFromCart(id);
  }

}
