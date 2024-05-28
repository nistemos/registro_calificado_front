import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFolder,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { program } from '../../interfaces/folder';
import { NgClass } from '@angular/common';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { SelectionService } from '../../core/services/selection.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-folder',
  standalone: true,
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.sass',
  imports: [FontAwesomeModule, NgClass, DropdownComponent],
})
export class FolderComponent implements OnInit {
  faFolder = faFolder;
  faEllipsisVertical = faEllipsisVertical;
  nameFolder = 'PROGRAMAS';
  showModal: boolean = false;
  currentUrl!: string;
  @Input() program!: program;
  @Input() folder: any;

  constructor(
    private selectionService: SelectionService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url;
  }

  get selectedId(): number | null {
    return this.selectionService.selectedId;
  }

  selectComponent(id: number): void {
    if (this.showModal) {
      return;
    }
    if (this.selectedId === id) {
      this.selectionService.clearSelection();
    } else {
      this.selectionService.selectComponent(id);
    }
  }

  // Método para manejar el cambio de estado del modal
  manejarCambioModal(estado: boolean) {
    this.showModal = estado;
  }

  openComponent(id: number, name: string = ''): void {
    if (this.currentUrl.startsWith('/dashboard/programs')) {
      this.localStorageService.setItem('nameProgram', name);
      // Navegar a la URL con el ID del programa
      console.log({ name });
      this.router.navigate(['dashboard/academic-period', id, { name }]);
    }
    if (this.currentUrl.startsWith('/dashboard/academic-period/')) {
      // Navegar a la URL con el ID del programa
      this.router.navigate([
        '/dashboard/courses',
        id,
        {
          periodName: name,
          programName: this.localStorageService.getItem('nameProgram'),
        },
      ]);

      this.localStorageService.setItem(
        'nameProgram',
        this.localStorageService.getItem('nameProgram') + ' / ' + name
      );
    }
    if (this.currentUrl.startsWith('/dashboard/courses')) {
      // Navegar a la URL con el ID del programa
      this.router.navigate([
        '/dashboard/courses/files',
        id,
        {
          name: this.localStorageService.getItem('nameProgram') + ' / ' + name,
        },
      ]);
    }
  }
}
