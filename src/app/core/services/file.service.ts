import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getFile, parameterFile } from '../../interfaces/file';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getFiles(data:parameterFile, pathPartial: string): Observable<getFile>{
    if (!this.getToken()) {
      return new Observable<getFile>();
    }
    // Crear los parámetros de la consulta para la página y el límite
    let params = new HttpParams().set('folderName', data.folderName);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get<getFile>(`${this.path}/${pathPartial}`, { headers, params });
  }

  path: string = environment.apiUrlBase;

}
