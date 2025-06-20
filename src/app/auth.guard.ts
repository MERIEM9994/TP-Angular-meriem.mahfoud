import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  // Utilisation de la clé unique 'jwt_token' pour le token JWT
  const token = localStorage.getItem('jwt_token');
  const role = localStorage.getItem('userRole');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // Ici on vérifie que le rôle est admin (adapter selon besoins)
  if (role !== 'admin') {
    router.navigate(['/']);
    return false;
  }

  return true;
};
