import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductDetailsPageComponent } from './product-details-page/product-details-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component'; // ✅ Import du composant panier

export const routes: Routes = [
  { 
    path: 'products/:id',
    component: ProductDetailsPageComponent,
    children: [
      { 
        path: '', 
        component: ProductDetailsComponent,
        title: 'Détails du produit' // Ajout de title pour l'accessibilité
      }
    ]
  },
  { 
    path: 'catalog', 
    component: CatalogComponent,
    title: 'Catalogue' 
  },
  { 
    path: 'cart', 
    component: CartComponent,
    title: 'Mon Panier' 
  },
  { 
    path: '', 
    redirectTo: '/catalog', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: '/catalog',
    title: 'Page non trouvée' 
  }
];

