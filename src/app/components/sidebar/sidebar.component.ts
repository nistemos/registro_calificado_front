import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { faPlus, faDesktop, faUser, faUsers, faCalendarDays, faGraduationCap, faSchool } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from "../modal/modal.component";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.sass',
    imports: [FontAwesomeModule, RouterModule, ModalComponent]
})
export class SidebarComponent implements OnInit {
  faPlus = faPlus;
  faDesktop = faDesktop;
  faUser = faUser;
  faUsers = faUsers;
  faGraduationCap = faGraduationCap;
  faCalendarDays = faCalendarDays;
  faSchool = faSchool;
  collapseShow = "hidden";
  isModalOpen = false;

  ngOnInit() {}

  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
