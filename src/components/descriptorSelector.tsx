import { Box } from '@chakra-ui/react';
import React from 'react';
import { PetDetails } from '../contracts/petDetails';
import { AttributeDropDown } from './attributeDropDown';
import { AttributeMultiSelect } from './attributeMultiSelect';


interface IProps {
    petDetails: Array<PetDetails>;
    enforceDescriptorRestrictions: boolean;
    selectedDescriptors: Array<string>;
    triggerJsonInterval: () => void;
    getFriendlyName: (grpId: string) => string;
}

export const DescriptorSelector: React.FC<IProps> = (props: IProps) => {

    return (
        <Box className="restricted">
            {
                (props.petDetails ?? []).map((details, index) => (
                    <Box key={details.GroupId + index}>
                        {
                            props.enforceDescriptorRestrictions
                                ? (
                                    <AttributeDropDown
                                        key={details.GroupId + 'main'}
                                        petDetail={details}
                                        selectedDescriptors={props.selectedDescriptors}
                                        getFriendlyName={props.getFriendlyName}
                                        triggerJsonUpdate={props.triggerJsonInterval}
                                    />
                                )
                                : (
                                    <AttributeMultiSelect
                                        key={details.GroupId + 'main'}
                                        petDetail={details}
                                        petDetailIndex={index}
                                        depth={0}
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

