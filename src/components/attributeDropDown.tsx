import React, { useState } from 'react';
import { Box, Center, Flex, Select } from '@chakra-ui/react';
import { depthSpacingInPx } from '../constants/UIConstant';
import { PetDetails } from '../contracts/petDetails';

interface IProps {
    petDetail: PetDetails;
    placeholder?: string;
    isNested?: boolean;
}

export const AttributeDropDown: React.FC<IProps> = (props: IProps) => {
    const [selectedPetDescrips, setSelectedPetDescrips] = useState<Array<PetDetails>>(props.petDetail?.Descriptors?.[0]?.Children ?? []);

    const onChangeDescriptorDropDown = (e: any) => {
        e?.persist?.();
        const descriptorId = e?.target?.value ?? '';
        if (descriptorId == null || descriptorId.length < 1) return;

        const petData = (props.petDetail?.Descriptors ?? [])
            // .flatMap(descrip => descrip.Children)
            .filter(descrip => descrip != null);
        const selectedItemIndex = petData.findIndex(p => p.Id === descriptorId);
        if (selectedItemIndex < 0) return;

        const selectedItem = petData[selectedItemIndex];

        if ((selectedItem?.Children?.length ?? 0) < 1) {
            setSelectedPetDescrips([]);
            return;
        }

        const selectedChildren = selectedItem.Children;
        setSelectedPetDescrips(selectedChildren);
    }

    return (
        <Box
            key={props.petDetail.GroupId + 'main'}
            data-key={props.petDetail.GroupId}
            mt="3"
            ml={(props.isNested ?? false) ? `${depthSpacingInPx}px` : '0'}
        >
            <Flex>
                <Center width={`${depthSpacingInPx}px`} className="group">
                    <Box className="inner" width="100%">
                        {props.petDetail.GroupId}
                    </Box>
                </Center>
                <Box flex='1'>
                    <Select placeholder={props.placeholder} onChange={onChangeDescriptorDropDown}>
                        {
                            (props.petDetail?.Descriptors ?? []).map((descrip, index) => (
                                <option key={descrip.Id + index} value={descrip.Id}>{descrip.Id}</option>
                            ))
                        }
                    </Select>
                </Box>
            </Flex>
            {
                (selectedPetDescrips ?? []).map(selectedPetDescrip => (
                    <AttributeDropDown
                        key={selectedPetDescrip.GroupId + ' descriptor'}
                        isNested={true}
                        petDetail={selectedPetDescrip}
                    />
                ))
            }
        </Box>
    );
}

