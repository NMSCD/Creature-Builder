import { BackSide, MeshBasicMaterial, TextureLoader } from "three";

interface ISkyBoxProps {
    folderName: string;
    fileType: string;
}

export const createMaterialArray = (props: ISkyBoxProps) => {
    const basePath = '/assets/img/skybox';
    const sides = ['ft', 'bk', 'up', 'dn', 'rt', 'lt'];
    const materials = sides.map(side => {
        const url = `${basePath}/${props.folderName}/${side}${(props.fileType ?? '.jpg')}`;
        const texture = new TextureLoader().load(url);
        return new MeshBasicMaterial({ map: texture, side: BackSide });
    });

    return materials;
}