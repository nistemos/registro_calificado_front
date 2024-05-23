import { Component, Input, OnInit } from '@angular/core';
import { CardFoldersComponent } from "../card-folders/card-folders.component";
import { FolderService } from '../../core/services/folder.service';
import { ActivatedRoute, Router } from '@angular/router';
import { program } from '../../interfaces/folder';

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
  id!: number;
  courses?: program[];

  constructor(private folderService: FolderService, private router: Router, private route: ActivatedRoute){}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.folderService.getFolder(1, 1000, this.pathPartial, this.id).subscribe(response=>{
      this.courses = response.data.courses
    })
  }
}
