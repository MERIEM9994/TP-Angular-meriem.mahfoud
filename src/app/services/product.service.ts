import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<{ data: Product[] }>(`${this.apiUrl}/products`).pipe(
      map(response => {
        if (!response || !response.data) {
          throw new Error('Invalid response format');
        }
        return response.data.map(product => this.transformProduct(product));
      }),
      catchError(this.handleError)
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
      map(product => this.transformProduct(product)),
      catchError(this.handleError)
    );
  }

  // === Ajout méthode PATCH pour mise à jour quantité ===
  updateProductQuantity(id: number, quantity: number): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/products/${id}`, { quantity }).pipe(
      map(product => this.transformProduct(product)),
      catchError(this.handleError)
    );
  }

  private transformProduct(product: any): Product {
    return {
      id: product.id,
      title: product.name || 'Sans titre',
      image: this.getValidImageName(product.image),
      price: product.price || 0,
      quantity: product.quantity || 0,
      description: product.description || 'Description non disponible',
      category: product.category || 'non-catégorisé'
    };
  }

  private getValidImageName(imagePath: string): string {
    const availableImages = [
      'samsung-a53.png',
      's22-ultra.jpg',
      's21.png',
      'ipad-air.png',
      'iphone15-pro.png',
      'samsung-tv.png',
      'sony-headphones.png',
      'airpods-max.png',
      'placeholder.png'
    ];

    const fileName = imagePath?.split('/').pop()?.trim() || 'placeholder.png';
    return availableImages.includes(fileName) ? fileName : 'placeholder.png';
  }

  private handleError(error: any): Observable<never> {
    console.error('Erreur API:', error);
    const userMessage = error.error?.message || 
                       error.message || 
                       'Une erreur est survenue. Veuillez réessayer plus tard.';
    return throwError(() => new Error(userMessage));
  }
}

