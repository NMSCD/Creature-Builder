import React, { useEffect, useState } from 'react';
import { Box, Center, Flex, Select } from '@chakra-ui/react';
import { depthSpacingInPx } from '../constants/UIConstant';
import { PetDetails } from '../contracts/petDetails';

interface IProps {
    petDetail: PetDetails;
    placeholder?: string;
    isNested?: boolean;
    triggerJsonUpdate: () => void;
}

export const AttributeDropDown: React.FC<IProps> = (props: IProps) => {
    const groupId = props.petDetail.GroupId;
    const initialChildren = props.petDetail?.Descriptors?.[0]?.Children ?? [];
    const [selectedPetDescrips, setSelectedPetDescrips] = useState<Array<PetDetails> | undefined>();

    useEffect(() => {
        setSelectedPetDescrips(undefined);
    }, [
        props.petDetail.GroupId,
        props.petDetail.Descriptors,
        props.petDetail.Descriptors?.length
    ]);

    const onChangeDescriptorDropDown = (e: any) => {
        e?.persist?.();
        const descriptorId = e?.target?.value ?? '';
        if (descriptorId == null || descriptorId.length < 1) return;

        const petData = (props.petDetail?.Descriptors ?? [])
            // .flatMap(descrip => descrip.Children)
            .filter(descrip => descrip != null);
        const selectedItemIndex = petData.findIndex(p => p.Id === descriptorId);
        if (selectedItemIndex < 0) return;

        props.triggerJsonUpdate();

        const selectedItem = petData[selectedItemIndex];
        console.log(selectedItem);

        if ((selectedItem?.Children?.length ?? 0) < 1) {
            setSelectedPetDescrips([]);
            return;
        }

        const selectedChildren = selectedItem.Children;
        setSelectedPetDescrips(selectedChildren);
    }

    return (
        <Box
            key={groupId + 'main'}
            data-key={groupId}
            className="noselect"
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
                    <Select
                        placeholder={props.placeholder}
                        className="descriptor"
                        disabled={(props.petDetail?.Descriptors ?? []).length < 2}
                        onChange={onChangeDescriptorDropDown}
                    >
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
                        triggerJsonUpdate={props.triggerJsonUpdate}
                    />
                ))
            }
        </Box>
    );
}

