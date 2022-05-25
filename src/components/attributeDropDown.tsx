import React, { useEffect, useState } from 'react';
import { Box, Center, Flex, Select } from '@chakra-ui/react';
import { depthSpacingInPx } from '../constants/UIConstant';
import { PetDetails } from '../contracts/petDetails';

interface IProps {
    petDetail: PetDetails;
    placeholder?: string;
    isNested?: boolean;
}

export const AttributeDropDown: React.FC<IProps> = (props: IProps) => {
    const groupId = props.petDetail.GroupId;
    const initialChildren = props.petDetail?.Descriptors?.[0]?.Children ?? [];
    const [selectedPetDescrips, setSelectedPetDescrips] = useState<Array<PetDetails> | undefined>();

    useEffect(() => {
        setSelectedPetDescrips(undefined);
    }, [props.petDetail.GroupId, props.petDetail.Descriptors?.length])

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
            setSelectedPetDescrips(undefined);
            return;
        }

        const selectedChildren = selectedItem.Children;
        setSelectedPetDescrips(selectedChildren);
    }

    return (
        <Box
            key={groupId + 'main'}
            data-key={groupId}
            mt="3"
            ml={(props.isNested ?? false) ? `${depthSpacingInPx}px` : '0'}
        >
            <Flex>
                <Center width={`${depthSpacingInPx}px`} className="group">
                    <Box className="inner" width="100%">
                        {groupId}
                    </Box>
                </Center>
                <Box flex="1">
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
                (selectedPetDescrips ?? initialChildren).map(selectedPetDescrip => (
                    <AttributeDropDown
                        key={groupId + '-' + selectedPetDescrip.GroupId + ' descriptor'}
                        data-key={groupId + '-' + selectedPetDescrip.GroupId + ' descriptor'}
                        isNested={true}
                        petDetail={selectedPetDescrip}
                    />
                ))
            }
        </Box>
    );
}

