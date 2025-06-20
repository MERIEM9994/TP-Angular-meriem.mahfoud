import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Indispensable pour standalone services
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // On récupère le token JWT depuis localStorage avec la clé 'jwt_token'
    const token = localStorage.getItem('jwt_token');
    console.log('AuthInterceptor: token récupéré =', token);

    if (token) {
      // Cloner la requête et ajouter le header Authorization avec Bearer token
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('AuthInterceptor: header Authorization ajouté');
      return next.handle(clonedReq);
    }

    // Si pas de token, on laisse passer la requête telle quelle
    console.log('AuthInterceptor: pas de token, envoi de la requête originale');
    return next.handle(req);
  }
}




