import { Box, Button, Container, Flex } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import petJsonData from '../../assets/IPetData.json';
import { CreatureIdDropdown } from '../../components/creatureIdDropdown';
import { DescriptorSelector } from '../../components/descriptorSelector';
import { defaultPetJson, noDescriptorOptionKey } from '../../constants/creatureDefault';
import { creaturesToExclude, PetExtraInfo } from '../../constants/petExtraInfo';
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
    .filter((p: any) => p.CreatureId.includes('FLOCK') === false)
    .filter((p: any) => creaturesToExclude.includes(p.CreatureId) === false);

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
    const creatureId = (e?.target?.value ?? '').replaceAll('^', '');
    if (creatureId == null || creatureId.length < 1) return;

    const selectedItemIndex = petData.findIndex(p => p.CreatureId === creatureId);
    if (selectedItemIndex < 0) {
      toastService.error(`CreatureID (${creatureId}) not supported`);
      return;
    }
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

    if (settings.advancedMode === false) {
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

    return descriptors.filter(d => d !== noDescriptorOptionKey);
  }

  const getJsonFromMappings = (localMappingString: string): string => {
    if (selectedPet.CreatureId == null) return '';

    const descriptors: Array<string> = localMappingString.split(',');
    const displayDescrips = descriptors
      .filter(descr => descr.length > 0)
      .map(descr => `^${descr}`);

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

  const applyChangesToSettings = (func: (prev: IBuilderPageSettings) => IBuilderPageSettings) => {
    setSettings((prev) => {
      const newV = func(prev);
      localStorage.setItem(StorageKey.settings, JSON.stringify(newV));
      return newV;
    })
  }

  const creatureIdIsNotNull = (selectedPet.CreatureId != null);

  return (
    <BasePage>
      <Container>
        <CreatureIdDropdown
          creatureId={selectedPet?.CreatureId}
          petData={petData}
          setSelectedPet={setSelectedPet}
          onChangeCreatureDropDown={onChangeCreatureDropDown}
        />
        <Box p={2}></Box>
      </Container>

      <Box className={creatureIdIsNotNull ? 'hidden' : ''}>
        <BuilderPageIntro getMappingsFromJson={getMappingsFromJson} />
      </Box>

      <Box className={creatureIdIsNotNull ? 'attributes' : 'hidden'}>
        <BuilderPageSettingsRow
          key="builder-page-settings-row"
          settings={settings}
          setSettings={applyChangesToSettings}
          triggerJsonInterval={triggerJsonInterval}
          getMappingsFromJson={e => {
            console.log(e);
            getMappingsFromJson(e)
          }}
        />
        <Flex className="builder-page-flex">
          <BuilderPageResultPreview
            selectedPet={selectedPet}
            mappingString={mappingString}
            descriptorId={descriptorId}
            settings={settings}
            setSettings={applyChangesToSettings}
            getJsonFromMappings={getJsonFromMappings}
            getMappingsFromJson={getMappingsFromJson}
          />
          <Box width="20px" className="hidden-in-mobile"></Box>
          <Box flex="10" className="builder-controls">
            <DescriptorSelector
              creatureId={selectedPet.CreatureId}
              petDetails={selectedPet.Details}
              selectedDescriptors={mappingString.split(',')}
              advancedMode={settings.advancedMode}
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

    </BasePage>
  );
}

