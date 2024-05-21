import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFolder, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { program } from '../../interfaces/folder';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [FontAwesomeModule, NgClass],
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.sass'
})
export class FolderComponent implements OnInit {
  faFolder = faFolder;
  faEllipsisVertical = faEllipsisVertical;
  @Input() program!:program;

  constructor(){}

  ngOnInit(): void {}

  dropDown(){
    console.log("Hola mundo");

  }

}
