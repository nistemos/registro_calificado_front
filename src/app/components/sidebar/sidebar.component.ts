import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { faPlus, faDesktop, faUser, faUsers, faCalendarDays, faGraduationCap, faSchool } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass'
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

  ngOnInit() {}
  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }
}
