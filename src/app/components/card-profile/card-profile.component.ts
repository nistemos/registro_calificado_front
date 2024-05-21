import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-card-profile',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './card-profile.component.html',
  styleUrl: './card-profile.component.sass'
})
export class CardProfileComponent {

}
