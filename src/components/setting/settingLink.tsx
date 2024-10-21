import { FormControl, FormLabel } from '@chakra-ui/react';
import React from 'react';
import { ISettingOptionCompProps } from '../../components/setting/settingCommon';

interface IProps extends ISettingOptionCompProps<boolean> {
    icon?: string;
    width?: string;
    customOnClick?: (jsonStr: string) => void;
}

export const SettingLink: React.FC<IProps> = (props: IProps) => {
    return (
        <FormControl
            key={props.id}
            display="flex"
            alignItems="center"
            className="noselect"
            width={props.width ?? '270px'}
            onClick={() => {
                if (props.customOnClick == null) return;
                const json = props.getCurrentJson();
                props.customOnClick(json);
            }}
        >
            {
                props.icon != null && (
                    <img src={props.icon} alt={props.label} style={{ maxHeight: '1.5em', paddingRight: '0.5em' }} />
                )
            }
            <FormLabel htmlFor={props.id} mb="0">{props.label}</FormLabel>
        </FormControl>
    );
}

