import { CloseIcon } from '@chakra-ui/icons';
import { Center, Text } from '@chakra-ui/react';
import { Component, createRef } from "react";
import { Camera, Clock, HemisphereLight, Object3D, PerspectiveCamera, Scene, SpotLight, WebGLRenderer } from "three";
import { PetExtraInfo } from '../../constants/petExtraInfo';
import { bgColour } from '../../constants/UIConstant';
import { cameraControls } from './cameraControls';
import { loadModel } from './modelLoader';
import { ObjViewerControls } from './objViewerControls';

interface IProps {
    creatureId: string;
    meshesToHide: string;
    hideControls?: boolean;
}

interface IState {
    hasLoaded: boolean;
    hasFailed: boolean;
}

export class ObjViewer extends Component<IProps, IState> {
    mount: any = {};
    camera: Camera | undefined;
    renderer: any = {};
    scene = new Scene();
    clock = new Clock();
    origCreatureMesh: Object3D<Event> | undefined;
    creatureMesh: Object3D<Event> | undefined;
    initPositionY: number = 0;
    frameId: number = 0;
    controls: any = {};
    repeatIconRef: any = createRef();
    enableRotate: boolean = false;

    constructor(props: IProps) {
        super(props);
        this.state = {
            hasLoaded: false,
            hasFailed: false,
        }
    }

    componentDidMount() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        const petExtraInfoObj = PetExtraInfo[this.props.creatureId];
        const cameraInit = petExtraInfoObj.initialZoom ?? 1;
        this.initPositionY = petExtraInfoObj.initialHeight ?? -1;

        this.camera = new PerspectiveCamera((cameraInit * 40), width / height, 0.1, 1000);
        this.camera.position.z = 8;
        this.camera.position.y = 5;

        this.renderer = new WebGLRenderer({
            alpha: true,
            antialias: true,
            preserveDrawingBuffer: true,
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.setClearColor(bgColour);
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);

        this.controls = cameraControls({
            camera: this.camera,
            renderer: this.renderer,
        });

        const spotlightIntensity = 3000;
        const light1 = new SpotLight(0xACAEAE, spotlightIntensity);
        light1.castShadow = true;
        light1.position.x = -10;
        light1.position.y = 10;
        light1.position.z = 10;
        this.scene.add(light1);

        const light2 = new SpotLight(0x616394, spotlightIntensity);
        light2.castShadow = true;
        light2.position.x = 10;
        light2.position.y = 10;
        light2.position.z = 10;
        this.scene.add(light2);

        const light3 = new SpotLight(0x706156, spotlightIntensity);
        light3.castShadow = true;
        light3.position.x = 0;
        light3.position.y = 10;
        light3.position.z = -10;
        this.scene.add(light3);

        const hemiLight = new HemisphereLight(0xfefefe, 0x000000, 0.175);
        this.scene.add(hemiLight);

        loadModel({
            fileName: this.props.creatureId,
            onLoad: this.onObjLoad,
            onProgressChange: (xhr: any) => {
                // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            onError: (error: any) => {
                console.log("An error happened" + error);
                this.setState((prev) => ({
                    ...prev,
                    hasLoaded: true,
                    hasFailed: true,
                }))
            }
        }
        );
    }

    componentDidUpdate(prevProps: IProps) {
        if (prevProps.meshesToHide !== this.props.meshesToHide) {
            try {
                this.updateCreatureMeshes();
            } catch (ex) {
                console.error('Error occurred while updating creature meshes', ex);
            }
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.frameId);
        this.mount.removeChild(this.renderer.domElement);
    }

    updateCreatureMeshes = () => {
        if (this.creatureMesh != null) {
            this.scene.remove(this.creatureMesh);
        }
        if (this.origCreatureMesh == null) {
            return;
        }

        // console.log(this.origCreatureMesh)
        // console.log(this.creatureMesh)
        // if (this.origCreatureMesh != null && this.creatureMesh != null) {
        //     this.origCreatureMesh.rotation.y = this.creatureMesh.rotation.y;
        // }
        this.creatureMesh = this.origCreatureMesh.clone();

        const descriptorsToHide = this.props.meshesToHide.split(',');
        for (const meshToHide of descriptorsToHide) {
            const removePart = this.creatureMesh.getObjectByName(meshToHide);
            if (removePart == null) {
                // console.warn(`mesh to hide not found: ${meshToHide}`);
                continue;
            }
            const parent = removePart.parent;
            if (parent == null) {
                // console.error(`could not remove mesh from parent: ${meshToHide}`);
                continue;
            }
            parent.remove(removePart);
        }

        this.scene.add(this.creatureMesh);
    }

    onObjLoad = (object: Object3D<Event>) => {
        if (this.origCreatureMesh != null) {
            return;
        }

        console.log('load OBJ');
        this.origCreatureMesh = object;
        this.origCreatureMesh.position.y = this.initPositionY;
        this.origCreatureMesh.rotation.y = 180;

        this.origCreatureMesh.traverse((n: any) => {
            if (n.isMesh) {
                n.castShadow = true;
                n.receiveShadow = true;
                if (n.material.map) n.material.map.anisotropy = 16;
                n.geometry.computeVertexNormals();
            }
        });

        this.updateCreatureMeshes();

        this.start();
        this.setState((prev) => ({
            hasLoaded: true,
        }));
    };

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    };

    animate = () => {
        this.controls.update();

        // const time = Date.now() * 0.0005;
        const delta = this.clock.getDelta();

        if (this.enableRotate && this.creatureMesh != null) {
            const rotationY = this.creatureMesh.rotation.y + (0.25 * Math.abs(delta));
            this.creatureMesh.rotation.y = rotationY;
            if (this.origCreatureMesh != null) {
                this.origCreatureMesh.rotation.y = rotationY;
            }
        }

        this.renderer?.render?.(this.scene, this.camera);
        this.frameId = window.requestAnimationFrame(this.animate);
    };

    render() {
        return (
            <div
                id="creature-preview"
                ref={mount => { this.mount = mount; }}
                className={`obj-preview ${this.state.hasLoaded ? '' : 'opacity-0'}`}
            >
                {
                    (this.state.hasFailed) && (
                        <Center
                            pos="absolute"
                            top="0"
                            zIndex="1"
                            className="obj-preview"
                            flexDir="column"
                        >
                            <CloseIcon />
                            <Text mt="0.5em">Something went wrong</Text>
                        </Center>
                    )
                }
                {
                    (this.state.hasLoaded && this.props.hideControls !== true) && (
                        <ObjViewerControls
                            creatureId={this.props.creatureId}
                            accessRenderer={() => this.renderer}
                            onRepeatClick={(enable: boolean) => {
                                this.enableRotate = enable;
                            }}
                        />
                    )
                }
            </div>
        );
    }
}