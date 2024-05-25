import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  selectedId: number | null = null;

  constructor() { }

  selectComponent(id: number): void {
    this.selectedId = id;
  }

  clearSelection(): void {
    this.selectedId = null;
  }

}
