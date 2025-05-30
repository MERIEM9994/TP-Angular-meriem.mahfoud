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
      next: (products) => {
        this.products = products.map(p => ({
          ...p,
          quantity: +p.quantity || 0,
          image: p.image?.trim() || 'placeholder.png'
        }));
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Échec du chargement. Vérifiez votre connexion et réessayez.';
        this.loading = false;
        console.error('Erreur:', err);
        setTimeout(() => this.loadProducts(), 3000); // Réessai automatique après 3s
      }
    });
  }

  getImageUrl(imageName: string): string {
    // Solution robuste pour le cache et les images manquantes
    return imageName ? `/assets/images/${imageName}?t=${Date.now()}` : '/assets/images/placeholder.png';
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/images/placeholder.png';
    img.style.opacity = '0.7';
  }

  // Nouvelle méthode unifiée pour le statut du stock
  getStockStatus(quantity: number): {
    cardClass: string;
    stockClass: string;
    label: string;
  } {
    return {
      cardClass: quantity === 0 ? 'out-of-stock' : quantity < 10 ? 'low-stock' : '',
      stockClass: quantity === 0 ? 'out' : quantity < 10 ? 'low' : '',
      label: quantity === 0 ? 'Rupture' : quantity < 10 ? 'Faible' : ''
    };
  }
}

