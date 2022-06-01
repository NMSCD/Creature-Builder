import React, { } from 'react';
import { Box, Center, Flex, Input, Tooltip, } from '@chakra-ui/react'
import { CreatureSave } from '../../contracts/creatureSave';
import { dateFromEpoch, dateToEpoch, friendlyDate } from '../../helper/dateHelper';
import { depthSpacingInPx } from '../../constants/UIConstant';


interface IFormDatePicker {
    pastedJson?: CreatureSave;
    propName: string;
    displayName: string;
    enableTooltip?: boolean;
    modifyJsonObj: (name: string, value: any) => void;
}
export const PastedJsonFormDatePicker: React.FC<IFormDatePicker> = (props: IFormDatePicker) => {
    const currentValue = (props?.pastedJson as any)?.[props.propName] ?? 0;
    const currentDateValue = friendlyDate(dateFromEpoch(currentValue), 'yyyy-MM-DDTHH:mm');

    const eventToEpoch = (event: any) => {
        const dateString = event.target.value ?? currentDateValue;
        props.modifyJsonObj(props.propName, dateToEpoch(dateString));
    }

    return (
        <Flex width="370px">
            <Center width={`${depthSpacingInPx * 1.5}px`} className="group noselect">
                <Box className="inner" width="100%">
                    <Tooltip isDisabled={props.enableTooltip !== true} label={props.displayName} placement='top'>
                        {props.displayName}
                    </Tooltip>
                </Box>
            </Center>
            <Box flex="1">
                <Input type="datetime-local"
                    value={currentDateValue}
                    onChange={eventToEpoch}
                />
            </Box>
        </Flex>
    );
}