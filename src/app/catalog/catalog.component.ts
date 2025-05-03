import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router'; // Importer Router
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule], // Assurez-vous que CommonModule est inclus pour *ngIf
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products: any[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private productService: ProductService, private router: Router) {} // Injection du Router

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Erreur lors du chargement des produits';
        this.isLoading = false;
      }
    });
  }

  // Méthode pour afficher les détails du produit
  showDetails(product: any): void {
    console.log('Détails du produit :', product); // Afficher dans la console pour l'instant
    // Naviguer vers une page de détails en passant l'ID du produit
    this.router.navigate(['/product', product.id]); // Assurez-vous que cette route existe
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/imagenotfound.png'; // Image de remplacement en cas d'erreur
    img.classList.add('error-image');
  }
}
