import { Container, Text } from '@chakra-ui/react';
import React from 'react';
import { BottomModalSheet } from './bottomModalSheet';

interface IProps {
    isDetailPaneOpen: boolean;
    setDetailPaneOpen: (isOpen: boolean) => void;
}

export const JsonExplanationBottomModalSheet: React.FC<IProps> = (props: IProps) => {

    return (
        <BottomModalSheet
            isOpen={props.isDetailPaneOpen}
            onClose={() => props.setDetailPaneOpen(false)}
            snapPoints={[800]}
        >
            <Container>
                <Text>This tool was designed to be used with the <a href="https://github.com/goatfungus/NMSSaveEditor" title="goatfungus Save Editor">goatfungus Save Editor</a></Text>
                <br />
                <img src="/assets/img/goatFungusRawJson.png" alt="goatFungus raw json" />
                <br />
                <img src="/assets/img/goatFungusRawJsonPetEdit.png" alt="goatFungus raw json" />
            </Container>
        </BottomModalSheet>
    );
}