import { Container, Divider, Text, Kbd } from '@chakra-ui/react';
import React from 'react';
import { BasicImage } from '../core/image';
import { GoatFungusSaveEditorLink } from '../core/link';
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
            snapPoints={[600]}
        >
            <Container minWidth="70%" textAlign="center">
                <Text fontSize="20" textAlign="center">This tool was designed to be used with the <GoatFungusSaveEditorLink />.</Text>
                <br />
                <Text>Open the save editor and select the save file that you want to edit.</Text>
                <Text>Then select the <b>Edit Raw JSON</b> option as shown below.</Text>
                <BasicImage imageUrl="/assets/img/goatFungusRawJson.png" alt="goatFungus raw json" style={{ margin: '0 auto' }} />
                <br />
                <br />
                <Text>Then expand the <b>PlayerStateData</b> and <b>Pets</b> options as shown below.</Text>
                <BasicImage imageUrl="/assets/img/goatFungusRawJsonPetEdit.png" alt="goatFungus raw json" style={{ margin: '0 auto' }} />
                <br />
                <br />
                <Text>Select a pet you wish to edit. In the above image, pet '[3]' was selected.</Text>
                <Text>The JSON for the selected pet is displayed on the right.</Text>
                <br />
                <Text>Use <Kbd>ctrl</Kbd> <Kbd>a</Kbd> (to select everything) and <Kbd>ctrl</Kbd> <Kbd>c</Kbd> (to copy) all the pet JSON.</Text>
                <Text>Paste that JSON into this tool to edit the JSON.</Text>
                <br />
                <Text>Once complete, you can copy the JSON from this tool and</Text>
                <Text>paste it back into the gotafungus Save Editor using <Kbd>ctrl</Kbd> <Kbd>v</Kbd> (to paste)</Text>
                <Divider mt="3em" mb="3em" />
            </Container>
        </BottomModalSheet >
    );
}