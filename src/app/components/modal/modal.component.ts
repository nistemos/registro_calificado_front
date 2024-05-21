import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  } from '@fortawesome/free-solid-svg-icons';
import { FolderService } from '../../core/services/folder.service';
import { Router } from '@angular/router';
import { deleteFolder, program, updateFolder } from '../../interfaces/folder';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.sass'
})
export class ModalComponent implements OnInit {
  @Input() isOpen:boolean = false;
  @Input() folder!: string;
  @Input() action!: string;
  @Input() program!: program;
  @Input() title!: string;
  @Input() pathPartial!: string;
  @Output() close = new EventEmitter<void>();
  formFolder: FormGroup;
  createFormData!:program;
  updateFormData:updateFolder = { id: 0, data: {name:"", description:""}, status:0 };
  deleteFormData:deleteFolder = { id:0 };
  urlCurrent!: string;
  urlParts!:any;

  constructor(private formBuilder: FormBuilder, private folderService: FolderService, private router: Router){
    this.formFolder = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  ngOnInit() {
    this.formFolder.patchValue(this.program);
    this.urlCurrent = this.router.url;
  // Dividir la URL en partes usando el caracter "/"
  this.urlParts = this.urlCurrent.split('/');
  // Obtener el último segmento de la URL
  this.pathPartial = this.urlParts[this.urlParts.length - 1];
  }

  closeModal(): void {
    this.close.emit();
  }

  onSubmit() {
    if (this.formFolder.valid) {
      switch (this.action) {
        case "create":
          this.createFormData = this.formFolder.value;
          this.folderService.createFolder(this.createFormData, this.pathPartial).subscribe(response=>{
            alert("Carpeta creada exitosamente");
            this.closeModal();
            this.formFolder.reset();
            this.router.navigate(['/dashboard/programs']);
          })
          break;
        case "update":
          this.updateFormData.id = this.program.id;
          this.updateFormData.data = this.formFolder.value;
          this.folderService.updateFolder(this.updateFormData, this.pathPartial).subscribe(response=>{
            alert("Carpeta modificada exitosamente");
            this.closeModal();
            this.formFolder.reset();
          })
          break;
        case "delete":
          this.deleteFormData.id = this.program.id;
          this.folderService.deleteFolder(this.deleteFormData, this.pathPartial).subscribe(response=>{
            alert("Carpeta eliminada exitosamente");
            this.closeModal();
            this.formFolder.reset();
          })
          break;
        default:
          console.log('Opción no reconocida');
      }

    }
  }
}
