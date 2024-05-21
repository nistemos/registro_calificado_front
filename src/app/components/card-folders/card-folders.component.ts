import { Component, Input, OnInit } from '@angular/core';
import { FolderComponent } from "../folder/folder.component";
import { program } from '../../interfaces/folder';

@Component({
    selector: 'app-card-folders',
    standalone: true,
    templateUrl: './card-folders.component.html',
    styleUrl: './card-folders.component.sass',
    imports: [FolderComponent]
})
export class CardFoldersComponent implements OnInit {
  @Input() title!:string;
  @Input() programs!:program[];
  dropdownPopoverShow = false;

  ngOnInit(): void {
  }
}
