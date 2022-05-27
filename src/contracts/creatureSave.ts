export interface CreatureSave {
    Scale: number;
    CreatureID: string;
    Descriptors: Array<string>;
    CreatureSeed: Array<boolean | string>;
    CreatureSecondarySeed: Array<boolean | string>;
    SpeciesSeed: string;
    GenusSeed: string;
    CustomSpeciesName: string;
    Predator: boolean;
    UA: number;
    AllowUnmodifiedReroll: boolean;
    ColourBaseSeed: Array<boolean | string>;
    BoneScaleSeed: Array<boolean | string>;
    HasFur: boolean;
    Biome: Biome;
    CreatureType: CreatureType;
    BirthTime: number;
    LastEggTime: number;
    LastTrustIncreaseTime: number;
    LastTrustDecreaseTime: number;
    EggModified: boolean;
    HasBeenSummoned: boolean;
    CustomName: string;
    Trust: number;
    SenderData: SenderData;
    Traits: Array<number>;
    Moods: Array<number>;
}

export interface Biome {
    Biome: string;
}

export interface CreatureType {
    CreatureType: string;
}

export interface SenderData {
    LID: string;
    UID: string;
    USN: string;
    PTK: string;
    TS: number;
}