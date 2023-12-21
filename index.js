import * as THREE from "three";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js';

// scene, camera, renderer
const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    1,
    100
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
scene.background = new THREE.Color(0x01060f)
renderer.setPixelRatio(devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap

cam.position.x = 10;
cam.position.y = 5;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(cam, renderer.domElement);

var Grid = new THREE.GridHelper(100, 100, 0x0a0a0a, 0x000000);
Grid.position.set(0, -1, 0);
scene.add(Grid);

// Memuat model .gltf
const loader = new GLTFLoader();
loader.load('gaming_desktop_pc/scene.gltf', (gltf) => {
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial();
        }
    });

    scene.add(gltf.scene);
});

const plane = new THREE.PlaneGeometry( 1000,1000,500,500 );
const planeMaterial = new THREE.MeshLambertMaterial( {
    color: 0xf5f5f5 , 
} );
const planeMesh = new THREE.Mesh( plane, planeMaterial );
planeMesh.receiveShadow = true
planeMesh.position.set(0,-1,0);
planeMesh.rotation.x = -Math.PI/2
scene.add( planeMesh );

var ambient = new THREE.AmbientLight( 0xffffff );
scene.add( ambient );

var pointLight = new THREE.PointLight( 0xff0000, 0.5, 50);
pointLight.position.set( 6,15,0 );
scene.add( pointLight );
scene.add(new THREE.PointLightHelper(pointLight,1,0x00ff00))

var spotlight = new THREE.SpotLight( 0xffffff ,100, 100, Math.PI/8 );
spotlight.position.set(6,15,-8)
spotlight.castShadow = true
scene.add(spotlight)

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, cam);
}

animate();
