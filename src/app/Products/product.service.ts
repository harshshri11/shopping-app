import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from './product-form/product-form.component';
@Injectable({
  providedIn: 'root'
})


export class ProductService {
  addProduct(product: Product): Observable<any> {
  return this.createProduct(product);
}

  
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    console.log(environment.apiUrl)
    const res = this.http.get(environment.apiUrl);
    console.log(res)
    return res;
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(environment.apiUrl, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${id}`);
  }
}

