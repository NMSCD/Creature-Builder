import { Box, Center, Flex, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { noDescriptorOptionKey } from '../constants/creatureDefault';
import { PetExtraInfo } from '../constants/petExtraInfo';
import { depthSpacingInPx } from '../constants/UIConstant';
import { PetDetailDescriptor, PetDetails } from '../contracts/petDetails';

interface IProps {
    creatureId: string;
    petDetail: PetDetails;
    placeholder?: string;
    isNested?: boolean;
    defaultValue?: string;
    selectedDescriptors: Array<string>;
    triggerJsonUpdate: () => void;
    getFriendlyName: (grpId: string) => string;
}

export const AttributeDropDown: React.FC<IProps> = (props: IProps) => {
    const petExtraInfoObj = PetExtraInfo[props.creatureId];
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

    const getDefaultValue = (localDescriptors: Array<PetDetailDescriptor>, selectedDescriptors: Array<string>): string => {
        for (const descriptor of localDescriptors) {
            if (selectedDescriptors.includes(descriptor.Id)) {
                return descriptor.Id;
            }
        }
        return localDescriptors?.[0]?.Id;
    }

    const getLocalDescriptors = (localDescriptors: Array<PetDetailDescriptor>, groupId: string): Array<PetDetailDescriptor> => {

        const addNoneOption = (petExtraInfoObj?.optionalDescriptors ?? []).includes(groupId);

        if (addNoneOption) {
            const noneDescriptor = {
                Id: noDescriptorOptionKey,
                Name: 'NONE',
                Children: [],
            };
            return [noneDescriptor, ...localDescriptors];
        }

        return localDescriptors;
    }

    const localDescriptors = getLocalDescriptors(descriptors, groupId);

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
                        defaultValue={getDefaultValue(localDescriptors, props.selectedDescriptors)}
                        disabled={localDescriptors.length < 2}
                        onChange={onChangeDescriptorDropDown}
                    >
                        {
                            localDescriptors.map((descrip, index) => (
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
                        creatureId={props.creatureId}
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

