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

  private transformProduct(product: any): Product {
    return {
      id: product.id,
      title: product.name || product.title,
      image: this.getValidImageName(product.image),
      price: product.price,
      quantity: product.quantity || 0,
      description: product.description || 'Description non disponible',
      category: product.category || 'non-catégorisé'
    };
  }

  private getValidImageName(imagePath: string): string {
    const availableImages = [
      'samsung-qled-65.png',
      'apple-airpods-max.png',
      'apple-ipad-pro-12-9.png',
      'iphone-14-pro.png',
      'iphone-15-pro.png',
      'samsung-a53.png',
      'sonyxm5.png',
      'tab.png'
    ];
    
    const fileName = imagePath?.split('/').pop()?.trim() || '';
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
