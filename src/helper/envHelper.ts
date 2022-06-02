import React from "react";

export const isElectron = (): boolean => {
    const userAgent = navigator.userAgent.toLowerCase();
    return (userAgent?.indexOf?.('electron/') !== -1);
}
export const isDevMode = (): boolean => {
    try {
        const isDev = '_self' in React.createElement('div');
        if (isDev === true) {
            console.log('isDevMode');
        }
        return isDev;
    }
    catch (e: any) {
        console.error(e);
        return false;
    }
}