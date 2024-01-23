import * as THREE from "./node_modules/three/build/three.module.js"

export function skyMap(scene) {
    let loader = new THREE.CubeTextureLoader();
    let skyMap = loader.load([
        'skyMap/px.png',
        'skyMap/nx.png',
        'skyMap/py.png',
        'skyMap/ny.png',
        'skyMap/pz.png',
        'skyMap/nz.png',
    ]);
    scene.background = skyMap;
}