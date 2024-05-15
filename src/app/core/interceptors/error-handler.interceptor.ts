import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(
      (error: HttpErrorResponse) => {
        let errorMessage: string;

        if (error.error instanceof ErrorEvent) {
          // Error de cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Error de servidor
          alert(error.error.message);
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        // Propaga el error para que el componente que hizo la solicitud también lo maneje
        return throwError(()=>errorMessage);
      }
    )
  )
};
