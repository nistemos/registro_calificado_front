import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  setItem(key: string, value: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    }
  }

  getItem(key: string): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    }
    return null;
  }

  removeItem(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }

  clear(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__localStorageTest__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}
