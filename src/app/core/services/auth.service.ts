import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Auth, AuthResult } from '../../interfaces/auth';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
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
    this.checkToken();
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return this.isLoggedInVar;
  }

  // Método para cerrar sesión
  logout(): void {
    this.isLoggedInVar = false;
    this.localStorageService.clear();
    this.router.navigateByUrl('/');
  }

  saveToLocalStorage(token: string, value: string) {
    this.localStorageService.setItem(token, value);
  }

  retrieveFromLocalStorage(token: string) {
    return this.localStorageService.getItem(token);
  }

  private checkToken(): void {
    const token = this.retrieveFromLocalStorage('token');
    if (token) {
      this.isLoggedInVar = true;
    } else {
      this.isLoggedInVar = false;
    }
  }

  public enviarDatos(datos: Auth): Observable<any> {
    return this.http.post<any>(this.path, datos).pipe(
      tap(response => {
        if (response.status == 200) {
          this.isLoggedInVar = true;
          this.saveToLocalStorage('token', response.data.token);
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: response.mmessage
          });
          this.router.navigateByUrl('/dashboard');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.status === 401) {
          errorMessage = 'Unauthorized user, incorrect password.';
        }
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: errorMessage
        });
        throw error;
      })
    );
  }
}
