import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.sass']
})
export class DocumentListComponent {
  @Input() folderName!: string;
  @Input() documents: string[] = [];
  @Output() addDocument = new EventEmitter<string>();

  selectedFile: File | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      // Aquí se puede agregar la lógica para subir el archivo al servidor
      // Por ahora, simplemente lo añadimos a la lista de documentos
      this.addDocument.emit(this.selectedFile.name);
      this.selectedFile = null;
    }
  }
}
