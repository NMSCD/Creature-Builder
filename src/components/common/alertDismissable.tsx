import { Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';

interface IProps {
    status: "warning" | "info" | "success" | "error" | "loading";
    title: string;
    description: Array<string>;
}

export const AlertDismissable: React.FC<IProps> = (props: IProps) => {
    const {
        isOpen,
        onClose,
    } = useDisclosure({ defaultIsOpen: true })

    if (isOpen === false) {
        return null;
    }

    return (
        <Alert status={props.status} borderRadius={5} mb="0.75em">
            <AlertIcon />
            <AlertDescription>
                <AlertTitle>{props.title}</AlertTitle>
                {
                    props.description.map((descr, index) => (
                        <Text key={index}>{descr}</Text>
                    ))
                }
            </AlertDescription>
            <Spacer />
            <CloseButton onClick={onClose} />
        </Alert>
    );
}

