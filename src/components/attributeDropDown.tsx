import { Box, Center, Flex, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { noDescriptorOptionKey } from '../constants/creatureDefault';
import { depthSpacingInPx } from '../constants/UIConstant';
import { PetDetailDescriptor, PetDetails } from '../contracts/petDetails';

interface IProps {
    petDetail: PetDetails;
    placeholder?: string;
    isNested?: boolean;
    defaultValue?: string;
    selectedDescriptors: Array<string>;
    triggerJsonUpdate: () => void;
    getFriendlyName: (grpId: string) => string;
}

export const AttributeDropDown: React.FC<IProps> = (props: IProps) => {
    const groupId = props.petDetail.GroupId;
    const descriptors = props.petDetail?.Descriptors ?? [];
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

        const petData = descriptors.filter(descrip => descrip != null);
        const selectedItemIndex = petData.findIndex(p => p.Id === descriptorId);
        if (selectedItemIndex < 0) {
            if (descriptorId === noDescriptorOptionKey) {
                props.triggerJsonUpdate();
            }

            return;
        }

        props.triggerJsonUpdate();

        const selectedItem = petData[selectedItemIndex];
        // console.log('selectedItem', selectedItem);

        if ((selectedItem?.Children?.length ?? 0) < 1) {
            setSelectedPetDescrips([]);
            return;
        }

        const selectedChildren = selectedItem.Children;
        setSelectedPetDescrips(selectedChildren);
    }

    const getPetDescrips = (petDetail: PetDetails, selectedDescriptors: Array<string>): Array<PetDetails> => {
        if (selectedPetDescrips != null) return selectedPetDescrips;

        for (const descriptor of petDetail?.Descriptors ?? []) {
            if (selectedDescriptors.includes(descriptor.Id)) {
                return descriptor.Children ?? []
            }
        }
        return petDetail?.Descriptors?.[0]?.Children ?? [];
    }

    const getDefaultValue = (descriptors: Array<PetDetailDescriptor>, selectedDescriptors: Array<string>): string => {
        for (const descriptor of descriptors) {
            if (selectedDescriptors.includes(descriptor.Id)) {
                return descriptor.Id;
            }
        }
        return descriptors?.[0]?.Id;
    }

    // const getLocalDescriptors = (descriptors: Array<PetDetailDescriptor>, isNested?: boolean): Array<PetDetailDescriptor> => {
    //     const addNoneOption = ((isNested ?? false) && descriptors.length < 2);

    //     if (addNoneOption) {
    //         const noneDescriptor = {
    //             Id: noDescriptorOptionKey,
    //             Name: 'NONE',
    //             Children: [],
    //         };
    //         return [noneDescriptor, ...descriptors];
    //     }

    //     return descriptors;
    // }

    // const localDescriptors = getLocalDescriptors(descriptors, props.isNested);

    return (
        <Box
            key={`${groupId}-main`}
            data-key={groupId}
            className="noselect"
            draggable="false"
            ml={(props.isNested ?? false) ? `${depthSpacingInPx}px` : '0'}
        >
            <Flex mb="3" draggable="false">
                <Center width={`${depthSpacingInPx}px`} className="group" draggable="false">
                    <Box className="inner" width="100%" draggable="false">
                        {props.getFriendlyName(groupId)}
                    </Box>
                </Center>
                <Box flex="1" draggable="false">
                    <Select
                        placeholder={props.placeholder}
                        className="descriptor"
                        draggable="false"
                        defaultValue={getDefaultValue(descriptors, props.selectedDescriptors)}
                        disabled={descriptors.length < 2}
                        onChange={onChangeDescriptorDropDown}
                    >
                        {
                            descriptors.map((descrip, index) => (
                                <option key={descrip.Id + index} value={descrip.Id}>{props.getFriendlyName(descrip.Id)}</option>
                            ))
                        }
                    </Select>
                </Box>
            </Flex>
            {
                (getPetDescrips(props.petDetail, props.selectedDescriptors)).map(selectedPetDescrip => (
                    <AttributeDropDown
                        key={`${groupId}-${selectedPetDescrip.GroupId}-descriptor`}
                        data-key={`${groupId}-${selectedPetDescrip.GroupId}-descriptor`}
                        isNested={true}
                        petDetail={selectedPetDescrip}
                        selectedDescriptors={props.selectedDescriptors}
                        getFriendlyName={props.getFriendlyName}
                        triggerJsonUpdate={props.triggerJsonUpdate}
                    />
                ))
            }
        </Box>
    );
}

