import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        console.log('Produits reçus:', response.data); // Debug
        this.products = response.data.map(product => ({
          ...product,
          // Normalise le nom de l'image
          image: product.image.toLowerCase().replace(/\s+/g, '-')
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.error = 'Erreur de chargement';
        this.loading = false;
      }
    });
  }

  getImageUrl(imageName: string): string {
    // Ajoute un timestamp pour éviter le cache
    return `assets/images/${imageName}?t=${Date.now()}`;
  }

  handleImageError(event: Event, product: Product): void {
    const img = event.target as HTMLImageElement;
    console.warn(`Image manquante: ${product.image}`);
    img.src = 'assets/images/placeholder.png';
    img.style.opacity = '0.7';
  }

  getStockStatus(quantity: number): string {
    if (quantity === 0) return 'rupture';
    if (quantity < 10) return 'faible';
    return 'ok';
  }
}