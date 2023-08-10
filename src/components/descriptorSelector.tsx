import { Box } from '@chakra-ui/react';
import React from 'react';
import { PetDetails } from '../contracts/petDetails';
import { AttributeDropDown } from './attributeDropDown';
import { AttributeMultiSelect } from './attributeMultiSelect';
import { AlertDismissable } from './common/alertDismissable';


interface IProps {
    creatureId: string;
    petDetails: Array<PetDetails>;
    advancedMode: boolean;
    selectedDescriptors: Array<string>;
    triggerJsonInterval: () => void;
    getFriendlyName: (grpId: string) => string;
}

export const DescriptorSelector: React.FC<IProps> = (props: IProps) => {

    return (
        <Box className="builder-controls-descriptors" draggable="false">
            {
                props.advancedMode && (
                    <AlertDismissable status="warning"
                        title="This mode is tricky to use!"
                        description={[
                            'If nothing is displaying in model preview, try turning many parts on until you see something.',
                            'Some parts may depend on parent pieces being visible.',
                        ]}
                    />
                )
            }
            {
                (props.petDetails ?? []).map((details, index) => (
                    <Box key={details.GroupId + index} draggable="false">
                        {
                            props.advancedMode
                                ? (
                                    <>
                                        <AttributeMultiSelect
                                            key={details.GroupId + 'main'}
                                            petDetail={details}
                                            petDetailIndex={index}
                                            depth={0}
                                            selectedDescriptors={props.selectedDescriptors}
                                            getFriendlyName={props.getFriendlyName}
                                            triggerJsonUpdate={props.triggerJsonInterval}
                                        />
                                    </>
                                )
                                : (
                                    <AttributeDropDown
                                        key={details.GroupId + 'main'}
                                        petDetail={details}
                                        creatureId={props.creatureId}
                                        selectedDescriptors={props.selectedDescriptors}
                                        getFriendlyName={props.getFriendlyName}
                                        triggerJsonUpdate={props.triggerJsonInterval}
                                    />
                                )
                        }
                    </Box>
                ))
            }
        </Box>
    );
}

