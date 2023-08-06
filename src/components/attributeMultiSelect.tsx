import { Box, Card, Center, Checkbox, Flex, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { controlSpacing, depthSpacingInPx } from '../constants/UIConstant';
import { PetDetails } from '../contracts/petDetails';

interface IProps {
    petDetail: PetDetails;
    petDetailIndex: number;
    placeholder?: string;
    depth: number;
    selectedDescriptors: Array<string>;
    triggerJsonUpdate: () => void;
    getFriendlyName: (grpId: string) => string;
}

export const AttributeMultiSelect: React.FC<IProps> = (props: IProps) => {
    const groupId = props.petDetail.GroupId;
    const currentNodeId = `${groupId}-${props.petDetailIndex}-depth${props.depth ?? 0}-options`;

    const selectAllCheckBoxes = () => {
        const checkBoxElems = document.querySelectorAll(`#${currentNodeId} .chakra-checkbox.descriptor`);
        for (let checkBoxElemIndex = 0; checkBoxElemIndex < checkBoxElems.length; checkBoxElemIndex++) {
            const selectElem: any = checkBoxElems[checkBoxElemIndex];
            selectElem.click();
        }
    }

    return (
        <Box
            key={`${groupId}-${props.depth}-${props.petDetailIndex}-main`}
            data-key={groupId}
            className="noselect"
            ml={(props.depth > 0) ? `${depthSpacingInPx}px` : '0'}
        >
            <Flex mb="3">
                <Center
                    width={`${depthSpacingInPx}px`}
                    className="group pointer all"
                    onClick={selectAllCheckBoxes}
                >
                    <Box className="inner" width="100%">
                        {props.getFriendlyName(groupId)}
                    </Box>
                </Center>
                <Box id={currentNodeId} flex="1" minH="2.5em" onChange={props.triggerJsonUpdate}>
                    <Wrap spacing={controlSpacing} pl={controlSpacing}>
                        {
                            (props.petDetail?.Descriptors ?? []).map((descrip, index) => (
                                <WrapItem key={`${groupId}-${descrip.Id}-${index}`}>
                                    <Card>
                                        <Checkbox
                                            p="0.5em"
                                            className="descriptor"
                                            defaultChecked={props.selectedDescriptors.includes(descrip.Id)}
                                            data-descriptor={descrip.Id}
                                        >
                                            {props.getFriendlyName(descrip.Id)}
                                        </Checkbox>
                                    </Card>
                                </WrapItem>
                            ))
                        }
                    </Wrap>
                </Box>
            </Flex>
            {
                props.petDetail.Descriptors.map(descr => (
                    <>
                        {
                            (descr.Children ?? []).map((detail, index) => (
                                <AttributeMultiSelect
                                    key={`${groupId}-${descr.Id}-${detail.GroupId}-descriptor`}
                                    depth={props.depth + 1}
                                    petDetail={detail}
                                    petDetailIndex={index}
                                    selectedDescriptors={props.selectedDescriptors}
                                    getFriendlyName={props.getFriendlyName}
                                    triggerJsonUpdate={props.triggerJsonUpdate}
                                />
                            ))
                        }
                    </>
                ))
            }
        </Box>
    );
}

