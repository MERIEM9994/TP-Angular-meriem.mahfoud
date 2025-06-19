import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  address?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/v1/users';  // Endpoint backend
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.currentUserSubject.next(JSON.parse(userData));
    }
  }

  login(credentials: { email: string; password: string }): Observable<{ user: User; token: string }> {
    return this.http.post<{ user: User; token: string }>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => {
        this.setUser(response.user);
        localStorage.setItem('authToken', response.token);  // clé 'authToken' pour correspondre à l'interceptor
      })
    );
  }

  register(data: { name: string; email: string; password: string }): Observable<{ user: User; token: string }> {
    return this.http.post<{ user: User; token: string }>(`${this.baseUrl}/register`, data).pipe(
      tap(response => {
        this.setUser(response.user);
        localStorage.setItem('authToken', response.token);
      })
    );
  }

  setUser(user: User) {
    this.currentUserSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Méthode pour vérifier si l'utilisateur est admin
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }
}

