import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './Products/product.service';
import { ProductListComponent } from './Products/product-list/product-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';  // ✅ Add this



export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
  creationAt: string;
  updatedAt: string;
}



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    ProductListComponent,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatSlideToggleModule,
    FormsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    RouterModule,


  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private productService = inject(ProductService);



  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  isLoading = false;
  errorMessage = '';
  newImage: string = '';
  showSearch = false;
  showForm = false;

  constructor(private router: Router,  private cdr: ChangeDetectorRef) {}


  selectedProduct: any = {
  id: null,
  title: '',
  description: '',
  price: null,
  categoryId: null,
  image: ''
};

  title = 'Shopping app';

  ngOnInit() {
    this.fetchProducts();
  }

  
  fetchProducts() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data
        this.filteredProducts = [...this.products];
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = `Failed to load products: ${err.message || err.statusText}`;
        this.isLoading = false;
      }
    });
  }


  toggleSearch() {
  this.showSearch = !this.showSearch;
  if (!this.showSearch) {
    this.searchTerm = '';
    this.filteredProducts = [...this.products];
  }
}


  filterProducts(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredProducts = [...this.products];
      return;
    }
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(term)
    );
  }

  submitForm() {
    if (this.selectedProduct.id) {
      console.log('Update product', this.selectedProduct);
    } else {
      console.log('Add new product', this.selectedProduct);
    }
  }

  
  sortProducts(order: 'high-to-low' | 'low-to-high'): void {
  if (order === 'high-to-low') {
    this.products = [...this.products].sort((a, b) => b.price - a.price);
  } else if (order === 'low-to-high') {
    this.products = [...this.products].sort((a, b) => a.price - b.price);
  }
  console.log(this.products)
  this.cdr.detectChanges();
 }

  goHome() {
    this.router.navigate(['/home']);
  }

  goForm(){
    this.router.navigate(['/form']);
  }

  goToCart(){
    this.router.navigate(['/cart']);
  }

}
