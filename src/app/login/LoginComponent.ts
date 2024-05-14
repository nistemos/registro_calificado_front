import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastifyComponent } from "../components/toastify/toastify.component";



@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.sass',
    imports: [
        NgOptimizedImage,
        ToastifyComponent
    ]
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    throw new Error('Method not implemented.');
    }
}
