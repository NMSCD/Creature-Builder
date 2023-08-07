import React, { } from 'react';
import { FormControl, FormLabel, Switch, } from '@chakra-ui/react'
import { CreatureSave } from '../../contracts/creatureSave';


interface IFormCheckBox {
    pastedJson?: CreatureSave;
    propName: string;
    displayName: string;
    width: string;
    modifyJsonObj: (name: string, value: any) => void;
}
export const PastedJsonFormCheckbox: React.FC<IFormCheckBox> = (props: IFormCheckBox) => {

    let currentValue = (props?.pastedJson as any)?.[props.propName] ?? false;
    if (typeof currentValue === 'string') {
        currentValue = currentValue === 'true';
    }

    return (
        <FormControl
            key={currentValue.toString()}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            className="noselect"
            width={props.width}
            onClick={() => props.modifyJsonObj(props.propName, (!currentValue))}
        >
            <FormLabel htmlFor={props.propName} mb="0">{props.displayName}</FormLabel>
            <Switch
                id={props.propName}
                isChecked={currentValue}
                colorScheme="purple"
                onChange={(chkbx: any) => props.modifyJsonObj(props.propName, (chkbx.target.checked ?? false))}
            />
        </FormControl>
    );
}