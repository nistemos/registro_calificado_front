import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-card-profile',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './card-profile.component.html',
  styleUrl: './card-profile.component.sass',
})
export class CardProfileComponent {
  fullnameDataLogin?: string = 'NombreD';
  roleDataLogin?: string = 'RoleD';

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.fullnameDataLogin =
      this.localStorageService.getItem('fullnameDataLogin') ?? 'NombreD';

    this.roleDataLogin =
      this.localStorageService.getItem('roleDataLogin') ?? 'RoleD';
  }
}
