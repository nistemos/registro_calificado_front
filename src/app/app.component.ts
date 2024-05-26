import { Component, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit {
  title = 'registro_calificado';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkToken();
  }
}
