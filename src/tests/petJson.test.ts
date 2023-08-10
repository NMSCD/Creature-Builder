import { describe, expect, test } from '@jest/globals';
import petJson from '../assets/IPetData.json';
import { PetMainDetails } from '../contracts/petDetails';
import { petGetDescriptorsToHide } from '../helper/descriptorHelper';

describe('IPetData.json', () => {
    test('IPetData exists', () => {
        expect(petJson != null).toBe(true);
    });

    test('IPetData contains COW creature', () => {
        const cowObj = petJson.find(p => p.CreatureId === 'COW');
        expect(cowObj?.FriendlyName).toBe('COW');
    });
});

describe('Pet descriptors', () => {
    test('Get All descriptors of COW', () => {
        const selectedPet = (petJson as Array<PetMainDetails>).find(p => p.CreatureId === 'COW');
        expect(selectedPet != null).toBeTruthy();
        if (selectedPet == null) return;

        const descriptors = petGetDescriptorsToHide(selectedPet, []);

        // Just some Cow descriptors should be returned
        expect(descriptors.includes('_Head_AlienBird')).toBeTruthy();
        expect(descriptors.includes('_HABAcc_Blank')).toBeTruthy();
        expect(descriptors.includes('_EarsSH1_A')).toBeTruthy();
    });

    test('Get descriptors of COW excluding selected parts', () => {
        const selectedDescriptors = [
            '_TAIL_ALIEN',
            '_TAACC_1',
            '_COW_FLOATXRARE',
            '_WINGS_A',
            '_BODY_COW',
            '_BCA_BLANK1',
            '_TYPE_COW',
            '_ACC_NONE',
            '_HEAD_LORIS',
            '_HLH_MULTIHORN3',
            '_HLE_3'
        ];
        const selectedPet = (petJson as Array<PetMainDetails>).find(p => p.CreatureId === 'COW');
        expect(selectedPet != null).toBeTruthy();
        if (selectedPet == null) return;

        const descriptors = petGetDescriptorsToHide(selectedPet, selectedDescriptors);

        // The name of _HEAD_LORIS should not be in list
        expect(descriptors.includes('_Head_Loris')).toBeFalsy();

        // Heads (that are not _HEAD_LORIS) and their children should be hidden
        expect(descriptors.includes('_Head_AlienBird')).toBeTruthy();
        expect(descriptors.includes('_HABAcc_Blank')).toBeTruthy();
        expect(descriptors.includes('_EarsSH1_A')).toBeTruthy();
    });

    test('Get descriptors of COW excluding selected parts depth 2', () => {
        const selectedDescriptors = [
            '_TAIL_ALIEN',
            '_TAACC_1',
        ];
        const selectedPet = (petJson as Array<PetMainDetails>).find(p => p.CreatureId === 'COW');
        expect(selectedPet != null).toBeTruthy();
        if (selectedPet == null) return;

        const descriptors = petGetDescriptorsToHide(selectedPet, selectedDescriptors);

        // even though alien tail is selected, only one of it's children have been selected, the rest must be hidden
        expect(descriptors.includes('_TAacc_0')).toBeTruthy();

        // Other tails must also be hidden
        expect(descriptors.includes('_Tail_Cow')).toBeTruthy();
        expect(descriptors.includes('_Tail_Thin')).toBeTruthy();
        expect(descriptors.includes('_Tail_Turtle')).toBeTruthy();
    });

    test('Get All descriptors of CAT', () => {
        const selectedPet = (petJson as Array<PetMainDetails>).find(p => p.CreatureId === 'CAT');
        expect(selectedPet != null).toBeTruthy();
        if (selectedPet == null) return;

        const descriptors = petGetDescriptorsToHide(selectedPet, []);

        // Just some CAT descriptors should be returned
        expect(descriptors.includes('_BCA_12')).toBeTruthy();
    });
});