import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';  
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnChanges {
  @Input() products: any[] = [];
  @Output() delete = new EventEmitter<number>();
  exchangeRates: { USD: number, EUR: number } = { USD: 0, EUR: 0 };
  constructor(private http: HttpClient) {}


  ngOnChanges(changes: SimpleChanges) {
    if (changes['products'] && this.products) {
      this.products = this.products.map(p => ({
        ...p,
        showCurrency: p.showCurrency ?? false  
      }));
    }
  }

  ngOnInit(): void {
    this.fetchExchangeRates();
  }
  fetchExchangeRates(): void {
  this.http.get<any>(environment.currencyApi).subscribe(
    (data) => {
      const rates = data.rates;
      const eurToInr = rates['INR'];
      const eurToUsd = rates['USD'];

      if (eurToInr && eurToUsd) {
        const inrToEur = 1 / eurToInr;
        const inrToUsd = eurToUsd / eurToInr;

        this.exchangeRates = {
          USD: inrToUsd,
          EUR: inrToEur
        };
      } else {
        console.error("INR or USD value not found in exchange data");
      }
    },
    (error) => {
      console.error("Failed to fetch exchange rates:", error);
    }
  );
}

convertCurrency(price: number, toCurrency: 'USD' | 'EUR'): string {
  if (!this.exchangeRates || !this.exchangeRates[toCurrency]) {
    return 'Rate unavailable';
  }
  const converted = price * this.exchangeRates[toCurrency];
  return `${toCurrency} ${converted.toFixed(2)}`;
}


}

