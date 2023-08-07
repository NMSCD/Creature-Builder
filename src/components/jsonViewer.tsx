import { CopyIcon } from '@chakra-ui/icons';
import { Box, InputGroup, InputRightElement, Tooltip } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs';


interface IProps {
    json: string;
    placeholder?: string;
    children?: ReactNode;
    getMappingsFromJson: (event: any) => void;
    copyJson: () => void;
}

export const JsonViewer: React.FC<IProps> = (props: IProps) => {

    return (
        <InputGroup height="100%" width="100%" className="json-viewer">
            {props.children}
            <Box style={{ width: '100%' }}>
                <SyntaxHighlighter
                    language="json"
                    style={atomOneDarkReasonable}
                    customStyle={{ borderRadius: '7px' }}
                >
                    {props.json}
                </SyntaxHighlighter>
                <InputRightElement
                    children={
                        <Tooltip label="Copy JSON to clipboard">
                            <CopyIcon
                                className="pointer"
                                fontSize={30}
                                onClick={props.copyJson}
                                mt="1em" mr="1em"
                            />
                        </Tooltip>
                    }
                />
            </Box>
        </InputGroup>
    );
}

