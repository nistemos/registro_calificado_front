import { Component } from '@angular/core';
import { CardFoldersComponent } from "../card-folders/card-folders.component";

@Component({
    selector: 'app-program-year',
    standalone: true,
    templateUrl: './program-year.component.html',
    styleUrl: './program-year.component.sass',
    imports: [CardFoldersComponent]
})
export class ProgramYearComponent {
  title: string = 'PERIODO ACADEMICO';
}
