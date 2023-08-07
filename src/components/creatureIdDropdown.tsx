import { RepeatIcon } from '@chakra-ui/icons';
import { HStack, Select, Tooltip } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface IProps {
    creatureId?: string;
    petData: Array<any>;
    children?: ReactNode;
    onChangeCreatureDropDown: (event: any) => void;
    setSelectedPet: (value: any) => void;
}

export const CreatureIdDropdown: React.FC<IProps> = (props: IProps) => {

    return (
        <HStack>
            <Select
                className="noselect"
                mr="0.5em"
                placeholder='Select creature type'
                value={props.creatureId ?? 'nothing-selected'}
                onChange={props.onChangeCreatureDropDown}
            >
                {
                    props.petData.map((pet, index) => (
                        <option key={pet.CreatureId + index} value={pet.CreatureId}>{pet.FriendlyName}</option>
                    ))
                }
            </Select>
            {
                (props.creatureId != null) && (
                    <Tooltip label="Reset selection">
                        <RepeatIcon boxSize="30" className="pointer" onClick={() => props.setSelectedPet({} as any)} />
                    </Tooltip>
                )
            }
        </HStack>
    );
}