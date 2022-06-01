import React, { ReactNode } from 'react';
import { isElectron } from '../../helper/envHelper';

interface IVisibleInElectronProps {
    children: ReactNode;
}

export const VisibleInElectron: React.FC<IVisibleInElectronProps> = (props: IVisibleInElectronProps) => {
    if (isElectron()) return (<>{props.children}</>);
    return (<span></span>);
}

export const HiddenInElectron: React.FC<IVisibleInElectronProps> = (props: IVisibleInElectronProps) => {
    if (isElectron() === false) return (<>{props.children}</>);
    return (<span></span>);
}

