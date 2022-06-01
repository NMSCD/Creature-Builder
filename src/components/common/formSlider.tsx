import React, { } from 'react';
import { FormControl, FormLabel, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Tooltip, } from '@chakra-ui/react'
import { CreatureSave } from '../../contracts/creatureSave';
import { clamp } from '../../helper/mathHelper';


interface IFormSlider {
    pastedJson?: CreatureSave;
    propName: string;
    displayName: string;
    width: string;
    min?: number;
    max?: number;
    getPropValue?: (jsonValue: any) => any;
    defaultValueMapper?: (currentValue: number, min: number, max: number) => any;
    valueMapper?: (jsonValue: any, sliderValue: number, min: number, max: number) => any;
    displayMapper?: (currentValue: any) => any;
    modifyJsonObj: (name: string, value: any) => void;
}
export const PastedJsonFormSlider: React.FC<IFormSlider> = (props: IFormSlider) => {

    const localMax = props.max ?? 99;
    const localMin = props.min ?? 1;
    const jsonValue = (props?.pastedJson as any)?.[props.propName] ?? 0.1;

    let currentValue = (props.getPropValue != null)
        ? props.getPropValue(jsonValue)
        : jsonValue;

    let defaultValueMapper = (currentValue: number, min: number, max: number) => {
        if (isNaN(currentValue)) return currentValue;
        return (currentValue / max) * 100;
    };
    if (props.defaultValueMapper != null) {
        defaultValueMapper = props.defaultValueMapper;
    }

    let valueMapper = (jsonValue: any, sliderValue: number, min: number, max: number) =>
        ((clamp(sliderValue, 0.01, 100) * (max - min)) / 100);
    if (props.valueMapper != null) {
        valueMapper = props.valueMapper;
    }

    let displayMapper = (currValue: any) => (currValue);
    if (props.displayMapper != null) {
        displayMapper = props.displayMapper;
    }

    return (
        <Tooltip label={displayMapper(currentValue)} placement='bottom'>
            <FormControl
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                className="noselect"
                width={props.width}
            >
                <FormLabel htmlFor={props.propName} mb="0">{props.displayName}</FormLabel>

                <Slider
                    id={props.propName}
                    defaultValue={defaultValueMapper(currentValue, localMin, localMax)}
                    onChange={(value: any) => props.modifyJsonObj(props.propName, valueMapper(jsonValue, value, localMin, localMax))}
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </FormControl>
        </Tooltip>
    );
}