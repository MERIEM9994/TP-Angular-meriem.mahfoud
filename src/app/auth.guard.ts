import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('userRole');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  if (role !== 'admin') {
    router.navigate(['/']);
    return false;
  }

  return true;
};

