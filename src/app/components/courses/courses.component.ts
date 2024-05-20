import { Component } from '@angular/core';
import { CardFoldersComponent } from "../card-folders/card-folders.component";

@Component({
    selector: 'app-courses',
    standalone: true,
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.sass',
    imports: [CardFoldersComponent]
})
export class CoursesComponent {
  title: string = 'CURSOS';
}
