import { CloseIcon, RepeatIcon } from '@chakra-ui/icons';
import { Center, Text } from '@chakra-ui/react';
import { Component } from "react";
import { Clock, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const bgColour = '#1A202C';

export class ObjViewer extends Component {
    mount = {};
    camera = {};
    renderer = {};
    scene = new Scene();
    clock = new Clock();
    origCreatureMesh = undefined;
    creatureMesh = undefined;
    frameId;
    controls = {};
    light1 = {};
    light2 = {};
    light3 = {};
    light4 = {};

    constructor(props) {
        super(props);
        this.state = {
            hasLoaded: false,
            hasFailed: false,
            enableRotate: true,
        }
    }

    componentDidMount() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        this.camera = new PerspectiveCamera(55, width / height, 0.1, 1000);
        this.camera.position.z = 8;
        this.camera.position.y = 5;

        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setClearColor(bgColour);
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enablePan = false;
        this.controls.maxDistance = 16;
        this.controls.minDistance = 3;

        this.light1 = new PointLight(0xff0040, 400);
        this.scene.add(this.light1);

        this.light2 = new PointLight(0x0040ff, 400);
        this.scene.add(this.light2);

        this.light3 = new PointLight(0x80ff80, 400);
        this.scene.add(this.light3);

        this.light4 = new PointLight(0xffaa00, 400);
        this.scene.add(this.light4);

        // this.scene.add(new AmbientLight(0x404040));

        const objLoader = new OBJLoader();
        objLoader.load(
            `/assets/3d/${this.props.file}.obj`,
            this.onObjLoad,
            (xhr) => {
                // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            },
            (error) => {
                console.log("An error happened" + error);
                this.setState((prev) => ({
                    ...prev,
                    hasLoaded: true,
                    hasFailed: true,
                }))
            }
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.meshesToHide !== this.props.meshesToHide) {
            this.updateCreatureMeshes();
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.frameId);
        this.mount.removeChild(this.renderer.domElement);
    }

    updateCreatureMeshes = () => {
        this.scene.remove(this.creatureMesh);
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
                console.warn(meshToHide);
                continue;
            }
            const parent = removePart.parent;
            parent.remove(removePart);
        }

        this.scene.add(this.creatureMesh);
    }

    onObjLoad = (object) => {
        if (this.origCreatureMesh != null) {
            return;
        }

        console.log('load OBJ');
        this.origCreatureMesh = object;
        this.origCreatureMesh.position.y = -1;
        this.origCreatureMesh.rotation.y = 180;

        this.updateCreatureMeshes();

        this.start();
        this.setState((prev) => ({
            hasLoaded: true,
        }))
    };

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    };

    animate = () => {
        this.controls.update();

        const time = Date.now() * 0.0005;
        const delta = this.clock.getDelta();

        if (this.state.enableRotate) {
            this.creatureMesh.rotation.y -= 0.5 * delta;
        }

        this.light1.position.x = Math.sin(time * 0.7) * 30;
        this.light1.position.y = Math.cos(time * 0.5) * 40;
        this.light1.position.z = Math.cos(time * 0.3) * 30;

        this.light2.position.x = Math.cos(time * 0.3) * 30;
        this.light2.position.y = Math.sin(time * 0.5) * 40;
        this.light2.position.z = Math.sin(time * 0.7) * 30;

        this.light3.position.x = Math.sin(time * 0.7) * 30;
        this.light3.position.y = Math.cos(time * 0.3) * 40;
        this.light3.position.z = Math.sin(time * 0.5) * 30;

        this.light4.position.x = Math.sin(time * 0.3) * 30;
        this.light4.position.y = Math.cos(time * 0.7) * 40;
        this.light4.position.z = Math.sin(time * 0.5) * 30;

        this.renderer?.render?.(this.scene, this.camera);
        this.frameId = window.requestAnimationFrame(this.animate);
    };

    render() {
        return (
            <div
                className={`obj-preview ${this.state.hasLoaded ? '' : 'opacity-0'}`}
                ref={mount => { this.mount = mount; }}
            >
                {
                    (this.state.hasFailed) && (
                        <Center
                            pos="absolute"
                            top="0"
                            zIndex="-1"
                            className="obj-preview"
                            backgroundColor={bgColour}
                            flexDir="column"
                        >
                            <CloseIcon />
                            <Text mt="0.5em">Something went wrong</Text>
                        </Center>
                    )
                }
                {
                    (this.state.hasLoaded) && (
                        <RepeatIcon
                            pos="absolute"
                            right="1em"
                            bottom="1em"
                            boxSize="30"
                            className={`pointer ${this.state.enableRotate ? '' : 'disabled'}`}
                            onClick={() => this.setState((prev) => ({
                                ...prev,
                                enableRotate: !prev.enableRotate
                            }))}
                        />
                    )
                }
            </div>
        );
    }
}
