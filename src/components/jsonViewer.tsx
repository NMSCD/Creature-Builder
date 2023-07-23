import React, { useContext, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Button, InputGroup, InputRightElement } from '@chakra-ui/react';
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyIcon } from '@chakra-ui/icons';
import { DependencyInjectionContext } from '../integration/DependencyInjectionProvider';
import { JsonExplanationBottomModalSheet } from './dialog/jsonExplanationBottomModalSheet';
import { toggleHtmlNodeClass } from '../helper/documentHelper';

interface IProps {
    json: string;
    placeholder?: string;
    getMappingsFromJson: (event: any) => void;
}

export const JsonViewer: React.FC<IProps> = (props: IProps) => {
    const [isJsonExplanationOpen, setJsonExplanationOpen] = useState<boolean>(false);
    const { toastService } = useContext(DependencyInjectionContext);

    const toggleJsonExplanation = (isOpen: boolean) => {
        toggleHtmlNodeClass('body', 'noscroll', isOpen);
        setJsonExplanationOpen(isOpen);
    }

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
            <Button
                pos="absolute" top="0" left="0"
                transform="translateY(-125%)"
                onClick={() => toggleJsonExplanation(true)}
            >
                <span>How to use the JSON</span>
            </Button>
            <JsonExplanationBottomModalSheet
                isDetailPaneOpen={isJsonExplanationOpen}
                setDetailPaneOpen={toggleJsonExplanation}
            />
        </InputGroup>
    );
}

