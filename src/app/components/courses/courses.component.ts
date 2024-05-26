import { Component, OnInit } from '@angular/core';
import { CardFoldersComponent } from "../card-folders/card-folders.component";
import { program } from '../../interfaces/folder';
import { ActivatedRoute } from '@angular/router';
import { FolderService } from '../../core/services/folder.service';

@Component({
    selector: 'app-courses',
    standalone: true,
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.sass',
    imports: [CardFoldersComponent]
})
export class CoursesComponent implements OnInit {
  title: string = 'CURSOS';
  pathPartial = 'courses';
  id!: number;
  courses?: program[];

  constructor(private folderService: FolderService, private route: ActivatedRoute){}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.folderService.getFolder(1, 1000, this.pathPartial, undefined, this.id,).subscribe(response=>{
      this.courses = response.data.courses
    })
  }
}
