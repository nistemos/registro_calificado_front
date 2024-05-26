import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { file, getFile, parameterFile } from '../../interfaces/file';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getFiles(data:parameterFile, pathPartial: string): Observable<{contents: file[]}>{
    if (!this.getToken()) {
      return new Observable<{contents: file[] }>();
    }
    // Crear los parámetros de la consulta para la página y el límite
    let params = new HttpParams().set('folderName', data.folderName);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get<{contents: file[] }>(`${this.path}/${pathPartial}`, { headers, params });
  }

  public getFileType(mimeType: string): string {
    const mimeTypes: { [key: string]: string } = {
      'image/jpeg': 'Imagen JPEG',
      'image/png': 'Imagen PNG',
      'image/gif': 'Imagen GIF',
      'application/pdf': 'Archivo PDF',
      'text/plain': 'Archivo de Texto',
      'application/vnd.ms-excel': 'Archivo Excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Archivo Excel (XLSX)',
      'application/msword': 'Documento Word',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Documento Word (DOCX)',
      // Agrega más MIME types según sea necesario
    };

    return mimeTypes[mimeType] || 'Tipo de archivo desconocido';
  }

  path: string = environment.apiUrlBase;

}
