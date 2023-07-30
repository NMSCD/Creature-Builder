import { CreatureSave } from '../contracts/creatureSave';
import { dateToEpoch, friendlyDate } from '../helper/dateHelper';

export const defaultPetJson = (): CreatureSave => {
    const timeInEpoch = dateToEpoch(friendlyDate());

    return {
        Scale: 5.545454545,
        CreatureID: '^',
        Descriptors: [
            '^000000000'
        ],
        CreatureSeed: [
            true,
            '0x0000000000000000'
        ],
        CreatureSecondarySeed: [
            true,
            '0x0000000000000000'
        ],
        SpeciesSeed: '0x0000000000000000',
        GenusSeed: '0x0000000000000000',
        CustomSpeciesName: '',
        Predator: false,
        UA: 1111111111111111,
        AllowUnmodifiedReroll: true,
        ColourBaseSeed: [
            true,
            '0x0000000000000000'
        ],
        BoneScaleSeed: [
            true,
            '0x0000000000000000'
        ],
        HasFur: true,
        Biome: {
            Biome: 'Lush'
        },
        CreatureType: {
            CreatureType: 'Prey'
        },
        BirthTime: timeInEpoch,
        LastEggTime: timeInEpoch,
        LastTrustIncreaseTime: timeInEpoch,
        LastTrustDecreaseTime: timeInEpoch,
        EggModified: false,
        HasBeenSummoned: true,
        CustomName: '',
        Trust: 0.5,
        SenderData: {
            LID: '',
            UID: '',
            USN: '',
            PTK: '',
            TS: 0
        },
        Traits: [
            -0.6637244820594788,
            -0.30880212783813479,
            -0.13114118576049806
        ],
        Moods: [
            0.055109474807977679,
            0.11295972764492035
        ]
    };
}