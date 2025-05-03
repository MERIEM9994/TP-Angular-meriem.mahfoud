import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [ProductDetailsComponent, CommonModule], // Assure-toi que ProductDetailsComponent est importé ici
  template: `
    <button (click)="goBack()" class="back-btn">Retour</button>
    <div *ngIf="isLoading" class="loading">Chargement...</div>
    <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
    <app-product-details 
      *ngIf="product && !isLoading" 
      [product]="product">
    </app-product-details>
  `,
  styles: [`
    .back-btn { margin: 1rem; padding: 0.5rem 1rem; cursor: pointer; }
    .loading, .error { text-align: center; padding: 2rem; }
    .error { color: red; }
  `]
})
export class ProductDetailsPageComponent implements OnInit {
  product: any = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.params['id']); // Récupération de l'ID du produit à partir de l'URL
    this.productService.getProduct(productId).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Erreur lors du chargement';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']); // Redirige vers la page d'accueil (catalogue)
  }
}
