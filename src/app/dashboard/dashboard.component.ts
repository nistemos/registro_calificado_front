import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminNavbarComponent } from "../components/admin-navbar/admin-navbar.component";
import { HeaderStatsComponent } from "../components/header-stats/header-stats.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { FooterComponent } from "../components/footer/footer.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.sass',
    imports: [RouterOutlet, AdminNavbarComponent, HeaderStatsComponent, SidebarComponent, FooterComponent]
})
export class DashboardComponent {

}
