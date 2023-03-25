import { CSSProperties } from "react";
import { Theme, ToastPosition } from "react-toastify";

export interface ToastConfig {
  toastId: string;
  position: ToastPosition | undefined;
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  progress: undefined;
  theme: Theme | undefined;
  style: CSSProperties;
}