import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

export const loadModel = ({
    fileName,
    onLoad,
    onProgressChange,
    onError
}) => {
    const useFBX = true;
    const loader = useFBX ? new FBXLoader() : new OBJLoader();
    loader.load(
        `/assets/3d/${fileName}.${useFBX ? 'fbx' : 'obj'}`,
        (model) => {
            if (useFBX) {
                model.children = filterOutCollisions(model.children);
                model.scale.set(0.01, 0.01, 0.01);
            }
            onLoad(model);
        },
        onProgressChange,
        onError,
    )
}

const filterOutCollisions = (childMeshes) => {
    const clean = childMeshes.map(child => {
        if (child.type !== 'Mesh') {
            return null;
        }

        const lowerName = child.name.toLowerCase();
        if (
            lowerName.includes('_coll') ||
            lowerName.includes('petacc_')
        ) {
            return null;
        }

        child.children = filterOutCollisions(child.children ?? []);
        return child;
    });
    return clean.filter(child => child != null);
}