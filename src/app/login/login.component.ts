import { Component } from '@angular/core';;
import { NgOptimizedImage } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { AuthResult } from '../interfaces/auth';
import { AuthService } from '../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  public AuthLogin!: Observable<AuthResult>

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
      this.AuthService.enviarDatos(formData)
      .subscribe(
        response => {
          // Maneja la respuesta de la API según sea necesario
        }
      );
    }
  }
}
