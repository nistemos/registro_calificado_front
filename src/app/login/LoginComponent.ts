import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  const loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
}
