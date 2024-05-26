import { Component, OnInit } from '@angular/core';
import { CardFileComponent } from '../card-file/card-file.component';
import { file, getFile, parameterFile } from '../../interfaces/file';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../../core/services/file.service';
import { BreadCrumbsComponent } from '../bread-crumbs/bread-crumbs.component';

@Component({
  selector: 'app-file',
  standalone: true,
  templateUrl: './file.component.html',
  styleUrl: './file.component.sass',
  imports: [CardFileComponent, BreadCrumbsComponent],
})
export class FileComponent implements OnInit {
  title: string = 'ARCHIVOS';
  routeNavigation: string = 'programa/periodo/curso/';
  postPartial = 'drive';
  getPartial = this.postPartial+'/list-contents';
  deletePartial = this.postPartial+'/delete-file';
  patchPartial = this.postPartial+'/rename-file';
  parameters: parameterFile = {folderName: "", idCurse: 0, file: ""};
  files?:file[];

  constructor(
    private fileService: FileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.parameters.folderName = this.route.snapshot.paramMap.get('id')!;
    this.fileService
      .getFiles(this.parameters, this.getPartial)
      .subscribe((response) => {
        this.file = response.contents;
        console.log(this.file);
      });
    this.route.params.subscribe((params) => {
      this.routeNavigation = '/ ' + params['name'] + ' /';
    });
  }
}
