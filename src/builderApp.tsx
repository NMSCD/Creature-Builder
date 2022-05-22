import React, { useEffect, useState } from 'react';
import { Box, Center, Container, Flex, Select, Textarea } from '@chakra-ui/react'
import petJsonData from './assets/IPetData.json'
import { PetMainDetails } from './contracts/petDetails';
import { Header } from './components/core/header';
import { AttributeDropDown } from './components/attributeDropDown';

export const BuilderApp: React.FC = () => {
  const [selectedPet, setSelectedPet] = useState<PetMainDetails>({} as any);
  const [mappingString, setMappingString] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const newValueArr = getDescriptorValue();
      const newValue = newValueArr.join(',');
      setMappingString(latestMappingString => {
        if (latestMappingString !== newValue) {
          console.log('update UI');
          return newValue;
        }
        return latestMappingString;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onChangeCreatureDropDown = (e: any) => {
    e?.persist?.();
    const creatureId = e?.target?.value ?? '';
    if (creatureId == null || creatureId.length < 1) return;

    const petData: Array<PetMainDetails> = petJsonData as any;
    const selectedItemIndex = petData.findIndex(p => p.CreatureId === creatureId);
    const selectedItem: any = petData[selectedItemIndex];
    setSelectedPet(selectedItem);
  }

  const getDescriptorValue = (): Array<string> => {
    let descriptors: Array<string> = [];

    const selectElems = document.querySelectorAll('.attributes .chakra-select');
    for (let selectElemIndex = 0; selectElemIndex < selectElems.length; selectElemIndex++) {
      const selectElem: any = selectElems[selectElemIndex];
      const selectedOptions: any = selectElem?.selectedOptions;
      const dropDownValue: any = selectedOptions?.[0]?.value;
      if (dropDownValue == null) continue;
      descriptors.push(dropDownValue);
    }

    return descriptors;
  }

  const getJsonFromMappings = (localMappingString: string): string => {
    if (selectedPet.CreatureId == null) return '';

    const descriptors: Array<string> = localMappingString.split(',');
    const displayDescrips = descriptors.map(descr => `^${descr}`);
    // displayDescrips.push('^1234567');

    const finalObj = {
      "CreatureId": `^${selectedPet.CreatureId}`,
      "Descriptors": displayDescrips,
    };
    return JSON.stringify(finalObj, undefined, 4);
  }

  return (
    <Box w='100%' pt={4}>
      <Header />
      <Container>
        <Select
          placeholder='Select option'
          value={selectedPet.CreatureId}
          onChange={onChangeCreatureDropDown}
        >
          {
            petJsonData.map((pet, index) => (
              <option key={pet.CreatureId + index} value={pet.CreatureId}>{pet.CreatureId}</option>
            ))
          }
        </Select>
        <Box w='100%' p={4} color='white'></Box>
      </Container>

      {
        (selectedPet.CreatureId == null) && (
          <Center>Please select a creature type from the drop down</Center>
        )
      }

      <Box className="attributes">
        <Flex>
          <Box flex="2" mt="3">
            {
              (selectedPet.CreatureId != null) &&
              <Textarea
                height="100%"
                readOnly={true}
                value={getJsonFromMappings(mappingString)}
              />
            }
          </Box>
          <Box width="20px">
          </Box>
          <Box flex="5">
            {
              (selectedPet.Details ?? []).map((details, index) => (
                <Box key={details.GroupId + index}>
                  <AttributeDropDown
                    key={details.GroupId + 'main'}
                    petDetail={details}
                  />
                </Box>
              ))
            }
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

