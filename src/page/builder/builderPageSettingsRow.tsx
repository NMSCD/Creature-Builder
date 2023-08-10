import { Button, Spacer, Wrap, WrapItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ContentCreatorCreaturesBottomModalSheet } from '../../components/dialog/contentCreatorCreaturesBottomModalSheet';
import { JsonExplanationBottomModalSheet } from '../../components/dialog/jsonExplanationBottomModalSheet';
import { ISettingOptionAttrMapping, ISettingOptionCompProps } from '../../components/setting/settingCommon';
import { SettingSwitch } from '../../components/setting/settingSwitch';
import { controlSpacing } from '../../constants/UIConstant';
import { toggleHtmlNodeClass } from '../../helper/documentHelper';

export interface IBuilderPageSettings {
    showSimplifiedNames: boolean;
    advancedMode: boolean;
    showJsonPreview: boolean;
    showModelPreview: boolean;
    showPetAccessory: boolean;
}

export const initialSettings: IBuilderPageSettings = {
    showSimplifiedNames: false,
    advancedMode: true,
    showJsonPreview: true,
    showModelPreview: true,
    showPetAccessory: false,
}

interface ISettingOption {
    id: string,
    propName: string,
    label: string,
    additionalProps?: ISettingOptionAttrMapping;
    show?: (currentSettings: IBuilderPageSettings) => boolean;
    component: React.FC<ISettingOptionCompProps<any>>,
}

interface IProps {
    settings: IBuilderPageSettings;
    triggerJsonInterval: () => void;
    getMappingsFromJson: (event: any) => void;
    setSettings: (func: (newState: IBuilderPageSettings) => IBuilderPageSettings) => void;
}

export const BuilderPageSettingsRow: React.FC<IProps> = (props: IProps) => {
    const [isJsonExplanationOpen, setJsonExplanationOpen] = useState<boolean>(false);
    const [isContentCreatorModalOpen, setContentCreatorModalOpen] = useState<boolean>(false);
    const showSettings = true
    // const [showSettings, setShowSettings] = useState<boolean>(true);

    const toggleJsonExplanation = (isOpen: boolean) => {
        toggleHtmlNodeClass('body', 'noscroll', isOpen);
        setJsonExplanationOpen(isOpen);
    }

    const settingOptions: Array<ISettingOption> = [
        // {
        //     id: 'showSimplifiedNames',
        //     propName: 'showSimplifiedNames',
        //     label: 'Show simplified names',
        //     component: SettingSwitch,
        // },
        {
            id: 'showJsonPreview',
            propName: 'showJsonPreview',
            label: 'Show output JSON',
            component: SettingSwitch,
            additionalProps: {
                width: '250px'
            }
        },
        {
            id: 'showModelPreview',
            propName: 'showModelPreview',
            label: 'Show model preview',
            component: SettingSwitch,
            additionalProps: {
                width: '250px'
            }
        },
        {
            id: 'showPetAccessory',
            propName: 'showPetAccessory',
            label: 'Show pet accessory attachment point',
            component: SettingSwitch,
            show: (current: IBuilderPageSettings) => (
                current.showModelPreview === true
            ),
            additionalProps: {
                width: '370px'
            }
        },
        {
            id: 'advancedMode',
            propName: 'advancedMode',
            label: 'Enable Advanced Mode',
            component: SettingSwitch,
        },
    ];

    return (
        <>
            <Wrap mb={settingOptions.length > 0 ? '3' : ''} spacing={controlSpacing / 2}>
                <WrapItem key="how-to-wrap-item">
                    <Button key="how-to" colorScheme="gray" onClick={() => toggleJsonExplanation(true)}>
                        <span>How to use the JSON</span>
                    </Button>
                </WrapItem>
                {/* <WrapItem key="hide-settings-wrap-item" className={showSettings ? '' : 'hidden'}>
                    <Button rightIcon={<ChevronLeftIcon />} onClick={() => setShowSettings(prev => !prev)}>
                        Hide settings
                    </Button>
                </WrapItem>
                <WrapItem key="show-settings-wrap-item" className={showSettings ? 'hidden' : ''} >
                    <Button rightIcon={<SettingsIcon />} onClick={() => setShowSettings(prev => !prev)}>
                        Show settings
                    </Button>
                </WrapItem> */}
                {
                    (showSettings ? settingOptions : []).map((opt: ISettingOption) => {
                        const Comp = opt.component;
                        const value = (props.settings as any)?.[opt.propName];

                        const hideOpt = opt.show?.(props.settings) === false;
                        if (hideOpt) return null;

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
                <Spacer />
                {/* <WrapItem key="creator-creatures">
                    <Button key="creator-creatures" colorScheme="purple" onClick={() => setContentCreatorModalOpen(true)}>
                        <span>Template creatures</span>
                    </Button>
                </WrapItem> */}
            </Wrap>
            <JsonExplanationBottomModalSheet
                isDetailPaneOpen={isJsonExplanationOpen}
                setDetailPaneOpen={toggleJsonExplanation}
            />
            <ContentCreatorCreaturesBottomModalSheet
                isDetailPaneOpen={isContentCreatorModalOpen}
                setDetailPaneOpen={setContentCreatorModalOpen}
                closeModal={() => setContentCreatorModalOpen(false)}
                triggerJsonInterval={props.triggerJsonInterval}
                getMappingsFromJson={props.getMappingsFromJson}
                setSettings={props.setSettings}
            />
        </>
    );
}

