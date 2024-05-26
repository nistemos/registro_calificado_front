import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bread-crumbs',
  standalone: true,
  templateUrl: './bread-crumbs.component.html',
  styleUrl: './bread-crumbs.component.sass',
  imports: [],
})
export class BreadCrumbsComponent implements OnInit {
  @Input() routeNavigation!: string;
  dropdownPopoverShow = false;

  ngOnInit(): void {}
}
