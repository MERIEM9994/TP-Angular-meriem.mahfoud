import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { CartService } from '../cart/cart.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  loading = true;
  error: string | null = null;

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadProduct(id);
  }

  loadProduct(id: string): void {
    this.loading = true;
    this.error = null;
    this.productService.getProductById(+id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Impossible de charger les détails du produit';
        this.loading = false;
      }
    });
  }

  getImageUrl(imageName: string): string {
    return `http://localhost:3000/images/${imageName || 'placeholder.png'}`;
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'http://localhost:3000/images/placeholder.png';
  }

  ajouterAuPanier(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, 1);
      alert(`${this.product.title} a été ajouté au panier.`);
    }
  }
}
