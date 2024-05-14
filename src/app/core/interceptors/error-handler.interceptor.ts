import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    catchError(
      (error: HttpErrorResponse) => {
        let errorMessage: string;
        let title: string = 'Inicio de sessión exitoso';
        if (error.error instanceof ErrorEvent) {
          // Error de cliente
          errorMessage = `Error: ${error.error.message}`;
          title = 'Error';
        } else {
          // Error de servidor
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          title = 'Error';
        }
        if (error.status === 404) {
          console.log("Hola mundo");

        }

        // Propaga el error para que el componente que hizo la solicitud también lo maneje
        return throwError(()=>errorMessage);
      }
    )
  )
};
