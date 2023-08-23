import { CloseIcon } from '@chakra-ui/icons';
import { Center, Spinner, Text } from '@chakra-ui/react';
import { Component, createRef } from "react";
import Stats from 'stats.js';
import { Camera, Clock, FogExp2, HemisphereLight, Object3D, PerspectiveCamera, Scene, SpotLight, WebGLRenderer } from "three";
import { bgColour } from '../../constants/UIConstant';
import { cameraControls } from './cameraControls';
import { loadModel } from './modelLoader';
import { ObjViewerControls } from './objViewerControls';

const creaturePreviewId = 'creature-preview';

interface IProps {
    creatureId: string;
    meshesToHide: string;
    hideControls?: boolean;
    cameraInitZoom?: number;
    cameraPositionZ?: number;
    initPositionY?: number;
    meshNamesToFilterOutOnObjLoad?: Array<string>;
    showStats?: boolean;
    lowQualityMode?: boolean;
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
    stats = new Stats();
    origCreatureMesh: Object3D<Event> | undefined;
    creatureMesh: Object3D<Event> | undefined;
    initPositionY: number = this.props.initPositionY ?? -1;
    frameId: number = 0;
    rotationY: number = 0;
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
        const cameraInit = this.props.cameraInitZoom ?? 1;
        const cameraPositionZ = this.props.cameraPositionZ ?? 8;

        this.camera = new PerspectiveCamera((cameraInit * 40), width / height, 0.1, 3000);
        this.camera.position.z = cameraPositionZ;
        this.camera.position.y = 5;

        this.scene.fog = new FogExp2(0xcccccc, 0.002);
        this.renderer = new WebGLRenderer({
            alpha: this.props.lowQualityMode !== true,
            antialias: this.props.lowQualityMode !== true,
            // preserveDrawingBuffer: true,
            powerPreference: 'high-performance',
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.setClearColor(bgColour);
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.mount.appendChild(this.renderer.domElement);

        this.stats.showPanel(0);
        this.stats.dom.style.position = 'absolute';
        this.stats.dom.style.top = 'unset';
        this.stats.dom.style.bottom = '0';
        this.handleShowStatChange(this.props.showStats ?? false);

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
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            onError: (error: any) => {
                console.log("An error happened" + error);
                this.setState((prev) => ({
                    ...prev,
                    hasLoaded: true,
                    hasFailed: true,
                }))
            }
        });
    }

    componentDidUpdate(prevProps: IProps) {
        if (prevProps.meshesToHide !== this.props.meshesToHide) {
            try {
                this.updateCreatureMeshes();
            } catch (ex) {
                console.error('Error occurred while updating creature meshes', ex);
            }
        }
        if (prevProps.showStats !== this.props.showStats) {
            this.handleShowStatChange(this.props.showStats ?? false);
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.frameId);
        this.mount.removeChild(this.renderer.domElement);
    }

    filterOutByName = (childMeshes: Array<Object3D>, names: Array<string>) => {
        const clean: Array<Object3D | null> = childMeshes.map(child => {
            if (child.type !== 'Mesh') {
                return null;
            }

            const lowerName = child.name.toLowerCase();
            for (const name of names) {
                if (lowerName.includes(name.toLowerCase())) {
                    return null;
                }
            }

            child.children = this.filterOutByName(child.children ?? [], names);
            return child;
        });
        return clean.filter(child => child != null) as Array<Object3D>;
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

        this.creatureMesh.children = this.filterOutByName(
            this.creatureMesh.children,
            this.props.meshNamesToFilterOutOnObjLoad ?? [],
        );

        const descriptorsToHide = this.props.meshesToHide.split(',');
        for (const meshToHide of descriptorsToHide) {
            let removePart = this.creatureMesh.getObjectByName(meshToHide);
            if (removePart == null) {
                removePart = this.creatureMesh.getObjectByName(`${meshToHide}Shape`);
            }
            if (removePart == null) {
                // console.warn(`mesh to hide not found: ${meshToHide}`);
                continue;
            }
            const parent = removePart.parent;
            if (parent == null) {
                console.error(`could not remove mesh from parent: ${meshToHide}`);
                continue;
            }
            parent.remove(removePart);
        }

        this.scene.add(this.creatureMesh);
    };

    onObjLoad = (object: Object3D<Event>) => {
        if (this.origCreatureMesh != null) {
            return;
        }

        console.log('load OBJ');
        this.origCreatureMesh = object;
        this.origCreatureMesh.position.y = this.initPositionY;
        this.origCreatureMesh.rotation.y = -180;

        this.origCreatureMesh.traverse((n: any) => {
            if (n.isMesh) {
                n.castShadow = this.props.lowQualityMode !== true;
                n.receiveShadow = this.props.lowQualityMode !== true;
                if (n.material.map) n.material.map.anisotropy = 16;
                n.geometry.computeVertexNormals();
            }
        });

        this.updateCreatureMeshes();
        this.frameId = requestAnimationFrame(this.animate);
        this.setState(() => ({
            hasLoaded: true,
        }));
    };

    handleShowStatChange = (showStats: boolean) => {
        const statsExists = this.mount.contains(this.stats.dom);
        if (showStats === true && statsExists === false) {
            this.mount.appendChild(this.stats.dom);
        } else if (showStats === false && statsExists === true) {
            this.mount.removeChild(this.stats.dom)
        }
    }

    animate = () => {
        if (this.props.showStats === true) this.stats.begin();
        this.controls.update();

        // const time = Date.now() * 0.0005;
        const delta = this.clock.getDelta();

        if (this.enableRotate && this.creatureMesh != null) {
            this.rotationY = this.creatureMesh.rotation.y + (0.25 * delta);
            this.creatureMesh.rotation.y = this.rotationY;
            if (this.origCreatureMesh != null) {
                this.origCreatureMesh!.rotation.y = this.rotationY;
            }
        }

        this.renderer?.render?.(this.scene, this.camera);
        if (this.props.showStats === true) this.stats.end();
        this.frameId = window.requestAnimationFrame(this.animate);
    };

    render() {
        return (
            <div
                id={creaturePreviewId}
                ref={mount => { this.mount = mount; }}
                draggable="false"
                className="obj-preview noselect drag"
            >
                {
                    (this.state.hasLoaded && this.props.hideControls !== true) && (
                        <ObjViewerControls
                            creatureId={this.props.creatureId}
                            enableRotate={this.enableRotate}
                            getScreenshotData={() => {
                                this.setState(() => ({
                                    hasLoaded: false,
                                }));
                                this.renderer.setClearColor(bgColour, 0);
                                this.renderer?.render?.(this.scene, this.camera);

                                const screenshotDataUrl = this.renderer.domElement.toDataURL();

                                this.renderer.setClearColor(bgColour);
                                this.renderer?.render?.(this.scene, this.camera);

                                return {
                                    dataUrl: screenshotDataUrl,
                                    width: this.mount.clientWidth,
                                    height: this.mount.clientHeight,
                                };
                            }}
                            setHasLoaded={(hasLoaded: boolean) => this.setState(() => ({ hasLoaded }))}
                            onRepeatClick={(enable: boolean) => {
                                this.enableRotate = enable;
                            }}
                        />
                    )
                }

                <Center
                    pos="absolute"
                    top="0"
                    zIndex="1"
                    className="obj-preview bg"
                    flexDir="column"
                    draggable="false"
                    pointerEvents="none"
                    opacity={(this.state.hasFailed !== true) ? 0 : 1}
                >
                    <CloseIcon />
                    <Text mt="0.5em">Something went wrong</Text>
                </Center>

                <Center
                    id="obj-preview-loader"
                    pos="absolute"
                    className="obj-preview bg"
                    flexDir="column"
                    borderRadius="10em"
                    draggable="false"
                    pointerEvents="none"
                    opacity={(this.state.hasLoaded !== true) ? 1 : 0}
                    zIndex="2"
                >
                    <Spinner />
                    <Text mt="0.5em">Loading...</Text>
                </Center>
            </div>
        );
    }
}