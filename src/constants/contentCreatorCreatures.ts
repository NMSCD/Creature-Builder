interface ISettingsToForce {
    advancedMode?: boolean;
}

export interface IContentCreatorCreatures {
    baseFolder: string;
    creatureName: string;
    creator: string;
    link: string;
    links: Array<string>;
    jsonPath: string;
    images: Array<string>;
    settingsToForce?: ISettingsToForce;
}

export const contentCreatorCreatures: Array<IContentCreatorCreatures> = [
    {
        baseFolder: '/assets/creature/meogi-theworm',
        jsonPath: 'creature.json',
        creatureName: 'The worm 0',
        creator: 'MEOGI',
        link: 'https://www.youtube.com/@MEOGI',
        links: [],
        images: [
            'worm1.jpg',
            'worm2.jpg'
        ],
        settingsToForce: {
            advancedMode: true,
        },
    },
    {
        baseFolder: '/assets/creature/meogi-theworm1',
        jsonPath: 'creature.json',
        creatureName: 'The worm 1',
        creator: 'MEOGI',
        link: 'https://www.youtube.com/@MEOGI',
        links: [],
        images: [
            'worm1.jpg',
            'worm2.jpg'
        ],
        settingsToForce: {
            advancedMode: true,
        },
    },
    {
        baseFolder: '/assets/creature/meogi-theworm2',
        jsonPath: 'creature.json',
        creatureName: 'The worm 2',
        creator: 'MEOGI',
        link: 'https://www.youtube.com/@MEOGI',
        links: [],
        images: [
            'worm1.jpg',
            'worm2.jpg'
        ],
        settingsToForce: {
            advancedMode: true,
        },
    }
];