import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FolderService } from '../../core/services/folder.service';
import { createFolder, deleteFolder, program, updateFolder } from '../../interfaces/folder';
import Swal from 'sweetalert2';
import { FileService } from '../../core/services/file.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  @Input() isOpen:boolean = false;
  @Input() folder!: string;
  @Input() action!: string;
  @Input() program!: program;
  @Input() title!: string;
  @Input() pathPartial!: string;
  @Input() id!: number;
  @Output() close = new EventEmitter<void>();
  formFolder!: FormGroup;
  formFile!: FormGroup;
  showCreditos: boolean = false;
  file: boolean = false;
  selectedFile!: File | null;
  createFormData!:createFolder;
  updateFormData:updateFolder = { id: 0, data: {name:"", description:"", program: 0, programsYear: 0, credits:0}, status:0 };
  deleteFormData:deleteFolder = { id:0 };
  fileTypeDescription: string | null = null;

  constructor(private formBuilder: FormBuilder, private folderService: FolderService, private fileService: FileService){
  }

  ngOnInit() {

    this.showCreditos = this.pathPartial === 'courses';
    this.file = this.pathPartial === 'drive';
    if(this.file){
      this.formFile = this.formBuilder.group({
        file: ['', [Validators.required]],
      });
    }else{
      this.formFolder = this.formBuilder.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.maxLength(255)]],
        ...(this.showCreditos && {credits: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]})
      });
      this.formFolder.patchValue(this.program);
    }

  }

  ngOnChanges() {
    if(this.program){
      if(this.action == 'update'){
        this.updateFormData.id = +this.program.id;
      }
    }
  }

  onFileSelected(event: any) {
    const fil: File = event.target.files[0];
    this.selectedFile = fil;
    this.formFile.patchValue({
      file: fil
    });
  }



  closeModal(): void {
    this.close.emit();
  }

  onSubmit() {
    if (this.formFolder.valid) {
      switch (this.action) {
        case "create":
          this.createFormData = this.formFolder.value;
          if(this.pathPartial == "courses"){
            this.createFormData.credits = +this.createFormData.credits;
            this.createFormData.programsYear = +this.id;
          }
          if (this.pathPartial != "courses") this.createFormData.program = +this.id;

          this.folderService.createFolder(this.createFormData, this.pathPartial).subscribe(response=>{
            this.closeModal();
            this.formFolder.reset();
            Swal.fire({
              icon: 'success',
              title: 'Creación Exitosa',
              text: 'Carpeta creada correctamente'
            });
          })
          break;
        case "update":
          this.updateFormData.data = this.formFolder.value;
          if(this.pathPartial == "courses"){
            this.updateFormData.data.credits = +this.updateFormData.data.credits;
            this.updateFormData.data.programsYear = +this.id;
          }
          if (this.pathPartial != "courses") this.updateFormData.data.program = +this.id;
          this.folderService.updateFolder(this.updateFormData, this.pathPartial).subscribe(response=>{
            this.closeModal();
            this.formFolder.reset();
            Swal.fire({
              icon: 'success',
              title: 'Modificación Exitosa',
              text: 'Carpeta modificada correctamente'
            });
          })
          break;
        case "delete":
          this.deleteFormData.id = this.program.id;
          this.folderService.deleteFolder(this.deleteFormData, this.pathPartial).subscribe(response=>{
            this.closeModal();
            this.formFolder.reset();
            Swal.fire({
              icon: 'success',
              title: 'Eliminación Exitosa',
              text: 'Carpeta eliminada correctamente'
            });
          })
          break;
        default:
          console.log('Opción no reconocida');
      }

    }
  }


  onSubmitFile() {
    const fileControl = this.formFile.get('file');

    if (fileControl) {
      const fileValue = fileControl.value;
      if (fileValue) {
        const formData = new FormData();
        formData.append('file', fileValue);
        switch (this.action) {
          case "create":
            this.fileService.uploadFile(formData, +this.id, this.pathPartial).pipe(
              tap(response => {
                Swal.fire({
                  icon: 'success',
                  title: 'Archivo subido exitosamente',
                  text: ''
                });
              }))
            break;
          case "update":
            console.log("Hola mundo Modificar");
            break;
          case "delete":
            console.log("Hola mundo Eliminar");
            break;
          default:
            console.log('Opción no reconocida');
        }
      } else {
        console.error('File control value is null or empty.');
      }
    } else {
      console.error('File control is null.');
    }
  }
}
