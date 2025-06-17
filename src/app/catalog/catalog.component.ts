import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { CartService } from '../cart/cart.service';

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

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router // <== Ajout du Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = null;

    this.productService.getProducts().subscribe({
      next: (products) => {
        if (!Array.isArray(products) || products.length === 0) {
          this.error = 'Aucun produit disponible';
        } else {
          this.products = products;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement produits:', err);
        this.error = 'Échec du chargement. Vérifiez votre connexion et réessayez.';
        this.loading = false;
        setTimeout(() => this.loadProducts(), 3000);
      }
    });
  }

  getImageUrl(imageName: string): string {
    return `http://localhost:3000/assets/images/${imageName || 'placeholder.png'}`;
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'http://localhost:3000/images/placeholder.png';
    img.style.opacity = '0.7';
  }

  getStockStatus(quantity: number): { cardClass: string; stockClass: string; label: string } {
    return {
      cardClass: quantity === 0 ? 'out-of-stock' : quantity < 10 ? 'low-stock' : '',
      stockClass: quantity === 0 ? 'out' : quantity < 10 ? 'low' : '',
      label: quantity === 0 ? 'Rupture' : quantity < 10 ? 'Stock faible' : ''
    };
  }

  trackById(index: number, product: Product): number {
    return product.id;
  }

  addToCart(product: Product): void {
    if (product.quantity > 0) {
      this.cartService.addToCart(product);
      const confirmed = confirm(`${product.title} a été ajouté au panier 🛒\nSouhaitez-vous consulter votre panier ?`);
      if (confirmed) {
        this.router.navigate(['/cart']);
      }
    } else {
      alert(`Le produit "${product.title}" est en rupture de stock !`);
    }
  }
}



