import * as THREE from "three";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

// SCENE, CAMERA, RENDERER
const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    1,
    100
);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap

// CAM POSITION
// cam.position.x = 0;
cam.position.y = 17;
cam.position.z = 22;

document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(cam, renderer.domElement);

// 3D MODEL
// KEYBOARD
const keyboardLoader = new GLTFLoader();
keyboardLoader.load('asset/keyboard/scene.gltf', (gltf) => {
    var keyboard = gltf.scene.children[0];
    keyboard.scale.set(0.008, 0.008, 0.008);
    keyboard.position.set(-5.4,10.7,3);
    scene.add(gltf.scene);
});

// MOUSE
const mouseLoader = new GLTFLoader();
mouseLoader.load('asset/mouse/scene.gltf', (gltf) => {
    var mouse = gltf.scene.children[0];
    mouse.scale.set(0.002,0.002,0.002);
    mouse.rotation.set(Math.PI/2, 0, Math.PI/2);
    mouse.position.set(4.2,11.5,3);
    scene.add(gltf.scene);
});

// MONITOR
const monitorLoader = new GLTFLoader();
monitorLoader.load('asset/monitor/scene.gltf', (gltf) => {
    var monitor = gltf.scene.children[0];
    monitor.scale.set(1.2,1,1);
    monitor.position.set(-3,15.2,0);
    scene.add(gltf.scene);
});

// PC
const pcLoader = new GLTFLoader();
pcLoader.load('asset/pc/scene.gltf', (gltf) => {
    var pc = gltf.scene.children[0];
    pc.scale.set(0.78, 0.78, 0.78);
    pc.position.set(10,15,1.4);
    scene.add(gltf.scene);
});

// MOUSEPAD
const mousepadLoader = new GLTFLoader();
mousepadLoader.load('asset/mousepad/scene.gltf', (gltf) => {
    var mousepad = gltf.scene.children[0];
    mousepad.scale.set(0.7, 0.7, 0.7);
    mousepad.position.set(-2, 10.2, 1.7);
    scene.add(gltf.scene);
});

// TABLE
const tableLoader = new GLTFLoader();
tableLoader.load('asset/table/scene.gltf', (gltf) => {
    var table = gltf.scene.children[0];
    table.scale.set(8, 8, 8);
    table.position.set(0,0,0);
    scene.add(gltf.scene);
});

// PLANE
const plane = new THREE.PlaneGeometry( 1000,1000,500,500 );
const planeMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff });
const planeMesh = new THREE.Mesh( plane, planeMaterial );
planeMesh.receiveShadow = true
planeMesh.position.set(-10,-1,0);
planeMesh.rotation.x = -Math.PI/2;
scene.add( planeMesh );


// LIGHTING
var ambient = new THREE.AmbientLight( 0xffffff, 0.02);
scene.add( ambient );

var hemi = new THREE.HemisphereLight(0x404040, 0x000000, 1);
scene.add(hemi);

var pointLight = new THREE.PointLight( 0xfffaaa, 100.0, 50);
pointLight.position.set( 4,20,2 );
pointLight.castShadow = true;
scene.add( pointLight );
scene.add(new THREE.PointLightHelper(pointLight,1,0x00ff00));

var pointLight1 = new THREE.PointLight( 0xfffaaa, 100.0, 50);
pointLight1.position.set( -5,20,2 );
pointLight1.castShadow = true;
scene.add( pointLight1 );
scene.add(new THREE.PointLightHelper(pointLight1,1,0x00ff00));

var spotlight = new THREE.SpotLight( 0xffffff ,5.0, 5);
spotlight.position.set(2,15,0);
spotlight.target.position.set(3,1,0);
spotlight.castShadow = true;
scene.add(spotlight);


// SHOW MODEL
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, cam);
}

animate();
