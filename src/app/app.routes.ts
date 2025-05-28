import { Routes } from '@angular/router';
import { ProductListComponent } from './Products/product-list/product-list.component';
import { ProductFormComponent } from './Products/product-form/product-form.component';
export const routes: Routes = [
    { path: 'home', component: ProductListComponent },
    { path: 'form', component: ProductFormComponent }, 
    { path: '', redirectTo: 'form', pathMatch: 'full' },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
