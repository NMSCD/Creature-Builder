import Swal from 'sweetalert2';

import { ResultWithValue } from '../contracts/results/ResultWithValue';

export const getQuantityDialog = async (title: string, defaultValue?: number): Promise<ResultWithValue<number>> => {
    const { value: quantity } = await Swal.fire({
        title,
        input: 'number',
        inputValue: (defaultValue != null) ? defaultValue.toString() : '1',
        showCancelButton: true
    });
    if (isNaN((quantity as any))) return {
        isSuccess: false,
        errorMessage: 'NaN',
        value: 0,
    };

    return {
        isSuccess: true,
        errorMessage: '',
        value: (quantity as any),
    };
}

export const getStringDialog = async (title: string, currentValue: string, placeholder?: string): Promise<string> => {
    const { value: text } = await Swal.fire({
        title,
        input: 'text',
        inputValue: currentValue,
        inputPlaceholder: placeholder,
        showCancelButton: true
    });

    return (text as any);
}

export const successDialog = async (title: string, message: string) => {
    Swal.fire({
        title,
        icon: 'success',
        text: message,
    });
}

export const errorDialog = async (title: string, message: string) => {
    Swal.fire({
        title,
        icon: 'error',
        text: message,
    });
}
