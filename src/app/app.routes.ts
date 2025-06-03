import { Routes } from '@angular/router';
import { ProductListComponent } from './Products/product-list/product-list.component';
import { ProductFormComponent } from './Products/product-form/product-form.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  { path: 'form', component: ProductFormComponent },
  { path: 'cart', component: CartComponent },
  { path: 'home', component: ProductListComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

];
