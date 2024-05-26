import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage: string;

      if (error.error instanceof ErrorEvent) {
        // Error de cliente
        errorMessage = `Error: ${error.error.message}`;
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesion',
          text: errorMessage,
        });
      } else {
        // Error de servidor

        if (error.status === 404) {
          errorMessage = `Error: ${error.error.message}`;
          Swal.fire({
            icon: 'error',
            title: 'Error de inicio de sesion',
            text: errorMessage,
          });
        }
        if (error.status === 401) {
          errorMessage = `Usuario y/o Contraseña incorrectos`;
          Swal.fire({
            icon: 'error',
            title: 'Error de inicio de sesion',
            text: errorMessage,
          });
        }
        if (error.status === 409) {
          errorMessage = `La carpeta ya existe`;
          Swal.fire({
            icon: 'error',
            title: 'Error de creación de carpeta',
            text: errorMessage,
          });
        }
        if (error.status === 403) {
          errorMessage = `Accion no autorizada para el usuario`;
          Swal.fire({
            icon: 'error',
            title: 'Error de autorizacion',
            text: errorMessage,
          });
        }
      }
      // Propaga el error para que el componente que hizo la solicitud también lo maneje
      return throwError(() => errorMessage);
    })
  );
};
