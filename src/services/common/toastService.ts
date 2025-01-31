import { ReactNode } from 'react';
import { toast, ToastOptions } from 'react-toastify';
import { defaultToastProps } from '../../constants/ToastOptions';

export class ToastService {

    success = (message: string | ReactNode, displayProps?: ToastOptions): void => {
        toast.success(message, { ...defaultToastProps, ...displayProps });
    }

    info = (message: string | ReactNode, displayProps?: ToastOptions): void => {
        toast.info(message, { ...defaultToastProps, ...displayProps });
    }

    warn = (message: string | ReactNode, displayProps?: ToastOptions): void => {
        toast.warn(message, { ...defaultToastProps, ...displayProps });
    }

    error = (message: string | ReactNode, displayProps?: ToastOptions): void => {
        toast.error(message, { ...defaultToastProps, ...displayProps });
    }
}
