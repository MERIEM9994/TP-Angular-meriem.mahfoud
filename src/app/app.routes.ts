import { Routes } from '@angular/router';

import { CatalogComponent } from './catalog/catalog.component';
import { ProductDetailsPageComponent } from './product-details-page/product-details-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './auth.guard';

// 👉 On importe aussi PaymentComponent
import { PaymentComponent } from './payment/payment.component';

// 👉 On importe OrderListComponent (suivi des commandes)
import { OrderListComponent } from './orders/order-list.component';

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

  // 👉 Nouvelle route : page paiement
  {
    path: 'payment',
    component: PaymentComponent,
    title: 'Paiement de la commande'
  },

  // 👉 Nouvelle route : suivi des commandes
  {
    path: 'orders',
    component: OrderListComponent,
    title: 'Mes Commandes'
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

  // Route admin
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Administration',
    canActivate: [authGuard]
  },

  // Nouvelle route pour la page d'accueil
  {
    path: '',
    component: HomeComponent,
    title: 'Accueil'
  },

  // Wildcard pour route non trouvée
  {
    path: '**',
    redirectTo: '',
    title: 'Page non trouvée'
  }
];

