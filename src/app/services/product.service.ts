import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'; // Import manquant ajouté ici
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly apiUrl = 'http://localhost:3000/api/v1'; // Correspond à la version de l'API

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<{ data: Product[] }>(`${this.apiUrl}/products`).pipe(
      map(response => this.transformProducts(response.data)),
      catchError(this.handleError)
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
      map(product => this.transformProduct(product)),
      catchError(this.handleError)
    );
  }

  private transformProducts(products: Product[]): Product[] {
    return products.map(product => this.transformProduct(product));
  }

  private transformProduct(product: Product): Product {
    return {
      ...product,
      quantity: product.quantity || 0,
      image: product.image?.trim() || 'placeholder.png',
      // Ajoutez d'autres transformations si nécessaire
    };
  }

  private handleError(error: any): Observable<never> {
    console.error('Erreur API:', error);
    const userMessage = error.error?.message || 
                       error.message || 
                       'Une erreur est survenue. Veuillez réessayer plus tard.';
    return throwError(() => new Error(userMessage));
  }
}