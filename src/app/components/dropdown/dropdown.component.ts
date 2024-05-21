import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
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
export class DropdownComponent {
  @Input() program!:program;
  @Input() folder!: string;
  action!: string;
  isModalOpen = false;
  faEllipsisVertical = faEllipsisVertical;
  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false })
  btnDropdownRef!: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef!: ElementRef;

  constructor(){}

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
