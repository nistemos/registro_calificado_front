import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFolder, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { program } from '../../interfaces/folder';
import {NgClass} from '@angular/common';
import { DropdownComponent } from "../dropdown/dropdown.component";
import { SelectionService } from '../../core/services/selection.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-folder',
    standalone: true,
    templateUrl: './folder.component.html',
    styleUrl: './folder.component.sass',
    imports: [FontAwesomeModule, NgClass, DropdownComponent]
})
export class FolderComponent implements OnInit {
  faFolder = faFolder;
  faEllipsisVertical = faEllipsisVertical;
  nameFolder = "PROGRAMAS";
  @Input() program!:program;
  @Input() folder: any;

  constructor(private selectionService: SelectionService, private router: Router){}

  ngOnInit(): void {}

  get selectedProgramId(): number | null {
    return this.selectionService.selectedProgramId;
  }

  selectComponent(id: number): void {
    if (this.selectedProgramId === id) {
      this.selectionService.clearSelection();
    } else {
      this.selectionService.selectComponent(id);
    }
  }

  openComponent(id: number): void {
    // Navegar a la URL con el ID del programa
    this.router.navigate(['dashboard/academic-period', id]);
  }

}
