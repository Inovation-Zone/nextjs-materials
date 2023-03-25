import { ToastConfig } from "@/models/toast";

export const TOAST_CONFIG: ToastConfig = {
  toastId: 'toast-id',
  position: 'top-right',
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
  style: {
    fontSize: '16px',
    borderRadius: '14px',
  },
};