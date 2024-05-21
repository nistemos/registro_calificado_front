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

  path: string = environment.apiUrlBase+'/users/login';
  private isLoggedInVar: boolean = false;
  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private router: Router) { }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    // Aquí podrías implementar la lógica para verificar si el usuario está autenticado
    // Podrías verificar si hay un token en el almacenamiento local, por ejemplo
    return this.isLoggedInVar;
  }

  // Método para cerrar sesión
  logout(): void {
    // Aquí podrías implementar la lógica para cerrar sesión
    // Por ejemplo, podrías eliminar el token de autenticación del almacenamiento local y establecer isLoggedInVar en false
    this.isLoggedInVar = false;
    this.localStorageService.clear();
  }

  saveToLocalStorage(token: string, value: string) {
    this.localStorageService.setItem(token, value);
  }

  retrieveFromLocalStorage(token: string) {
    const value = this.localStorageService.getItem(token);
  }

  public enviarDatos(datos: Auth): Observable<any> {
    // Envía la solicitud POST a la API
    return this.http.post<any>(this.path, datos).pipe(
      tap(response => {
        // Si la solicitud de inicio de sesión es exitosa, actualiza el estado de autenticación a true
        if (response.status == 200) { // Verifica si la respuesta es exitosa
          this.isLoggedInVar = true;
          this.saveToLocalStorage('token', response.data.token);
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: response.mmessage // Utilizar 'mmessage' en lugar de 'message'
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
