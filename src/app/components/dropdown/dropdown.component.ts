import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { createPopper } from "@popperjs/core";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { program } from '../../interfaces/folder';
import { ModalComponent } from "../modal/modal.component";

@Component({
    selector: 'app-dropdown',
    standalone: true,
    templateUrl: './dropdown.component.html',
    styleUrl: './dropdown.component.sass',
    imports: [FontAwesomeModule, ModalComponent, RouterModule]
})
export class DropdownComponent implements OnInit {
  @Input() program!:program;
  @Input() folder!: string;
  action!: string;
  pathPartial!: string;
  isModalOpen = false;
  faEllipsisVertical = faEllipsisVertical;
  dropdownPopoverShow = false;
  id!: number;
  urlParts: any;
  @ViewChild("btnDropdownRef", { static: false })
  btnDropdownRef!: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef!: ElementRef;

  constructor(private router: Router){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let currentUrl = this.router.url;
    // Dividir la URL en partes usando el caracter "/"
    this.urlParts = currentUrl.split('/');
    // Obtener el último segmento de la URL
    this.id = this.urlParts[this.urlParts.length - 1];

    if(!currentUrl.startsWith("/dashboard/programs/")){
      this.pathPartial = "programs";
    }
    if(currentUrl.startsWith("/dashboard/courses/")){
      this.pathPartial = "courses";
    }
    if(currentUrl.startsWith("/dashboard/academic-period/")){
      this.pathPartial = "program-years";
    }
  }

  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }
  toggleDropdown(event: Event): void {
    event.preventDefault();
    this.dropdownPopoverShow = !this.dropdownPopoverShow;
  }

  openModalUpdate(): void {
    this.isModalOpen = true;
    this.action = "update";
    this.dropdownPopoverShow = !this.dropdownPopoverShow;
  }

  openModalDelete(): void {
    this.isModalOpen = true;
    this.action = "delete";
    this.dropdownPopoverShow = !this.dropdownPopoverShow;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
