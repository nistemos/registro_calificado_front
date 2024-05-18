import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastifyComponent } from "../components/toastify/toastify.component";
import { ErrorMessageComponent } from "../components/error-message/error-message.component";
import { FooterComponent } from "../components/footer/footer.component";



@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.sass',
    imports: [
        NgOptimizedImage,
        ToastifyComponent,
        ErrorMessageComponent,
        FooterComponent
    ]
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
errorMessage: any;

  onSubmit() {
    throw new Error('Method not implemented.');
    }
}
