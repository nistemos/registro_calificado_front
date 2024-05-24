import { Injectable } from '@angular/core';
import { createFolder, deleteFolder, deleteFolderResponse, getFolder, updateFolder } from '../../interfaces/folder';
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

  public createFolder(datos:createFolder, pathPartial: string): Observable<getFolder>{
    if(!this.getToken){
      return new Observable();
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.post<getFolder>(this.path+'/'+pathPartial, datos, { headers }).pipe(
      tap(response => {
      })
    );
  }

  public getFolder(page: number, limit: number, pathPartial: string, program?: number): Observable<getFolder> {
    if (!this.getToken()) {
      return new Observable<getFolder>();
    }
    // Crear los parámetros de la consulta para la página y el límite
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);
    if (program !== undefined && program !== null) {
      params = params.set('program', program.toString());
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get<getFolder>(`${this.path}/${pathPartial}`, { headers, params });
  }


  updateFolder(datos:updateFolder, pathPartial:string): Observable<updateFolder> {
    if (!this.getToken()) {
      return new Observable();
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.put<updateFolder>(`${this.path}/${pathPartial}/${datos.id}`, datos.data, { headers })
  }

  deleteFolder(datos: deleteFolder, pathPartial:string): Observable<deleteFolderResponse> {
    if (!this.getToken()) {
      return new Observable();
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.delete<deleteFolderResponse>(`${this.path}/${pathPartial}/${datos.id}`, { headers })
  }

  path: string = environment.apiUrlBase;
}
