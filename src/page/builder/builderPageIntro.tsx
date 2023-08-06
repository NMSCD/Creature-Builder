import { Center, Container, InputGroup, Text, Textarea } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface IBuilderPageIntroProps {
    children?: ReactNode;
    getMappingsFromJson: (event: any) => void;
}

export const BuilderPageIntro: React.FC<IBuilderPageIntroProps> = (props: IBuilderPageIntroProps) => {


    return (
        <>
            <Center className="noselect" draggable="false">
                <Text align="center">
                    <strong>OR</strong><br />
                    paste the JSON of your NMS creature below</Text>
            </Center>
            <Container mt="2em">
                <Center>
                    <InputGroup height="100%">
                        <Textarea
                            minH="10em"
                            style={{ textAlign: 'center' }}
                            value=""
                            placeholder="Here you can add Creature JSON from a NMS Save Editor"
                            onChange={props.getMappingsFromJson}
                        />
                    </InputGroup>
                </Center>
                {props.children}
            </Container>
        </>
    );
}

