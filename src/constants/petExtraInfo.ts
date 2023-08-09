interface IPetExtraInfoAttrMapping {
    [name: string]: string;
}

interface IPetExtraInfo {
    initialZoom?: number;
    initialHeight?: number;
    initialCameraZ?: number;
    disablePreview?: boolean;
    attr?: IPetExtraInfoAttrMapping;
}

interface IPetExtraInfoContainer {
    [name: string]: IPetExtraInfo;
}

export const PetExtraInfo: IPetExtraInfoContainer = {
    ANTELOPE: {
        initialZoom: 0.5,
        initialHeight: -1,
    },
    BIRD: {
        initialZoom: 0.25,
        initialHeight: 0,
    },
    BLOB: {
        initialZoom: 0.6,
    },
    BONECAT: {
        initialHeight: -2,
    },
    BUTTERFLY: {
        initialZoom: 0.25,
        initialHeight: 0.25,
    },
    CAT: {
        initialZoom: 0.9,
    },
    COW: {
        attr: {
            '_TAIL_': 'Tail',
            '_TAIL_ALIEN': 'Alien',
        }
    },
    COWFLOATING: {},
    COWHINDLEGS: {},
    DRILL: {
        initialHeight: 0.25,
        initialCameraZ: 24,
    },
    FIEND: {
        initialZoom: 0.75,
    },
    FISHFIEND: {
        initialZoom: 0.75,
        initialHeight: 0,
    },
    FISHFIENDSMALL: {
        initialHeight: 0,
        initialCameraZ: 12,
    },
    SPIDERFLOAT: {
        initialZoom: 0.75,
        initialHeight: -0.5,
    },
    BEETLE: {
        initialCameraZ: 24,
    },
    FLYINGLIZARD: {
        initialCameraZ: 24,
    },
    FLYINGSNAKE: {
        initialCameraZ: 24,
    },
    GROUNDCREATURE: {},
    GRUNT: {
        initialZoom: 0.5,
    },
    GRUNTCREATETEST: {
        initialZoom: 0.5,
    },
    GRUNTTEST: {
        initialZoom: 0.5,
    },
    PROC_JELLYFISH: {
        initialHeight: 1,
    },
    LARGEBUTTERFLY: {},
    DIGGER: {
        initialZoom: 0.4,
        initialHeight: 0,
    },
    PETACCESSORIES: {
        initialZoom: 0.2,
        initialHeight: 0,
    },
    PLOW: {},
    WEIRDDIGGER: {
        disablePreview: true
    },
    FLOATERCREATURE: {},
    ROLLERCREATURE: {},
    ROBOTANTELOPE: {
        initialHeight: -1.5,
    },
    ROCKCREATURE: {},
    ROCKSPIDER: {
        initialZoom: 0.4,
        initialHeight: -0.2,
    },
    RODENT: {
        initialZoom: 0.5,
        initialHeight: -0.25,
    },
    SANDWORM: {
        initialCameraZ: 24,
    },
    FREIGHTERFIEND: {
        initialZoom: 0.75,
        initialHeight: -1,
    },
    SEASNAKE: {
        initialCameraZ: 24,
    },
    SHARK: {
        initialHeight: 1,
        initialCameraZ: 12,
    },
    SIXLEGCAT: {},
    SIXLEGGEDCOW: {},
    SMALLBIRD: {
        initialZoom: 0.25,
        initialHeight: 0,
    },
    SMALLFISH: {
        initialHeight: 0,
    },
    SPIDER: {
        initialZoom: 0.5,
    },
    STRIDER: {
        initialZoom: 0.5,
        initialHeight: -1,
    },
    COWSWIM: {},
    RODENTSWIM: {
        initialZoom: 0.5,
        initialHeight: -0.25,
    },
    TREX: {
        initialZoom: 0.5,
    },
    TRICERATOPS: {
        initialCameraZ: 16,
        initialHeight: -2,
    },
    ANTELOPETWOLEGS: {
        initialZoom: 0.5,
    },
    WEIRDBUTTERFLY: {
        initialZoom: 0.5,
        initialHeight: -0.25,
    },
    WEIRDRIG: {},
    WEIRDRIGGROUND: {},
}

export const creaturesToExclude = [
    'GROUNDCREATURE',
    'ROLLERCREATURE',
    'FISHFIENDSMALL',
    'WEIRDRIG',
    'WEIRDRIGGROUND',
]