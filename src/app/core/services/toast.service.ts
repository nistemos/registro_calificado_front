import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast, ToastType } from '../../interfaces/toast';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastSubject: BehaviorSubject<Toast | null> = new BehaviorSubject<Toast | null>(null);
  constructor() { }

  getToast(): Observable<Toast | null> {
    return this.toastSubject.asObservable();
  }

  showToast(title: string, message: string, type: ToastType = ToastType.Info): void {
    const toast: Toast = { title, message, type };
    this.toastSubject.next(toast);
  }

  clearToast(): void {
    this.toastSubject.next(null);
  }
}
