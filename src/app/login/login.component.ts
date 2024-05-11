import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'

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

}
