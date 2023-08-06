import React from 'react';
import { Box, Center, Flex, Image, VStack, Text } from '@chakra-ui/react';
import { BasicLink } from './core/link';

interface IAboutCreditRowProps {
    imageUrl: string;
    heading: string;
    subtitle: string;
    link: string;
}

export const AboutCreditRow: React.FC<IAboutCreditRowProps> = (props: IAboutCreditRowProps) => {

    return (
        <BasicLink href={props.link} additionalClassNames="credit-row">
            <Flex>
                <Center w='75px' >
                    <Image
                        src={props.imageUrl}
                        borderTopLeftRadius={5}
                        borderBottomLeftRadius={5}
                    />
                </Center>
                <Box flex='1'
                    bg='rgba(255, 255, 255, 0.2)'
                    borderTopRightRadius={5}
                    borderBottomRightRadius={5}
                >
                    <VStack align="stretch" gap="0">
                        <Text pl={3} fontSize={22} mt="5px">{props.heading}</Text>
                        <Text pl={3} style={{ marginTop: '3px', opacity: '50%' }}>{props.subtitle}</Text>
                    </VStack>
                </Box>
            </Flex>
        </BasicLink>
    );
}

