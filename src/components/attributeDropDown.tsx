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
    const [selectedPetDescrip, setSelectedPetDescrip] = useState<PetDetails>(props.petDetail?.Descriptors?.[0]?.Children?.[0]);

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
            setSelectedPetDescrip({} as any);
            return;
        }

        const selectedChild = selectedItem.Children[0];
        setSelectedPetDescrip(selectedChild);
    }

    return (
        <Box
            key={props.petDetail.GroupId + 'main'}
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
                (selectedPetDescrip?.GroupId != null) && (
                    <AttributeDropDown
                        key={selectedPetDescrip.GroupId + ' descriptor'}
                        isNested={true}
                        petDetail={selectedPetDescrip}
                    />
                )
            }
        </Box>
    );
}

