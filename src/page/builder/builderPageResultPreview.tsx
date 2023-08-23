import { Box, Button } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { DelayedRender } from '../../components/common/delayedRender';
import { JsonViewer } from '../../components/jsonViewer';
import { ObjViewer } from '../../components/objViewer/objViewer';
import { PetExtraInfo } from '../../constants/petExtraInfo';
import { PetMainDetails } from '../../contracts/petDetails';
import { petGetDescriptorsToHide } from '../../helper/descriptorHelper';
import { DependencyInjectionContext } from '../../integration/DependencyInjectionProvider';
import { IBuilderPageSettings } from './builderPageSettingsRow';

interface IBuilderPageResultPreviewProps {
    selectedPet: PetMainDetails;
    mappingString: string;
    descriptorId: string;
    settings: IBuilderPageSettings;
    setSettings: (func: (newState: IBuilderPageSettings) => IBuilderPageSettings) => void;
    getJsonFromMappings: (localMappingString: string) => string;
    getMappingsFromJson: (event: any) => void;
}

export const BuilderPageResultPreview: React.FC<IBuilderPageResultPreviewProps> = (props: IBuilderPageResultPreviewProps) => {
    const { toastService } = useContext(DependencyInjectionContext);

    const {
        showModelPreview,
        showJsonPreview,
        showStats,
        lowQualityMode,
    } = props.settings;
    const json = props.getJsonFromMappings(props.mappingString + ',' + props.descriptorId);

    if (props.selectedPet.CreatureId == null) {
        return (
            <Box flex="2" mt="3" className="hidden-in-mobile"></Box>
        );
    }

    const creatureId = props.selectedPet.CreatureId;
    const petExtraInfoObj = PetExtraInfo[creatureId];
    const cameraInitZoom = petExtraInfoObj.initialZoom ?? 1;
    const cameraPositionZ = petExtraInfoObj.initialCameraZ ?? 8;
    const initPositionY = petExtraInfoObj.initialHeight ?? -1;

    const copyJson = () => {
        navigator?.clipboard?.writeText?.(json)?.then?.(() => {
            toastService.success(<span>Copied!</span>)
        });
    }

    const getMeshesToHide = (selectedPet: PetMainDetails, mappingString: string): string => {
        const selectedDescriptors: Array<string> = mappingString.split(',');

        const allDescriptorsToHide: Array<string> = petGetDescriptorsToHide(
            selectedPet,
            selectedDescriptors
        );

        const additionalDescriptors = petExtraInfoObj.conditionalDescriptors?.(selectedDescriptors);
        for (const addDescr of (additionalDescriptors ?? [])) {
            allDescriptorsToHide.includes(addDescr)
            allDescriptorsToHide.push(addDescr);
        }

        return allDescriptorsToHide.join(',');
    }

    const getMeshesToFilterOutOnObjLoad = (localSettings: IBuilderPageSettings): Array<string> => {
        const filters: Array<string> = ['_coll'];

        if (localSettings.showPetAccessory === false) {
            filters.push('petacc_');
        }

        return filters;
    }

    const getFlex = (showModelPreview: boolean, showJsonPreview: boolean): number => {
        if (showModelPreview === false && showJsonPreview === false) return 1;
        if (showModelPreview) return 6;
        return 4;
    }

    return (
        <Box
            flex={getFlex(showModelPreview, showJsonPreview)}
            pos="relative"
            className="builder-preview">
            <Box position="sticky" top="2em">
                {
                    showModelPreview && (
                        <Box className="obj-preview wrapper">
                            <DelayedRender delay={300} /*allow for css transitions*/>
                                <ObjViewer
                                    key={`preview-${creatureId}-lowQ:${lowQualityMode}-${getMeshesToFilterOutOnObjLoad(props.settings).join()}`}
                                    creatureId={creatureId}
                                    cameraInitZoom={cameraInitZoom}
                                    cameraPositionZ={cameraPositionZ}
                                    initPositionY={initPositionY}
                                    showStats={showStats}
                                    lowQualityMode={lowQualityMode}
                                    meshesToHide={getMeshesToHide(props.selectedPet, props.mappingString)}
                                    meshNamesToFilterOutOnObjLoad={getMeshesToFilterOutOnObjLoad(props.settings)}
                                />
                            </DelayedRender>
                        </Box>
                    )
                }
                {
                    showJsonPreview
                        ? (
                            <JsonViewer
                                json={json}
                                copyJson={copyJson}
                                getMappingsFromJson={props.getMappingsFromJson}
                            />
                        )
                        : (
                            <Button width="100%" colorScheme="purple" mb="1em" onClick={copyJson}>Copy JSON to clipboard</Button>
                        )
                }
            </Box>
        </Box>
    );
}

