import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const cameraControls = ({
    camera,
    renderer
}) => {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.rotateSpeed = 0.5;
    controls.maxDistance = 20;
    controls.minDistance = 1;

    return controls;
}
