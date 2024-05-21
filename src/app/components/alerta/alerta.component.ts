import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alerta',
  standalone: true,
  imports: [],
  templateUrl: './alerta.component.html',
  styleUrl: './alerta.component.sass'
})
export class AlertaComponent {
  @Input() message!: string;
}
