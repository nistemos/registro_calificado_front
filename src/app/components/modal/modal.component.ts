import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  } from '@fortawesome/free-solid-svg-icons';
import { FolderService } from '../../core/services/folder.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  @Output() close = new EventEmitter<void>();
  formFolder: FormGroup;

  constructor(private formBuilder: FormBuilder, private folderService: FolderService, private router: Router){
    this.formFolder = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  ngOnInit() {
  }

  closeModal(): void {
    this.close.emit();
  }

  onSubmit() {
    if (this.formFolder.valid) {
      const formData = this.formFolder.value;
      this.folderService.createFolder(formData).subscribe(response=>{
        alert("Carpeta creada exitosamente");
        this.closeModal();
        this.formFolder.reset();
        this.router.navigate(['/dashboard/programs']);
      })
    }
  }
}
