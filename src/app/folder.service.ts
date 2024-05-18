import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private foldersSubject = new BehaviorSubject<{ name: string, documents: string[] }[]>([
    { name: 'Programas academicos', documents: [] }
  ]);
  folders$ = this.foldersSubject.asObservable();

  addFolder(folderName: string) {
    const currentFolders = this.foldersSubject.value;
    this.foldersSubject.next([...currentFolders, { name: folderName, documents: [] }]);
  }

  deleteFolder(folderName: string) {
    const currentFolders = this.foldersSubject.value;
    this.foldersSubject.next(currentFolders.filter(folder => folder.name !== folderName));
  }

  addDocumentToFolder(folderName: string, documentName: string) {
    const currentFolders = this.foldersSubject.value;
    const folder = currentFolders.find(folder => folder.name === folderName);
    if (folder) {
      folder.documents.push(documentName);
      this.foldersSubject.next([...currentFolders]);
    }
  }
}
