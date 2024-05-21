import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFolder, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { program } from '../../interfaces/folder';
import {NgClass} from '@angular/common';
import { DropdownComponent } from "../dropdown/dropdown.component";

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
  folder = "PROGRAMAS";
  @Input() program!:program;

  constructor(){}

  ngOnInit(): void {}

}
