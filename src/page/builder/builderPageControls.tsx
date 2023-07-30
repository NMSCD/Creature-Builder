import React, { } from 'react';
import { Box, Button, Center, Divider, Flex, Input, Select, Wrap, WrapItem, } from '@chakra-ui/react'
import { RepeatIcon } from '@chakra-ui/icons';
import { biomeList, creatureType, depthSpacingInPx } from '../../constants/UIConstant';
import { CreatureSave } from '../../contracts/creatureSave';
import { PastedJsonFormCheckbox } from '../../components/common/formCheckbox';
import { PastedJsonFormDatePicker } from '../../components/common/formDatePicker';
import { newRandomSeed } from '../../helper/idHelper';
import { PastedJsonFormSlider } from '../../components/common/formSlider';
import { clamp, moodHelper, traitHelper } from '../../helper/mathHelper';

interface IBuilderPageControlsProps {
    creatureId: string;
    pastedJson?: CreatureSave;
    regenDescriptoId: () => void;
    modifyJsonObj: (name: string, value: any) => void;
}

export const BuilderPageControls: React.FC<IBuilderPageControlsProps> = (props: IBuilderPageControlsProps) => {

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
                                value={((props?.pastedJson)?.CustomSpeciesName ?? '').replaceAll('^', '')}
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
                    <Flex width="300px">
                        <Center width={`${depthSpacingInPx * 1.5}px`} className="group noselect">
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
                        onClick={() => props.regenDescriptoId()}
                    ><RepeatIcon />&nbsp;Regen Descriptor Id</Button>
                </WrapItem>
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
                        enableTooltip={true}
                        pastedJson={props.pastedJson}
                        modifyJsonObj={props.modifyJsonObj}
                    />
                </WrapItem>
                <WrapItem>
                    <PastedJsonFormDatePicker
                        propName="LastTrustDecreaseTime"
                        displayName="Last Trust Decrease Time"
                        enableTooltip={true}
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
                        min={0}
                        max={15.99}
                        valueMapper={(_, currV, min, max) => {
                            if (isNaN(currV)) return currV;
                            try {
                                const localV = ((clamp(currV, 0.01, 100) * (max - min)) / 100)
                                return parseFloat((localV).toFixed(6));
                            } catch (e: any) {
                                return currV;
                            }
                        }}
                        pastedJson={props.pastedJson}
                        modifyJsonObj={props.modifyJsonObj}
                    />
                </WrapItem>

                <WrapItem>
                    <PastedJsonFormSlider
                        propName="Trust"
                        displayName="Trust"
                        width="270px"
                        min={0}
                        max={0.9999}
                        valueMapper={(_, currV) => {
                            if (isNaN(currV)) return currV;
                            return currV / 100;
                        }}
                        displayMapper={currV => {
                            if (isNaN(currV)) return currV;
                            return Math.round(currV * 100) + ' %';
                        }}
                        pastedJson={props.pastedJson}
                        modifyJsonObj={props.modifyJsonObj}
                    />
                </WrapItem>
            </Wrap>

            <Wrap spacing={8} mt="1.5em">
                <WrapItem>
                    <PastedJsonFormSlider
                        propName="Traits"
                        displayName="Playfulness Helpfulness"
                        width="270px"
                        min={0}
                        max={1}
                        getPropValue={(jsonValue: any) => jsonValue?.[0]}
                        defaultValueMapper={(currentValue: number, min: number, max: number) => {
                            if (isNaN(currentValue)) return currentValue;
                            return ((currentValue + 1) / 2) * 100;
                        }}
                        valueMapper={traitHelper(0)}
                        displayMapper={currV => {
                            if (isNaN(currV)) return currV;
                            return Math.round(currV * 100) + ' %';
                        }}
                        pastedJson={props.pastedJson}
                        modifyJsonObj={props.modifyJsonObj}
                    />
                </WrapItem>

                <WrapItem>
                    <PastedJsonFormSlider
                        propName="Traits"
                        displayName="Gentleness Aggression"
                        width="270px"
                        min={0}
                        max={1}
                        getPropValue={(jsonValue: any) => jsonValue?.[1]}
                        defaultValueMapper={(currentValue: number, min: number, max: number) => {
                            if (isNaN(currentValue)) return currentValue;
                            return ((currentValue + 1) / 2) * 100;
                        }}
                        valueMapper={traitHelper(1)}
                        displayMapper={currV => {
                            if (isNaN(currV)) return currV;
                            return Math.round(currV * 100) + ' %';
                        }}
                        pastedJson={props.pastedJson}
                        modifyJsonObj={props.modifyJsonObj}
                    />
                </WrapItem>

                <WrapItem>
                    <PastedJsonFormSlider
                        propName="Traits"
                        displayName="Devotion Independence"
                        width="270px"
                        min={0}
                        max={1}
                        getPropValue={(jsonValue: any) => jsonValue?.[2]}
                        defaultValueMapper={(currentValue: number, min: number, max: number) => {
                            if (isNaN(currentValue)) return currentValue;
                            return ((currentValue + 1) / 2) * 100;
                        }}
                        valueMapper={traitHelper(2)}
                        displayMapper={currV => {
                            if (isNaN(currV)) return currV;
                            return Math.round(currV * 100) + ' %';
                        }}
                        pastedJson={props.pastedJson}
                        modifyJsonObj={props.modifyJsonObj}
                    />
                </WrapItem>
            </Wrap>

            <Wrap spacing={8} mt="1.5em">
                <WrapItem>
                    <PastedJsonFormSlider
                        propName="Moods"
                        displayName="Mood 1"
                        width="270px"
                        min={0}
                        max={1}
                        getPropValue={(jsonValue: any) => jsonValue?.[0]}
                        valueMapper={moodHelper(0)}
                        displayMapper={currV => {
                            if (isNaN(currV)) return currV;
                            return Math.round(currV * 100) + ' %';
                        }}
                        pastedJson={props.pastedJson}
                        modifyJsonObj={props.modifyJsonObj}
                    />
                </WrapItem>

                <WrapItem>
                    <PastedJsonFormSlider
                        propName="Moods"
                        displayName="Mood 2"
                        width="270px"
                        min={0}
                        max={1}
                        getPropValue={(jsonValue: any) => jsonValue?.[1]}
                        valueMapper={moodHelper(1)}
                        displayMapper={currV => {
                            if (isNaN(currV)) return currV;
                            return Math.round(currV * 100) + ' %';
                        }}
                        pastedJson={props.pastedJson}
                        modifyJsonObj={props.modifyJsonObj}
                    />
                </WrapItem>
            </Wrap>
        </>
    );
}

