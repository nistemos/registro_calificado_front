import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.sass']
})
export class FolderComponent {
  @Input() folderName!: string;  // Uso del operador '!' para indicar que será asignado después
  @Output() delete = new EventEmitter<string>();
  @Output() select = new EventEmitter<void>();

  onDelete() {
    this.delete.emit(this.folderName);
  }

  onSelect() {
    this.select.emit();
  }
}
