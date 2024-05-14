import { Component, Input } from '@angular/core';

import { ToastService } from '../../core/services/toast.service';
import { Toast, ToastType } from '../../interfaces/toast';

@Component({
  selector: 'app-toastify',
  standalone: true,
  imports: [],
  templateUrl: './toastify.component.html',
  styleUrl: './toastify.component.sass'
})
export class ToastifyComponent {
  toast!: Toast | null ;
  classes!: string[];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.getToast().subscribe(toast => {
      this.toast = toast;
      if (this.toast) {
        this.setClasses();
        setTimeout(() => this.dismiss(), 3000); // Desaparece después de 3 segundos (ajusta según tus necesidades)
      }
    });
  }

  setClasses(): void {
    // Establece las clases CSS según el tipo de Toast
    // Puedes adaptar esto según tus estilos de Tailwind CSS
    this.classes = [
      'toast',
      this.toast?.type === ToastType.Success ? 'bg-green-500' :
      this.toast?.type === ToastType.Error ? 'bg-red-500' :
      this.toast?.type === ToastType.Info ? 'bg-blue-500' :
      this.toast?.type === ToastType.Warning ? 'bg-yellow-500' : '',
      'text-white',
      'p-4',
      'rounded',
      'shadow-md',
      'mb-4',
    ];
  }

  dismiss(): void {
    this.toastService.clearToast();
  }

}
