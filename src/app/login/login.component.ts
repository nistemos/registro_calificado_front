import { Component } from '@angular/core';;
import { NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Auth } from '../interfaces/auth';
import { AuthService } from '../core/services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  loginForm: FormGroup;
  emailError: string = '';
  public AuthLogin!: Observable<Auth>

  constructor(private formBuilder: FormBuilder, private AuthService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log(formData);

      this.AuthService.enviarDatos(formData)
        .pipe(
          catchError(error => {
            if (error.error instanceof ErrorEvent) {
              // Error del lado del cliente
              console.error('Error del lado del cliente:', error.error.message);
            } else {
              // Error del lado del servidor
              console.error('Error del lado del servidor:', error.status, error.error);
            }
            return throwError(error); // Reenvía el error
          })
        )
        .subscribe(response => {
          // Maneja la respuesta de la API según sea necesario
          console.log('Respuesta de la API:', response);
        });
    }
  }
}
