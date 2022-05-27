import React, { } from 'react';
import { Box, Button, Center, Divider, Flex, FormControl, FormLabel, Input, Switch, Wrap, WrapItem, } from '@chakra-ui/react'
import { RepeatIcon } from '@chakra-ui/icons';
import { depthSpacingInPx } from '../../constants/UIConstant';
import { CreatureSave } from '../../contracts/creatureSave';
import { PastedJsonFormCheckbox } from '../../components/common/formCheckbox';

interface IBuilderPageComponentsProps {
    creatureId: string;
    pastedJson?: CreatureSave;
    modifyJsonObj: (name: string, value: string) => void;
}

export const BuilderPageComponents: React.FC<IBuilderPageComponentsProps> = (props: IBuilderPageComponentsProps) => {

    if (props.creatureId == null) {
        return (<span></span>);
    }


    return (
        <>
            <Divider mt="2em" mb="2em" />
            <Wrap spacing={8} mt="1.5em">
                <WrapItem>
                    <Button><RepeatIcon />&nbsp;Regen Creature Seed</Button>
                </WrapItem>
                <WrapItem>
                    <Button><RepeatIcon />&nbsp;Regen Creature Secondary Seed</Button>
                </WrapItem>
                <WrapItem>
                    <Button><RepeatIcon />&nbsp;Regen Species Seed</Button>
                </WrapItem>
                <WrapItem>
                    <Button><RepeatIcon />&nbsp;Regen genus Seed</Button>
                </WrapItem>
            </Wrap>

            <Wrap spacing={8} mt="1.5em">
                <WrapItem>
                    <PastedJsonFormCheckbox
                        propName="Predator"
                        displayName="Predator"
                        width="150px"
                        pastedJson={props.pastedJson}
                        modifyJsonObj={props.modifyJsonObj}
                    />
                </WrapItem>
                <WrapItem>
                    <PastedJsonFormCheckbox
                        propName="HasFur"
                        displayName="Has fur"
                        width="150px"
                        pastedJson={props.pastedJson}
                        modifyJsonObj={props.modifyJsonObj}
                    />
                </WrapItem>
                <WrapItem>
                    <PastedJsonFormCheckbox
                        propName="EggModified"
                        displayName="Egg modified"
                        width="200px"
                        pastedJson={props.pastedJson}
                        modifyJsonObj={props.modifyJsonObj}
                    />
                </WrapItem>
                <WrapItem>
                    <PastedJsonFormCheckbox
                        propName="AllowUnmodifiedReroll"
                        displayName="Allow Unmodified Reroll"
                        width="270px"
                        pastedJson={props.pastedJson}
                        modifyJsonObj={props.modifyJsonObj}
                    />
                </WrapItem>
            </Wrap>

            <Wrap spacing={8} mt="1.5em">
                <WrapItem>
                    <Flex width="300px">
                        <Center width={`${depthSpacingInPx}px`} className="group noselect">
                            <Box className="inner" width="100%">
                                Name
                            </Box>
                        </Center>
                        <Box flex="1">
                            <Input
                                onChange={(inp: any) => props.modifyJsonObj('CustomName', (inp.target.value ?? ''))}
                                value={(props?.pastedJson)?.CustomName ?? ''}
                            />
                        </Box>
                    </Flex>
                </WrapItem>
                <WrapItem>
                    <Flex width="300px">
                        <Center width={`${depthSpacingInPx}px`} className="group noselect">
                            <Box className="inner" width="100%">
                                Species
                            </Box>
                        </Center>
                        <Box flex="1">
                            <Input
                                onChange={(inp: any) => props.modifyJsonObj('CustomSpeciesName', (inp.target.value ?? ''))}
                                value={(props?.pastedJson)?.CustomSpeciesName ?? ''}
                            />
                        </Box>
                    </Flex>
                </WrapItem>
            </Wrap>
        </>
    );
}

