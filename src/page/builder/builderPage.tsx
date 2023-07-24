import React, { useContext, useEffect, useState } from 'react';
import { Box, Center, Container, Flex, InputGroup, Select, HStack, Text, Textarea, } from '@chakra-ui/react'
import { RepeatIcon } from '@chakra-ui/icons';
import petJsonData from '../../assets/IPetData.json'
import { PetMainDetails } from '../../contracts/petDetails';
import { AttributeDropDown } from '../../components/attributeDropDown';
import { newDescriptorId } from '../../helper/idHelper';
import { JsonViewer } from '../../components/jsonViewer';
import { CreatureSave } from '../../contracts/creatureSave';
import { BuilderPageComponents } from './builderPageComponents';
import { defaultPetJson } from '../../constants/creatureDefault';
import { DependencyInjectionContext } from '../../integration/DependencyInjectionProvider';
import { BasePage } from '../basePage';

export const BuilderPage: React.FC = () => {
  const [selectedPet, setSelectedPet] = useState<PetMainDetails>({} as any);
  const [mappingString, setMappingString] = useState<string>('');
  const [descriptorId, setDescriptorId] = useState<string>(newDescriptorId());
  const [intervalTrigger, setIntervalTrigger] = useState<number>(0);
  const [pastedJson, setPastedJson] = useState<CreatureSave>(defaultPetJson());
  const { toastService } = useContext(DependencyInjectionContext);

  const petData: Array<PetMainDetails> = petJsonData as any;

  useEffect(() => {
    if (intervalTrigger < 1) return;
    const interval = setInterval(() => {
      const newValueArr = getDescriptorValue();
      const newValue = newValueArr.join(',');
      setMappingString((latestMappingString: string) => {
        if (latestMappingString !== newValue) {
          console.log('update UI');
          setDescriptorId(newDescriptorId());
          return newValue;
        }
        console.log('nothing to change');
        clearInterval(interval);
        return latestMappingString;
      });
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [intervalTrigger]);

  const triggerJsonInterval = () => setIntervalTrigger((oldValue) => oldValue + 1);

  const onChangeCreatureDropDown = (e: any) => {
    e?.persist?.();
    const creatureId = e?.target?.value ?? '';
    if (creatureId == null || creatureId.length < 1) return;

    const selectedItemIndex = petData.findIndex(p => p.CreatureId === creatureId);
    const selectedItem: any = petData[selectedItemIndex];
    setSelectedPet(selectedItem);
    triggerJsonInterval();
  }

  const modifyJsonObj = (name: string, value: any) => {
    console.log('modifyJsonObj', name, value);
    setPastedJson((orig) => ({
      ...orig,
      [name]: value
    }));
  }

  const getDescriptorValue = (): Array<string> => {
    let descriptors: Array<string> = [];

    const selectElems = document.querySelectorAll('.attributes .chakra-select.descriptor');
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

    const finalObj = {
      ...pastedJson,
      "CreatureID": `^${selectedPet.CreatureId}`,
      "Descriptors": displayDescrips,
    };
    return JSON.stringify(finalObj, undefined, '\t');
  }

  const getMappingsFromJson = (event: any): void => {
    try {
      const localJsonString: string = event?.target?.value ?? '{}';
      const newObj: CreatureSave = JSON.parse(localJsonString);
      if (
        newObj?.CreatureID != null
      ) {
        const creatureId = newObj.CreatureID.replaceAll('^', '');

        const selectedItemIndex = petData.findIndex(p => p.CreatureId === creatureId);
        if (selectedItemIndex < 0) {
          toastService.error(`CreatureID (${creatureId}) not supported`);
          return;
        }
        const selectedItem: any = petData[selectedItemIndex];
        setSelectedPet(selectedItem ?? {} as any);
        setPastedJson(newObj);
        triggerJsonInterval();
      }
    } catch (e: any) {
      toastService.error('Something went wrong while trying to use the provided JSON. Please ensure only valid JSON is pasted.');
    }
  }

  const creatureIdIsNotNull = (selectedPet.CreatureId != null);
  const jsonViewerNode = (
    <JsonViewer
      json={getJsonFromMappings(mappingString + ',' + descriptorId)}
      getMappingsFromJson={getMappingsFromJson}
    />
  );

  return (
    <BasePage>
      <Container>
        <HStack>
          <Select
            className="noselect"
            mr="0.5em"
            placeholder='Select creature type'
            value={selectedPet?.CreatureId ?? 'nothing-selected'}
            onChange={onChangeCreatureDropDown}
          >
            {
              petData.map((pet, index) => (
                <option key={pet.CreatureId + index} value={pet.CreatureId}>{pet.FriendlyName}</option>
              ))
            }
          </Select>
          {
            (creatureIdIsNotNull) && (
              <RepeatIcon boxSize="30" className="pointer" onClick={() => setSelectedPet({} as any)} />
            )
          }
        </HStack>
        <Box w='100%' p={4} color='white'></Box>
      </Container>
      {
        (!creatureIdIsNotNull) && (
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
                    value={getJsonFromMappings('')}
                    placeholder="Here you can add Creature JSON from a NMS Save Editor"
                    onChange={getMappingsFromJson}
                  />
                </InputGroup>
              </Center>
            </Container>
          </>
        )
      }

      {
        creatureIdIsNotNull && (

          <Box className="attributes">
            <Flex>
              <Box flex="2" mt="3" className="hidden-in-mobile">
                {
                  (selectedPet.CreatureId != null) &&
                  jsonViewerNode
                }
              </Box>
              <Box width="20px" className="hidden-in-mobile"></Box>
              <Box flex="5">
                {
                  (selectedPet.Details ?? []).map((details, index) => (
                    <Box key={details.GroupId + index}>
                      <AttributeDropDown
                        key={details.GroupId + 'main'}
                        petDetail={details}
                        triggerJsonUpdate={triggerJsonInterval}
                      />
                    </Box>
                  ))
                }

                {
                  (pastedJson.CreatureID != null) && (
                    <BuilderPageComponents
                      creatureId={selectedPet.CreatureId}
                      pastedJson={pastedJson}
                      regenDescriptoId={() => setDescriptorId(newDescriptorId())}
                      modifyJsonObj={modifyJsonObj}
                    />
                  )
                }

              </Box>
            </Flex>
            <Box mt="12" className="hidden-in-desktop">
              {jsonViewerNode}
            </Box>
          </Box>
        )
      }

    </BasePage>
  );
}

