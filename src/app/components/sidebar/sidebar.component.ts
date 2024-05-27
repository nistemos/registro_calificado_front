import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { faPlus, faDesktop, faUser, faUsers, faCalendarDays, faGraduationCap, faSchool } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from "../modal/modal.component";
import {AuthService} from "../../core/services/auth.service";
import { map } from 'rxjs';

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
  isModalOpen!: boolean;
  title!: string;
  folder!: string;
  action!: string;
  pathPartial!: string;
  urlParts: any;
  id!: number;
  constructor(private router: Router, private AuthService: AuthService, private route: ActivatedRoute){}

  ngOnInit() {
    this.isModalOpen = false;
  }

  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }

  openModal(): void {
    // Obtener la URL actual
    let currentUrl = this.router.url;
    // Dividir la URL en partes usando el caracter "/"
    this.urlParts = currentUrl.split('/');

    if(this.urlParts[this.urlParts.length - 1] == "profile" || this.urlParts[this.urlParts.length - 1] == "users" || this.urlParts[this.urlParts.length - 1] == "dashboard"){
      return;
    }

    if(this.urlParts[this.urlParts.length - 1] != "programs"){
      // Obtener el último segmento de la URL
      this.id = this.urlParts[this.urlParts.length - 1];
    }

    this.isModalOpen = true;
    if(currentUrl.startsWith("/dashboard/programs")){
      this.title = "Programa"
      this.folder = "PROGRAMA";
      this.action = "create";
      this.pathPartial = "programs";
    }
    if(currentUrl.startsWith("/dashboard/courses/")){
      this.title = "Curso"
      this.folder = "CURSO";
      this.action = "create";
      this.pathPartial = "courses";
    }
    if(currentUrl.startsWith("/dashboard/academic-period/")){
      this.title = "Período Académico"
      this.folder = "PERIODO ACADÉMICO";
      this.action = "create";
      this.pathPartial = "program-years";
    }
    if(currentUrl.startsWith("/dashboard/courses/files/")){
      this.title = "Archivo"
      this.folder = "ARCHIVOS";
      this.action = "create";
      this.pathPartial = "drive";
    }
  }

  logOut(): void {
    this.AuthService.logout();
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
