import React, { } from 'react';
import { FormControl, FormLabel, Slider, SliderFilledTrack, SliderThumb, SliderTrack, } from '@chakra-ui/react'
import { CreatureSave } from '../../contracts/creatureSave';
import { clamp } from '../../helper/mathHelper';


interface IFormSlider {
    pastedJson?: CreatureSave;
    propName: string;
    displayName: string;
    width: string;
    min?: number;
    max?: number;
    modifyJsonObj: (name: string, value: any) => void;
}
export const PastedJsonFormSlider: React.FC<IFormSlider> = (props: IFormSlider) => {

    const currentValue = (props?.pastedJson as any)?.[props.propName] ?? 0.1;
    const max = props.max ?? 99;
    const min = props.min ?? 1;

    return (
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
                defaultValue={currentValue * 100}
                onChange={(value: any) => props.modifyJsonObj(props.propName, (clamp(value, 0.01, 100) * (max - min)) / 100)}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
        </FormControl>
    );
}