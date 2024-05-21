import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterModule } from '@angular/router';
import { faPlus, faDesktop, faUser, faUsers, faCalendarDays, faGraduationCap, faSchool } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from "../modal/modal.component";
import {AuthService} from "../../core/services/auth.service";

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
  title!: string;
  folder!: string;
  action!: string;
  pathPartial!: string;

  constructor(private router: Router, private AuthService: AuthService){}

  ngOnInit() {}

  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }

  openModal(): void {
    this.isModalOpen = true;
    // Obtener la URL actual
  const currentUrl = this.router.url;
    if(currentUrl == "/dashboard/programs"){
      this.title = "Programa"
      this.folder = "PROGRAMA";
      this.action = "create";
    }
    if(currentUrl == "/dashboard/courses"){
      this.title = "Curso"
      this.folder = "CURSO";
      this.action = "create";
    }
    if(currentUrl == "/dashboard/academic-period"){
      this.title = "Período Académico"
      this.folder = "PERIODO ACADÉMICO";
      this.action = "create";
    }
  }

  logOut(): void {
    this.AuthService.logout();
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
