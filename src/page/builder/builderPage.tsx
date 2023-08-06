import { RepeatIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Container, Flex, HStack, Select, Text, Tooltip } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import petJsonData from '../../assets/IPetData.json';
import { DescriptorSelector } from '../../components/descriptorSelector';
import { defaultPetJson } from '../../constants/creatureDefault';
import { PetExtraInfo } from '../../constants/petExtraInfo';
import { StorageKey } from '../../constants/storageKey';
import { CreatureSave } from '../../contracts/creatureSave';
import { PetMainDetails } from '../../contracts/petDetails';
import { newDescriptorId } from '../../helper/idHelper';
import { DependencyInjectionContext } from '../../integration/DependencyInjectionProvider';
import { BasePage } from '../basePage';
import { BuilderPageControls } from './builderPageControls';
import { BuilderPageIntro } from './builderPageIntro';
import { BuilderPageResultPreview } from './builderPageResultPreview';
import { BuilderPageSettingsRow, IBuilderPageSettings, initialSettings } from './builderPageSettingsRow';

export const BuilderPage: React.FC = () => {
  const [selectedPet, setSelectedPet] = useState<PetMainDetails>({} as any);
  const [mappingString, setMappingString] = useState<string>('');
  const [descriptorId, setDescriptorId] = useState<string>(newDescriptorId());
  const [intervalTrigger, setIntervalTrigger] = useState<number>(0);
  const [saveJson, setSaveJson] = useState<CreatureSave>(defaultPetJson());
  const [settings, setSettings] = useState<IBuilderPageSettings>(initialSettings);

  const { toastService } = useContext(DependencyInjectionContext);

  const petData: Array<PetMainDetails> = (petJsonData as any)
    .filter((p: any) => p.CreatureId.includes('FLOCK') === false);

  useEffect(() => {
    try {
      const settingsFromLocalStor = localStorage.getItem(StorageKey.settings);
      if (settingsFromLocalStor == null) return;
      const settingsObj = JSON.parse(settingsFromLocalStor);
      setSettings(settingsObj)
    } catch (e: any) { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (intervalTrigger < 1) return;
    console.log('intervalTrigger');
    const interval = setInterval(() => {
      const newValueArr = getDescriptorValue();
      const newValue = newValueArr.join(',');
      setMappingString((latestMappingString: string) => {
        if (latestMappingString !== newValue) {
          console.log('update UI');
          setDescriptorId(newDescriptorId());
          return newValue;
        }
        // console.log('nothing to change');
        clearInterval(interval);
        return latestMappingString;
      });
    }, 50);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (name === 'Name') {
      value = value.replaceAll('^', '');
    }
    if (name === 'CustomSpeciesName') {
      value = `^${value.replaceAll('^', '')}`;
    }
    setSaveJson((orig) => ({
      ...orig,
      [name]: value,
    }));
  }

  const getDescriptorValue = (): Array<string> => {
    let descriptors: Array<string> = [];

    if (settings.enforceDescriptorRestrictions) {
      const selectElems = document.querySelectorAll('.attributes .chakra-select.descriptor');
      for (let selectElemIndex = 0; selectElemIndex < selectElems.length; selectElemIndex++) {
        const selectElem: any = selectElems[selectElemIndex];
        const selectedOptions: any = selectElem?.selectedOptions;
        const dropDownValue: any = selectedOptions?.[0]?.value;
        if (dropDownValue == null) continue;
        descriptors.push(dropDownValue);
      }
    }
    else {
      const checkBoxElems = document.querySelectorAll('.attributes .chakra-checkbox.descriptor');
      for (let checkBoxElemIndex = 0; checkBoxElemIndex < checkBoxElems.length; checkBoxElemIndex++) {
        const selectElem: any = checkBoxElems[checkBoxElemIndex];
        const hasAttr = selectElem.hasAttribute('data-checked');
        if (hasAttr === false) continue;
        descriptors.push(selectElem.dataset.descriptor);
      }
    }

    return descriptors;
  }

  const getJsonFromMappings = (localMappingString: string): string => {
    if (selectedPet.CreatureId == null) return '';

    const descriptors: Array<string> = localMappingString.split(',');
    const displayDescrips = descriptors.map(descr => `^${descr}`);

    const finalObj = {
      ...saveJson,
      "CreatureID": `^${selectedPet.CreatureId}`,
      "Descriptors": displayDescrips,
    };
    return JSON.stringify(finalObj, undefined, 4);
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

        const descriptors = newObj.Descriptors.slice(0, newObj.Descriptors.length - 1);
        setMappingString(descriptors.map(d => d.replaceAll('^', '')).join(','))
        setSaveJson(newObj);
        // triggerJsonInterval();
      }
    } catch (e: any) {
      toastService.error('Something went wrong while trying to use the provided JSON. Please ensure only valid JSON is pasted.');
    }
  }

  const getFriendlyName = (grpId: string): string => {
    if (settings.showSimplifiedNames !== true) return grpId;

    const petExtra = PetExtraInfo[selectedPet.CreatureId];
    if (petExtra == null) return grpId;
    if (petExtra.attr == null) return grpId;

    const petExtraAttr = petExtra.attr[grpId];
    if (petExtraAttr == null) return grpId;

    return petExtraAttr;
  }

  const creatureIdIsNotNull = (selectedPet.CreatureId != null);
  const builderSettings = (
    <BuilderPageSettingsRow
      key="builder-page-settings-row"
      settings={settings}
      setSettings={(func) => {
        setSettings((prev) => {
          const newV = func(prev);
          localStorage.setItem(StorageKey.settings, JSON.stringify(newV));
          return newV;
        })
      }}
      triggerJsonInterval={triggerJsonInterval}
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
              <Tooltip label="Reset selection">
                <RepeatIcon boxSize="30" className="pointer" onClick={() => setSelectedPet({} as any)} />
              </Tooltip>
            )
          }
        </HStack>
        <Box w='100%' p={4} color='white'></Box>
      </Container>
      {
        (!creatureIdIsNotNull) && (
          <>
            <BuilderPageIntro getMappingsFromJson={getMappingsFromJson}>
              <Center className="attributes" mx={0} my={10} flexDir="column">
                <Text mb={1}>Settings</Text>
                {builderSettings}
              </Center>
            </BuilderPageIntro>
          </>
        )
      }

      {
        creatureIdIsNotNull && (
          <Box className="attributes">
            <Flex>
              <BuilderPageResultPreview
                selectedPet={selectedPet}
                mappingString={mappingString}
                descriptorId={descriptorId}
                getJsonFromMappings={getJsonFromMappings}
                getMappingsFromJson={getMappingsFromJson}
              />
              <Box width="20px" className="hidden-in-mobile"></Box>
              <Box flex="5" className="builder-controls">
                {builderSettings}
                <DescriptorSelector
                  petDetails={selectedPet.Details}
                  selectedDescriptors={mappingString.split(',')}
                  enforceDescriptorRestrictions={settings.enforceDescriptorRestrictions}
                  getFriendlyName={getFriendlyName}
                  triggerJsonInterval={triggerJsonInterval}
                />

                {
                  (saveJson.CreatureID != null) && (
                    <BuilderPageControls
                      creatureId={selectedPet.CreatureId}
                      pastedJson={saveJson}
                      regenDescriptoId={() => setDescriptorId(newDescriptorId())}
                      modifyJsonObj={modifyJsonObj}
                    />
                  )
                }

              </Box>
            </Flex>
            <Box mt="12" className="hidden-in-desktop ta-center">
              <Button width="100%" colorScheme="green">
                <span>Copy JSON result</span>
              </Button>
            </Box>
            {/* <DonationFAB /> */}
          </Box>
        )
      }

    </BasePage>
  );
}

