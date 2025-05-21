import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Configuration du routeur avec les routes définies
    provideRouter(routes),
    
    // Activation du HttpClient pour les requêtes HTTP
    provideHttpClient()
    
    // Vous pourriez ajouter plus tard :
    // - withInterceptors() pour gérer les requêtes
    // - withFetch() pour utiliser l'API Fetch
    // - Autres providers spécifiques
  ]
};

