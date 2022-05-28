import React, { } from 'react';
import { Box, Button, Center, Divider, Flex, Input, Select, Wrap, WrapItem, } from '@chakra-ui/react'
import { RepeatIcon } from '@chakra-ui/icons';
import { biomeList, creatureType, depthSpacingInPx } from '../../constants/UIConstant';
import { CreatureSave } from '../../contracts/creatureSave';
import { PastedJsonFormCheckbox } from '../../components/common/formCheckbox';
import { PastedJsonFormDatePicker } from '../../components/common/formDatePicker';
import { newRandomSeed } from '../../helper/idHelper';
import { PastedJsonFormSlider } from '../../components/common/formSlider';

interface IBuilderPageComponentsProps {
    creatureId: string;
    pastedJson?: CreatureSave;
    modifyJsonObj: (name: string, value: any) => void;
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

            <Wrap spacing={8} mt="1.5em">
                <WrapItem>
                    <Flex width="250px">
                        <Center width={`${depthSpacingInPx}px`} className="group noselect">
                            <Box className="inner" width="100%">
                                Biome
                            </Box>
                        </Center>
                        <Box flex="1">
                            <Select
                                value={props.pastedJson?.Biome?.Biome ?? biomeList[0]}
                                onChange={(event: any) => props.modifyJsonObj('Biome', { "Biome": (event?.target?.value ?? '') })}
                            >
                                {
                                    biomeList.map(biome => (
                                        <option key={biome} value={biome}>{biome}</option>
                                    ))
                                }
                            </Select>
                        </Box>
                    </Flex>
                </WrapItem>
                <WrapItem>
                    <Flex width="250px">
                        <Center width={`${depthSpacingInPx}px`} className="group noselect">
                            <Box className="inner" width="100%">
                                Creature Type
                            </Box>
                        </Center>
                        <Box flex="1">
                            <Select
                                value={props.pastedJson?.CreatureType?.CreatureType ?? creatureType[0]}
                                onChange={(event: any) => props.modifyJsonObj('CreatureType', { "CreatureType": (event?.target?.value ?? '') })}
                            >
                                {
                                    creatureType.map(creature => (
                                        <option key={creature} value={creature}>{creature}</option>
                                    ))
                                }
                            </Select>
                        </Box>
                    </Flex>
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
                        propName="HasBeenSummoned"
                        displayName="Has Been Summoned"
                        width="250px"
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
                    <Button
                        onClick={() => props.modifyJsonObj('CreatureSeed', [true, newRandomSeed()])}
                    ><RepeatIcon />&nbsp;Regen Creature Seed</Button>
                </WrapItem>
                <WrapItem>
                    <Button
                        onClick={() => props.modifyJsonObj('CreatureSecondarySeed', [true, newRandomSeed()])}
                    ><RepeatIcon />&nbsp;Regen Creature Secondary Seed</Button>
                </WrapItem>
                <WrapItem>
                    <Button
                        onClick={() => props.modifyJsonObj('SpeciesSeed', newRandomSeed())}
                    ><RepeatIcon />&nbsp;Regen Species Seed</Button>
                </WrapItem>
                <WrapItem>
                    <Button
                        onClick={() => props.modifyJsonObj('GenusSeed', newRandomSeed())}
                    ><RepeatIcon />&nbsp;Regen genus Seed</Button>
                </WrapItem>
            </Wrap>

            <Wrap spacing={8} mt="1.5em">
                <WrapItem>
                    <PastedJsonFormDatePicker
                        propName="BirthTime"
                        displayName="Birth Time"
                        pastedJson={props.pastedJson}
                        modifyJsonObj={props.modifyJsonObj}
                    />
                </WrapItem>
                <WrapItem>
                    <PastedJsonFormDatePicker
                        propName="LastEggTime"
                        displayName="Last Egg Time"
                        pastedJson={props.pastedJson}
                        modifyJsonObj={props.modifyJsonObj}
                    />
                </WrapItem>
            </Wrap>

            <Wrap spacing={8} mt="1.5em">
                <WrapItem>
                    <PastedJsonFormDatePicker
                        propName="LastTrustIncreaseTime"
                        displayName="Last Trust Increase Time"
                        pastedJson={props.pastedJson}
                        modifyJsonObj={props.modifyJsonObj}
                    />
                </WrapItem>
                <WrapItem>
                    <PastedJsonFormDatePicker
                        propName="LastTrustDecreaseTime"
                        displayName="Last Trust Decrease Time"
                        pastedJson={props.pastedJson}
                        modifyJsonObj={props.modifyJsonObj}
                    />
                </WrapItem>
            </Wrap>

            <Wrap spacing={8} mt="1.5em">
                <WrapItem>
                    <PastedJsonFormSlider
                        propName="Scale"
                        displayName="Scale"
                        width="270px"
                        pastedJson={props.pastedJson}
                        modifyJsonObj={props.modifyJsonObj}
                    />
                </WrapItem>

                <WrapItem>
                    <PastedJsonFormSlider
                        propName="Trust"
                        displayName="Trust"
                        width="270px"
                        pastedJson={props.pastedJson}
                        modifyJsonObj={props.modifyJsonObj}
                    />
                </WrapItem>
            </Wrap>
        </>
    );
}

