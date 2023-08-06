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

    if (details.Descriptors != null && details.Descriptors.length > 0) {
        for (const descriptor of details.Descriptors) {

            const childDescriptors = recursiveGetDescriptorsToHide(descriptor, selectedDescriptors);
            for (const childDescriptor of childDescriptors) {
                result.push(childDescriptor);
            }
        }
    }

    return result;
}

export const recursiveGetDescriptorsToHide = (descriptor: PetDetailDescriptor, selectedDescriptors: Array<string>): Array<string> => {
    const result: Array<string> = [];

    if (selectedDescriptors.includes(descriptor.Id) === false) {
        result.push(descriptor.Name);
    }

    if (descriptor.Children != null && descriptor.Children.length > 0) {
        for (const childDetail of descriptor.Children) {
            if (selectedDescriptors.includes(childDetail.GroupId)) {
                continue;
            }
            const childDescriptors = recursiveGetDescriptorsToHideFromPetDetails(childDetail, selectedDescriptors)
            for (const childDescriptor of childDescriptors) {
                result.push(childDescriptor);
            }
        }
    }

    return result;
}


export const recursivessGetDescriptorsToHide = (descriptor: PetDetailDescriptor, selectedDescriptors: Array<string>): Array<string> => {
    const result: Array<string> = [];

    if (descriptor.Children == null || descriptor.Children.length < 1) {
        if (selectedDescriptors.includes(descriptor.Id)) {
            return [];
        } else {
            return [descriptor.Name];
        }
    } else {

        for (const childDetail of descriptor.Children) {
            const childDescriptors = recursiveGetDescriptorsToHideFromPetDetails(childDetail, selectedDescriptors)
            for (const childDescriptor of childDescriptors) {
                result.push(childDescriptor);
            }
        }
    }

    return result;
}