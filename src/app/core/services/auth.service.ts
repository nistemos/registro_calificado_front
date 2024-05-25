import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Auth, AuthResult } from '../../interfaces/auth';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  path: string = environment.apiUrlBase + '/users/login';
  private isLoggedInVar: boolean = false;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return this.isLoggedInVar;
  }

  // Método para cerrar sesión
  logout(): void {
    this.isLoggedInVar = false;
    this.localStorageService.clear();
    Swal.fire({
      icon: 'success',
      title: 'Cierre de sesión exitoso',
      text: ""
    });
    this.router.navigateByUrl('/');
  }

  saveToLocalStorage(token: string, value: string) {
    this.localStorageService.setItem(token, value);
  }

  retrieveFromLocalStorage(token: string) {
    return this.localStorageService.getItem(token);
  }

  checkToken(): boolean {
    const token = this.retrieveFromLocalStorage('token');
    if (token) {
      this.isLoggedInVar = true;
    } else {
      this.isLoggedInVar = false;
    }
    return this.isLoggedInVar;
  }

  public enviarDatos(datos: Auth): Observable<AuthResult> {
    return this.http.post<AuthResult>(this.path, datos).pipe(
      tap(response => {
        if (response.status == 200) {
          this.isLoggedInVar = true;
          this.saveToLocalStorage('token', response.data.token);
        }
      })
    );
  }
}
