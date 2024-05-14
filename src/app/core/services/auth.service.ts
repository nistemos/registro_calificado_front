import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Auth, AuthResult } from '../../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  path: string = environment.apiUrlBase+'/users/login';
  constructor(private http: HttpClient) { }

  public enviarDatos(datos: Auth): Observable<AuthResult> {
    // Establece los encabezados CORS necesarios
    // Envía la solicitud POST a la API
    return this.http.post<AuthResult>(this.path, datos);
  }
}
