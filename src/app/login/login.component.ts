import { Component } from '@angular/core';;
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../core/services/toast.service';
import { ToastType } from '../interfaces/toast';
import { ToastifyComponent } from '../components/toastify/toastify.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    ToastifyComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  loginForm: FormGroup;
  public errorMessage!: string;
  constructor(private formBuilder: FormBuilder, private AuthService: AuthService, private toast: ToastService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
  }

  getToast() {
    return this.toast.getToast();
  }
  closeToast(){
    this.toast.clearToast();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.AuthService.enviarDatos(formData)
      .subscribe(response=>{
        alert("Inicio de sesion exitoso");
      })
    }
  }
}
