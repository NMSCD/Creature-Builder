import { PetDetailDescriptor, PetDetails, PetMainDetails } from "../contracts/petDetails";


export const petGetDescriptorsToHide = (selectedPet: PetMainDetails, selectedDescriptors: Array<string>): Array<string> => {
    const result: Array<string> = [];

    for (const detail of selectedPet.Details) {
        const childDescriptors = recursiveGetDescriptorsToHideFromPetDetails(detail, selectedDescriptors)
        for (const childDescriptor of childDescriptors) {
            result.push(childDescriptor);
        }
    }

    return result;
}

export const recursiveGetDescriptorsToHideFromPetDetails = (details: PetDetails, selectedDescriptors: Array<string>): Array<string> => {
    const result: Array<string> = [];

    for (const descriptor of details.Descriptors ?? []) {
        const childDescriptors = recursiveGetDescriptorsToHide(descriptor, selectedDescriptors);
        for (const childDescriptor of childDescriptors) {
            result.push(childDescriptor);
        }
    }

    return result;
}

export const recursiveGetDescriptorsToHide = (descriptor: PetDetailDescriptor, selectedDescriptors: Array<string>): Array<string> => {
    const result: Array<string> = [];

    if (selectedDescriptors.includes(descriptor.Id) === false) {
        result.push(descriptor.Id);
        result.push(descriptor.Name);
    }

    for (const childDetail of descriptor.Children ?? []) {
        // if (selectedDescriptors.includes(childDetail.GroupId)) {
        //     continue;
        // }
        const childDescriptors = recursiveGetDescriptorsToHideFromPetDetails(childDetail, selectedDescriptors)
        for (const childDescriptor of childDescriptors) {
            result.push(childDescriptor);
        }
    }

    return result;
}
