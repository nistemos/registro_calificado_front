import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { file, getFile, parameterFile } from '../../interfaces/file';
import { environment } from '../../../environments/environment.development';
import { AbstractControl, ValidatorFn } from '@angular/forms';

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

  public uploadFile(formData: FormData, id: number, pathPartial: string): Observable<any>{
    if(!this.getToken){
      return new Observable();
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.post<any>(`${this.path}/${pathPartial}/${id}`, formData, { headers});
  }



  // public maxSizeValidator(maxSize: number): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const file = control.value;
  //     if (file) {
  //       const fileSize = file.size;
  //       // Verificar el tamaño del archivo
  //       if (fileSize > maxSize) {
  //         return { 'fileSizeExceeded': true };
  //       }
  //     }
  //     return null;
  //   };
  // }

  // validateFile(file: File, maxSize: number ): any {
  //   if (file) {
  //     console.log(file.type);

  //     const fileType = file.type;
  //     const fileSize = file.size;

  //     // Verificar el tamaño del archivo
  //      // Verificar el tamaño del archivo
  //     if (fileSize > maxSize) {
  //       return { 'fileSizeExceeded': true };
  //     }

  //     // Verificar el tipo del archivo
  //     if (!this.isTypeAllowed(fileType)) {
  //       return { 'fileTypeNotAllowed': true };
  //     }

  //     // Archivo válido
  //     console.log('El archivo es válido.');
  //   }
  // }

  private isTypeAllowed(fileType: string): boolean {
    return this.allowedTypes.includes(fileType);
  }


  path: string = environment.apiUrlBase;

  private allowedTypes: string[] = [
    'image/jpeg',
    'image/png',
    // 'image/gif',
    'application/pdf',
    'text/plain',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
}
