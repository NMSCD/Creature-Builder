
export interface PetMainDetails {
    CreatureId: string;
    Details: Array<PetDetails>
}

export interface PetDetails {
    GroupId: string;
    Descriptors: Array<PetDetailDescriptor>;
}

export interface PetDetailDescriptor {
    Id: string;
    Name: string;
    Children: Array<PetDetails>;
}