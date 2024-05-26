import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-dashboard-index',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-index.component.html',
  styleUrl: './dashboard-index.component.sass',
})
export class DashboardIndexComponent {
  nameUserLogin?: string = 'Usuario default';

  dropdownPopoverShow = false;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.nameUserLogin =
      this.localStorageService.getItem('fullnameDataLogin') ??
      'Usuario default';
  }
}
