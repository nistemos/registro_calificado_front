import { Component, Input, OnInit } from '@angular/core';
import { file } from '../../interfaces/file';
import { DropdownComponent } from "../dropdown/dropdown.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileWord, faImage, faFilePdf, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { SelectionService } from '../../core/services/selection.service';

@Component({
    selector: 'app-card-file',
    standalone: true,
    templateUrl: './card-file.component.html',
    styleUrl: './card-file.component.sass',
    imports: [DropdownComponent, FontAwesomeModule]
})
export class CardFileComponent implements OnInit {
  @Input() title!:string;
  @Input() files?:file[];
  @Input() folderName!:string;
  faFileWord = faFileWord;
  faImage = faImage;
  faFilePdf = faFilePdf;
  faFileExcel = faFileExcel
  fileFolder:string = "File";

  constructor(private selectionService: SelectionService){
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.}
  }
  get selectedId(): number | null {
    return this.selectionService.selectedId;
  }

  getFileType(mimeType: string): string {
    const mimeTypes: { [key: string]: string } = {
      'image/jpeg': 'Imagen JPEG',
      'image/png': 'Imagen PNG',
      //'image/gif': 'Imagen GIF',
      'application/pdf': 'Archivo PDF',
      'text/plain': 'Archivo de Texto',
      'application/vnd.ms-excel': 'Archivo Excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Archivo Excel (XLSX)',
      'application/msword': 'Documento Word',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Documento Word (DOCX)',
      // Agrega más MIME types según sea necesario
    };

    return mimeTypes[mimeType] || 'Tipo de archivo desconocido';
  }


}
