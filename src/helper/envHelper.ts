import React from "react";

export const isElectron = (): boolean => {
    const userAgent = navigator.userAgent.toLowerCase();
    return (userAgent?.indexOf?.('electron/') !== -1);
}
export const isDevMode = (): boolean => {
    return '_self' in React.createElement('div');
}