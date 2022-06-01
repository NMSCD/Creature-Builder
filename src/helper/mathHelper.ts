export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)

export const traitHelper = (index: number) => (jsonValue: any, currV: any, min: number, max: number) => {
    if (isNaN(currV)) return currV;
    try {
        const newValue = (currV - 50) * 2;
        const localV = ((clamp(newValue, -100, 100) * (max - min)) / 100)
        return [
            ...jsonValue.slice(0, index),
            parseFloat((localV).toFixed(6)),
            ...jsonValue.slice(index + 1)
        ];
    } catch (e: any) {
        return currV;
    }
}

export const moodHelper = (index: number) => (jsonValue: any, currV: any, min: number, max: number) => {
    if (isNaN(currV)) return currV;
    try {
        const localV = ((clamp(currV, -100, 100) * (max - min)) / 100)
        return [
            ...jsonValue.slice(0, index),
            parseFloat((localV).toFixed(6)),
            ...jsonValue.slice(index + 1)
        ];
    } catch (e: any) {
        return currV;
    }
}