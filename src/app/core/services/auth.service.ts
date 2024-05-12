import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = 'localhost:3000/users/login';

  constructor(private http: HttpClient) { }

  public enviarDatos(datos: any): Observable<any> {
    // Establece los encabezados CORS necesarios
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Origin': 'localhost:3000/users/login', // Reemplaza esto con la URL de tu aplicación Angular
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'Content-Type'
    });

    // Envía la solicitud POST a la API
    return this.http.post<any>(this.apiUrl, datos, { headers });
  }
}
