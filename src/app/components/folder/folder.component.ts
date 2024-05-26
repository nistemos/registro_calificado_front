import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFolder, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { program } from '../../interfaces/folder';
import {NgClass} from '@angular/common';
import { DropdownComponent } from "../dropdown/dropdown.component";
import { SelectionService } from '../../core/services/selection.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  currentUrl!: string;
  @Input() program!:program;
  @Input() folder: any;

  constructor(private selectionService: SelectionService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    console.log(this.currentUrl);
  }

  get selectedId(): number | null {
    return this.selectionService.selectedId;
  }

  selectComponent(id: number): void {
    if (this.selectedId === id) {
      this.selectionService.clearSelection();
    } else {
      this.selectionService.selectComponent(id);
    }
  }

  openComponent(id: number): void {
    if(this.currentUrl.startsWith("/dashboard/programs")){
      // Navegar a la URL con el ID del programa
      this.router.navigate(['dashboard/academic-period', id]);
    }
    if(this.currentUrl.startsWith("/dashboard/academic-period/")){
      // Navegar a la URL con el ID del programa
      this.router.navigate(['/dashboard/courses', id]);
    }
  }

}
