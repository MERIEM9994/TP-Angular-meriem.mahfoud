import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-details">
      <img [src]="product.image" 
           [alt]="product.name"
           (error)="handleImageError($event)"
           class="product-image">
      
      <div class="product-info">
        <h2>{{ product.name }}</h2>
        <p><strong>Stock:</strong> {{ product.quantity }} unités</p>
        <p><strong>Prix:</strong> {{ product.price | currency:'EUR' }}</p>
      </div>
    </div>
  `,
  styles: [`
    .product-details { 
      display: flex; 
      gap: 2rem; 
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .product-image { 
      max-width: 300px; 
      max-height: 300px;
      object-fit: contain;
    }
    .product-info { flex: 1; }
  `]
})
export class ProductDetailsComponent {
  @Input() product!: any;

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/imagenotfound.png';
    img.classList.add('error-image');
  }
}

