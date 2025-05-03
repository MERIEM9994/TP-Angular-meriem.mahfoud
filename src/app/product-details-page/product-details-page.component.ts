import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [CommonModule, ProductDetailsComponent],
  template: `
    <ng-container *ngIf="product; else notFound">
      <app-product-details [product]="product"></app-product-details>
    </ng-container>
    <ng-template #notFound>
      <p>Produit introuvable. Veuillez revenir au <a routerLink="/">catalogue</a>.</p>
    </ng-template>
  `,
})
export class ProductDetailsPageComponent {
  product: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.product = this.router.getCurrentNavigation()?.extras.state?.['product'];
  }
}


