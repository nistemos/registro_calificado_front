import { Component, Input, OnInit } from '@angular/core';
import { CardFoldersComponent } from '../card-folders/card-folders.component';
import { FolderService } from '../../core/services/folder.service';
import { ActivatedRoute } from '@angular/router';
import { program } from '../../interfaces/folder';
import { BreadCrumbsComponent } from '../bread-crumbs/bread-crumbs.component';

@Component({
  selector: 'app-program-year',
  standalone: true,
  templateUrl: './program-year.component.html',
  styleUrl: './program-year.component.sass',
  imports: [CardFoldersComponent, BreadCrumbsComponent],
})
export class ProgramYearComponent implements OnInit {
  title: string = 'PERIODO ACADEMICO';
  routeNavigation: string = 'programa/';
  pathPartial = 'program-years';
  id!: number;
  academicPeriod?: program[];

  constructor(
    private folderService: FolderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.folderService
      .getFolder(1, 1000, this.pathPartial, this.id)
      .subscribe((response) => {
        this.academicPeriod = response.data.courses;
      });
  }
}
