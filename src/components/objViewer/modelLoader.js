import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

export const loadModel = ({
    fileName,
    onLoad,
    onProgressChange,
    onError,
}) => {
    const loader = new FBXLoader();
    loader.load(
        `./assets/3d/${fileName}.fbx`,
        (model) => {
            model.scale.set(0.01, 0.01, 0.01);
            onLoad(model);
        },
        onProgressChange,
        onError,
    )
}
