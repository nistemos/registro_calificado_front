import { Component } from '@angular/core';;
import { NgOptimizedImage } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../core/services/toast.service';
import { ToastifyComponent } from '../components/toastify/toastify.component';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';
import { FooterComponent } from '../components/footer/footer.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    ErrorMessageComponent,
    ToastifyComponent,
    FooterComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  loginForm: FormGroup;
  public errorMessage!: string;
  constructor(private formBuilder: FormBuilder, private AuthService: AuthService, private toast: ToastService, private router: Router) {
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
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: response.mmessage
        });
        this.router.navigateByUrl('/dashboard');
      })
    }
  }
}
