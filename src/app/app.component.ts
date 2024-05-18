import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { FolderComponent } from './folder/folder.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { FolderService } from './folder.service';
import { Observable } from 'rxjs';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgFor, FolderComponent, DocumentListComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [FolderService]
})
export class AppComponent {
  folders$: Observable<{ name: string, documents: string[] }[]>;
  selectedFolder: { name: string, documents: string[] } | null = null;

  constructor(private folderService: FolderService) {
    this.folders$ = this.folderService.folders$;
  }

  addFolder() {
    const folderName = prompt('Ingrese el nombre de la nueva carpeta:');
    if (folderName) {
      this.folderService.addFolder(folderName);
    }
  }

  deleteFolder(folderName: string) {
    this.folderService.deleteFolder(folderName);
    if (this.selectedFolder && this.selectedFolder.name === folderName) {
      this.selectedFolder = null;
    }
  }

  selectFolder(folder: { name: string, documents: string[] }) {
    this.selectedFolder = folder;
  }

  addDocument(documentName: string) {
    if (this.selectedFolder) {
      this.folderService.addDocumentToFolder(this.selectedFolder.name, documentName);
    }
  }
}
