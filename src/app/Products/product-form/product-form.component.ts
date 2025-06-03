import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../product.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

@Component({
  standalone: true,
  selector: 'app-product-form',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  @Output() formSubmitted = new EventEmitter<Product>();

  
  product: Product = {
    title: '',
    price: 1,
    description: '',
    categoryId: 0,
    images: [],
    id: 0
  };

  newImage = '';

  addImage(): void {
    const trimmed = this.newImage.trim();
    if (trimmed) {
      this.product.images.push(trimmed);
      this.newImage = '';
    }
  }

constructor(private productService: ProductService) {}


onSubmit(): void {
  const { title, description, price, categoryId, images } = this.product;
  if (!title || !description || price <= 0 || categoryId <= 0 || images.length === 0) {
    alert('Please fill out all fields correctly and add at least one image.');
    return;
  }

  this.productService.createProduct(this.product).subscribe({
    next: (res) => {
      console.log('Product added:', res);
      alert('Product successfully added!');
      this.product = {
        title: '',
        price: 1,
        description: '',
        categoryId: 0,
        images: [],
        id: 0
      };
      this.newImage = '';
    },
    error: (err) => {
      alert('Failed to add product.');
      console.error(err);
    }
  });
}
}

