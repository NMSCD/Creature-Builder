import { Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { ISettingOptionAttrMapping, ISettingOptionCompProps } from '../../components/setting/settingCommon';
import { SettingSwitch } from '../../components/setting/settingSwitch';
import { controlSpacing } from '../../constants/UIConstant';

export interface IBuilderPageSettings {
    showSimplifiedNames: boolean;
    enforceDescriptorRestrictions: boolean;
}

export const initialSettings: IBuilderPageSettings = {
    showSimplifiedNames: false,
    enforceDescriptorRestrictions: true,
}


interface ISettingOption {
    id: string,
    propName: string,
    label: string,
    additionalProps?: ISettingOptionAttrMapping;
    component: React.FC<ISettingOptionCompProps<any>>,
}

interface IProps {
    settings: IBuilderPageSettings;
    triggerJsonInterval: () => void;
    setSettings: (func: (newState: IBuilderPageSettings) => IBuilderPageSettings) => void;
}

export const BuilderPageSettingsRow: React.FC<IProps> = (props: IProps) => {

    const settingOptions: Array<ISettingOption> = [
        // {
        //     id: 'showSimplifiedNames',
        //     propName: 'showSimplifiedNames',
        //     label: 'Show simplified names',
        //     component: SettingSwitch,
        // },
        {
            id: 'enforceDescriptorRestrictions',
            propName: 'enforceDescriptorRestrictions',
            label: 'Enforce descriptor restrictions',
            component: SettingSwitch,
            additionalProps: {
                width: '320px'
            }
        }
    ];

    return (
        <Wrap mb={settingOptions.length > 0 ? '3' : ''} spacing={controlSpacing}>
            {/* <Center mr="1em"><Text>Options:</Text></Center> */}
            {
                settingOptions.map((opt: ISettingOption) => {
                    const Comp = opt.component;
                    const value = (props.settings as any)?.[opt.propName];
                    return (
                        <WrapItem key={opt.id}>
                            <Comp
                                {...opt.additionalProps}
                                id={opt.id}
                                label={opt.label}
                                value={value}
                                onChange={(newValue: any) => {
                                    props.setSettings((prev: IBuilderPageSettings) => ({
                                        ...prev,
                                        [opt.propName]: newValue,
                                    }));
                                    props.triggerJsonInterval();
                                }}
                            />
                        </WrapItem>
                    );
                })
            }
        </Wrap>
    );
}

