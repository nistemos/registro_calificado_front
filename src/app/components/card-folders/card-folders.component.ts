import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FolderComponent } from "../folder/folder.component";
import { program } from '../../interfaces/folder';

@Component({
    selector: 'app-card-folders',
    standalone: true,
    templateUrl: './card-folders.component.html',
    styleUrl: './card-folders.component.sass',
    imports: [FolderComponent]
})
export class CardFoldersComponent implements OnInit {
  @Input() title!:string;
  @Input() programs!:program[];
  dropdownPopoverShow = false;

  ngOnInit(): void {
  }

  // @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  // @ViewChild("popoverDropdownRef", { static: false })
  // popoverDropdownRef: ElementRef;
  // ngAfterViewInit() {
  //   createPopper(
  //     this.btnDropdownRef.nativeElement,
  //     this.popoverDropdownRef.nativeElement,
  //     {
  //       placement: "bottom-start",
  //     }
  //   );
  // }
  // toggleDropdown(event) {
  //   event.preventDefault();
  //   if (this.dropdownPopoverShow) {
  //     this.dropdownPopoverShow = false;
  //   } else {
  //     this.dropdownPopoverShow = true;
  //   }
  // }
}
