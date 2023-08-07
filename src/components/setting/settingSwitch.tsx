import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import React, { createRef } from 'react';
import { ISettingOptionCompProps } from '../../components/setting/settingCommon';

interface IProps extends ISettingOptionCompProps<boolean> {
    width?: string;
}

export const SettingSwitch: React.FC<IProps> = (props: IProps) => {
    const switchRef: any = createRef();

    return (
        <FormControl
            key={props.id}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            className="noselect"
            width={props.width ?? '270px'}
            onClick={(e: any) => {
                e.preventDefault?.();
                switchRef?.current?.click?.();
            }}
        >
            <FormLabel htmlFor={props.id} mb="0">{props.label}</FormLabel>
            <Switch
                id={props.id}
                ref={switchRef}
                isChecked={props.value}
                colorScheme="purple"
                onChange={(data: any) => props.onChange(data.target.checked ?? false)}
            />
        </FormControl>
    );
}

