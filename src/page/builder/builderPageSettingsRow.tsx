import { SettingsIcon } from '@chakra-ui/icons';
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
    showStats: boolean;
    lowQualityMode: boolean;
}

export const initialSettings: IBuilderPageSettings = {
    showSimplifiedNames: false,
    advancedMode: false,
    showJsonPreview: true,
    showModelPreview: true,
    showPetAccessory: false,
    showStats: false,
    lowQualityMode: false,
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
    const [showSettings, setShowSettings] = useState<boolean>(false);

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
            id: 'advancedMode',
            propName: 'advancedMode',
            label: 'Enable Advanced Mode',
            component: SettingSwitch,
        },
    ];

    const miscSettingOptions: Array<ISettingOption> = [
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
            id: 'lowQualityMode',
            propName: 'lowQualityMode',
            label: 'Reduce preview quality',
            component: SettingSwitch,
            show: (current: IBuilderPageSettings) => (
                current.showModelPreview === true
            ),
        },
        {
            id: 'showStats',
            propName: 'showStats',
            label: 'Show FPS',
            component: SettingSwitch,
            additionalProps: {
                width: '170px'
            }
        },
    ];

    const renderSettingOption = (opt: ISettingOption) => {
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
    }

    return (
        <>
            <Wrap
                className="settings-row"
                mb={settingOptions.length > 0 ? '3' : ''}
                spacing={controlSpacing / 2}
            >
                <WrapItem key="how-to-wrap-item">
                    <Button
                        key="how-to"
                        colorScheme="gray"
                        onClick={() => toggleJsonExplanation(true)}
                    >
                        <span>How to use the JSON</span>
                    </Button>
                </WrapItem>
                {
                    (miscSettingOptions.filter(so => so.show?.(props.settings) === true).length > 0) && (
                        <WrapItem key="settings-item">
                            <Button rightIcon={<SettingsIcon />} onClick={() => setShowSettings(prev => !prev)}>
                                {showSettings ? 'Hide' : 'Show'} additional settings
                            </Button>
                        </WrapItem>
                    )
                }
            </Wrap>
            <Wrap mb={settingOptions.length > 0 ? '3' : ''} spacing={controlSpacing / 2}>
                {settingOptions.map(renderSettingOption)}
                <Spacer />
                {/* <WrapItem key="creator-creatures">
                    <Button key="creator-creatures" colorScheme="purple" onClick={() => setContentCreatorModalOpen(true)}>
                        <span>Template creatures</span>
                    </Button>
                </WrapItem> */}
            </Wrap>
            {
                showSettings && (
                    <Wrap mb={settingOptions.length > 0 ? '3' : ''} spacing={controlSpacing / 2}>
                        {miscSettingOptions.map(renderSettingOption)}
                        <Spacer />
                    </Wrap>
                )
            }
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

