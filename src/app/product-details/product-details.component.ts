import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadProduct(id);
  }

  loadProduct(id: string): void {
    this.productService.getProductById(+id).subscribe({
      next: (product) => {
        this.product = {
          ...product,
          image: product.image?.trim() || 'placeholder.png'
        };
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Impossible de charger les détails du produit';
        this.loading = false;
        console.error('Erreur:', err);
      }
    });
  }

  getImageUrl(imageName: string): string {
    return `/assets/images/${imageName}?t=${Date.now()}`;
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/images/placeholder.png';
    img.style.opacity = '0.7';
  }
}