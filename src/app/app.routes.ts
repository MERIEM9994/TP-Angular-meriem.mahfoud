import { Routes } from '@angular/router';

import { CatalogComponent } from './catalog/catalog.component';
import { ProductDetailsPageComponent } from './product-details-page/product-details-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';

export const routes: Routes = [
  {
    path: 'products/:id',
    component: ProductDetailsPageComponent,
    children: [
      {
        path: '',
        component: ProductDetailsComponent,
        title: 'Détails du produit'
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

  // Routes d'authentification et profil
  {
    path: 'login',
    component: LoginComponent,
    title: 'Connexion'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Inscription'
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    title: 'Profil utilisateur'
  },

  // Route par défaut
  {
    path: '',
    redirectTo: '/catalog',
    pathMatch: 'full'
  },

  // Wildcard pour route non trouvée
  {
    path: '**',
    redirectTo: '/catalog',
    title: 'Page non trouvée'
  }
];
