import { Component, OnInit } from '@angular/core';
import { CardFileComponent } from "../card-file/card-file.component";
import { getFile, parameterFile } from '../../interfaces/file';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../../core/services/file.service';

@Component({
    selector: 'app-file',
    standalone: true,
    templateUrl: './file.component.html',
    styleUrl: './file.component.sass',
    imports: [CardFileComponent]
})
export class FileComponent implements OnInit{
  title: string = 'ARCHIVOS';
  postPartial = 'drive';
  getPartial = this.postPartial+'/list-contents';
  deleteartial = this.postPartial+'/delete-file';
  patchPartial = this.postPartial+'/rename-file';
  parameters: parameterFile = {folderName: "", idCurse: 0, file: ""};
  file?: getFile[];

  constructor(private fileService: FileService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.parameters.folderName = this.route.snapshot.paramMap.get('id')!;
    this.fileService.getFiles(this.parameters, this.getPartial).subscribe(response=>{
      console.log(response);

    })
  }
}
