import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  public listar(page: number, limit: number): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('Token not found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>('http://localhost:3000/users', { headers, params: { page, limit } });
  }

  public eliminarUsuario(id: number): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('Token not found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<any>(`${environment.apiUrlBase}/users/${id}`, { headers });
  }

  public actualizarUsuario(id: number, userData: any): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('Token not found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<any>(`${environment.apiUrlBase}/users/${id}`, userData, { headers });
  }

  public crearUsuario(userData: any): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('Token not found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${environment.apiUrlBase}/users`, userData, { headers });
  }
}
