export enum ToastType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning'
}

export interface Toast {
  title: string;
  message: string;
  type: ToastType;
}
