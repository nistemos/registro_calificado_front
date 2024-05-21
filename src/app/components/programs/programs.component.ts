import { Component, OnInit } from '@angular/core';
import { CardFoldersComponent } from "../card-folders/card-folders.component";
import { FolderService } from '../../core/services/folder.service';
import { program } from '../../interfaces/folder';

@Component({
    selector: 'app-programs',
    standalone: true,
    templateUrl: './programs.component.html',
    styleUrl: './programs.component.sass',
    imports: [CardFoldersComponent]
})
export class ProgramsComponent implements OnInit {
  title: string = 'PROGRAMAS';
  programs!:program[];
  pathPartial = 'programs';

  constructor(private folderService: FolderService){
  }

  ngOnInit() {
    this.folderService.getFolder(1, 1000, this.pathPartial).subscribe(response=>{
      this.programs = response.data.programs;
    })
  }
}
