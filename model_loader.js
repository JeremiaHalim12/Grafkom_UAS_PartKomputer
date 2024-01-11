import * as THREE from "three";
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

export function modelLoader(scene, filePath, scale, rotation, position) {
    const loader = new GLTFLoader();

    loader.load(filePath, (gltf) => {
        var loader = gltf.scene.children[0];
        loader.scale.set(scale.x, scale.y, scale.z);
        loader.rotation.set(rotation.x, rotation.y, rotation.z);
        loader.position.set(position.x, position.y, position.z);
        scene.add(gltf.scene);
    });
}