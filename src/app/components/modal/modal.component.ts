import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FolderService } from '../../core/services/folder.service';
import { createFolder, deleteFolder, program, updateFolder } from '../../interfaces/folder';
import Swal from 'sweetalert2';
import { FileService } from '../../core/services/file.service';
import { deleteFile, file, updateFile } from '../../interfaces/file';

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
  @Input() folderName!: string;
  @Input() fileArchivo!: file;
  @Output() close = new EventEmitter<void>();
  formFolder!: FormGroup;
  formFile!: FormGroup;
  showCreditos: boolean = false;
  file: boolean = false;
  updateFile!: updateFile;
  deleteFile: deleteFile = {folderName: "", fileName: ""};
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
    if(this.file && this.action === 'update'){
      this.formFile = this.formBuilder.group({
        // folderName: ['', Validators.required], ES EL ID DE LA CARPETA
        oldFileName: [this.fileArchivo.name, Validators.required],
        newFileName: ['', Validators.required],
        //parentFolderId: ['', Validators.required]
      });
    }
    if(this.file && this.action === 'create'){
      this.formFile = this.formBuilder.group({
        file: [null, [Validators.required]],
      });
    }
    if(!this.file && this.action === 'create'){
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

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file) {
        this.formFile.patchValue({
          file: file
        });
      }
    }
  }


  closeModal(): void {
    this.close.emit();
  }

  onSubmit() {

      switch (this.action) {
        case "create":
          if(this.formFolder.valid){
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
          }
          break;
        case "update":
          if(this.formFolder.valid){
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
          }
          break;
        case "delete":
          this.deleteFormData.id = this.program.id;
          console.log(this.deleteFormData);
          this.folderService.deleteFolder(this.deleteFormData, this.pathPartial).subscribe(response=>{
            this.closeModal();
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


  onSubmitFile() {
      switch (this.action) {
        case "create":
          if(this.formFile.valid){
            const formData = new FormData();
            formData.append('file', this.formFile.get('file')?.value);
            this.fileService.uploadFile(formData, this.id, this.pathPartial).subscribe(response => {
              console.log(response);

            });
            Swal.fire({
              icon: 'success',
              title: 'Cargue Exitoso',
              text: 'Archivo Subido Exitosamente'
            });
            this.closeModal();
            this.formFile.reset();
          }
          break;
        case "update":
          if(this.formFile.valid){
            this.updateFile = this.formFile.value;
            this.updateFile.folderName = this.folderName;
            this.updateFile.parentFolderId = "";
            this.fileService.updateFile(this.updateFile, this.pathPartial).subscribe(response => {
              Swal.fire({
                icon: 'success',
                title: 'Modificación Exitosa',
                text: 'Archivo Modificado Exitosamente'
              });
              this.closeModal();
              this.formFile.reset();
            })
          }
          break;
        case "delete":
          this.deleteFile.fileName = this.fileArchivo.name;
          this.deleteFile.folderName = this.folderName;
          console.log(this.deleteFile);

          this.fileService.deleteFile(this.deleteFile, this.pathPartial).subscribe(response => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminación Exitosa',
              text: 'Archivo Eliminado Exitosamente'
            });
            this.closeModal();
            this.formFile.reset();
          });
          break;
        default:
          console.log('Opción no reconocida');
      }
  }
}
