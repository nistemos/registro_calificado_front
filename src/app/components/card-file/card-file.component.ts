import { Component, Input, OnInit } from '@angular/core';
import { getFile } from '../../interfaces/file';

@Component({
  selector: 'app-card-file',
  standalone: true,
  imports: [],
  templateUrl: './card-file.component.html',
  styleUrl: './card-file.component.sass'
})
export class CardFileComponent {
  @Input() title!:string;
  @Input() file?:getFile[];

  constructor(){}
}
