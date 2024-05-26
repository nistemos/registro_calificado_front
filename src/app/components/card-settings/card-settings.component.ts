import { Component } from '@angular/core';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-card-settings',
  standalone: true,
  imports: [],
  templateUrl: './card-settings.component.html',
  styleUrl: './card-settings.component.sass',
})
export class CardSettingsComponent {
  fullnameDataLogin?: string = 'NombreD';
  roleDataLogin?: string = 'RoleD';
  emailDataLogin?: string = 'EmailD';

  dropdownPopoverShow = false;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.fullnameDataLogin =
      this.localStorageService.getItem('fullnameDataLogin') ?? 'NombreD';

    this.roleDataLogin =
      this.localStorageService.getItem('roleDataLogin') ?? 'RoleD';

    this.emailDataLogin =
      this.localStorageService.getItem('emailDataLogin') ?? 'EmailD';
  }
}
