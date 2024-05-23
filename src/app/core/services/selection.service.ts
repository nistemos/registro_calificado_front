import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  selectedProgramId: number | null = null;

  constructor() { }

  selectComponent(id: number): void {
    this.selectedProgramId = id;
  }

  clearSelection(): void {
    this.selectedProgramId = null;
  }

}
