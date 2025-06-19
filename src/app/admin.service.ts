import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  address?: string;
}

export interface NewUser {
  name: string;
  email: string;
  role: string;
  password: string;  // obligatoire lors de l'ajout
  address?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:3000/api/v1/users'; // adapte si besoin

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    console.log('AdminService: appel getUsers()');
    return this.http.get<User[]>(this.baseUrl);
  }

  addUser(data: NewUser): Observable<User> {
    console.log('AdminService: appel addUser avec données:', data);
    return this.http.post<User>(this.baseUrl, data);
  }

  deleteUser(id: number): Observable<void> {
    console.log(`AdminService: appel deleteUser avec id = ${id}`);
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
