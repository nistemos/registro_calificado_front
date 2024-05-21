import { Component } from '@angular/core';
import { CardSettingsComponent } from "../card-settings/card-settings.component";
import { CardProfileComponent } from "../card-profile/card-profile.component";

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.sass',
    imports: [CardSettingsComponent, CardProfileComponent]
})
export class ProfileComponent {

}
