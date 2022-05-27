import React, { useContext } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { InputGroup, InputRightElement } from '@chakra-ui/react';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyIcon } from '@chakra-ui/icons';
import { DependencyInjectionContext } from '../integration/DependencyInjectionProvider';

interface IProps {
    json: string;
    placeholder?: string;
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
            <SyntaxHighlighter
                language="json"
                style={atomOneDarkReasonable}
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
        </InputGroup>
    );
}

