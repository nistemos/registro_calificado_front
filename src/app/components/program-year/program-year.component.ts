import { Component, OnInit } from '@angular/core';
import { CardFoldersComponent } from "../card-folders/card-folders.component";
import { FolderService } from '../../core/services/folder.service';

@Component({
    selector: 'app-program-year',
    standalone: true,
    templateUrl: './program-year.component.html',
    styleUrl: './program-year.component.sass',
    imports: [CardFoldersComponent]
})
export class ProgramYearComponent implements OnInit {
  title: string = 'PERIODO ACADEMICO';
  pathPartial = 'program-years';

  constructor(private folderService: FolderService){}

  ngOnInit() {
    this.folderService.getFolder(1, 1000, this.pathPartial, 2).subscribe(response=>{
      console.log(response);
    })
  }
}
