import { CopyIcon } from '@chakra-ui/icons';
import { Box, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { ReactNode, useContext } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { DependencyInjectionContext } from '../integration/DependencyInjectionProvider';

interface IProps {
    json: string;
    placeholder?: string;
    children?: ReactNode;
    getMappingsFromJson: (event: any) => void;
}

export const JsonViewer: React.FC<IProps> = (props: IProps) => {
    const { toastService } = useContext(DependencyInjectionContext);

    const copyJson = () => {
        navigator?.clipboard?.writeText?.(props.json)?.then?.(() => {
            toastService.success(<span>Copied!</span>)
        });
    }

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
                        <CopyIcon
                            className="pointer"
                            fontSize={30}
                            onClick={copyJson}
                            mt="1em" mr="1em"
                        />
                    }
                />
            </Box>
        </InputGroup>
    );
}

