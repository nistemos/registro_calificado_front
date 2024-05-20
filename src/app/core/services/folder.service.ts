import { Injectable } from '@angular/core';
import { createFolderProgram, getFolder } from '../../interfaces/folder';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  public createFolder(datos:createFolderProgram): Observable<getFolder>{
    return this.http.post<getFolder>(this.path, datos).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }

  public getFolder(page: number, limit: number): Observable<getFolder>{
    if(!this.getToken){
      return new Observable();
    }
    // Crear los parámetros de la consulta para la página y el límite
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get<getFolder>(this.path, { headers, params})
  }

  path: string = environment.apiUrlBase+'/programs';
}
