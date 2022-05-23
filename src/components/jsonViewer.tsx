import React from 'react';
import { InputGroup, InputRightElement, Textarea } from '@chakra-ui/react'
// import { CopyIcon } from '@chakra-ui/icons';

interface IProps {
    json: string
}

export const JsonViewer: React.FC<IProps> = (props: IProps) => {

    return (
        <InputGroup
            height="100%"
        >
            <Textarea
                minH="20em"
                height="100%"
                readOnly={true}
                value={props.json}
            />
            <InputRightElement
                children={
                    <span></span>
                    // <CopyIcon className="pointer" fontSize={30} mt="1em" mr="1em" />
                }
            />
        </InputGroup>
    );
}

