import * as THREE from "three";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import * as lib from './model_loader.js';

// SCENE, CAMERA, RENDERER
const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    1,
    100
);
const renderer = new THREE.WebGLRenderer();

// scene.background = new THREE.Color(0xffffff);
// renderer.setPixelRatio(devicePixelRatio);

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
// ROOM
var room = lib.modelLoader(
    scene, 
    'asset/room/scene.gltf', 
    { x: 18, y: 18, z: 18 }, 
    { x: Math.PI / 2, y: Math.PI, z: Math.PI / 2 }, 
    {x: 9, y: 0, z: 33});

// KEYBOARD
var keyboard = lib.modelLoader(
    scene, 
    'asset/keyboard/scene.gltf', 
    { x: 0.008, y: 0.008, z: 0.008 },
    {x: Math.PI / 2, y: Math.PI, z: Math.PI},
    {x: -5.4, y: 10.7, z: 3},);

// MOUSE
var mouse = lib.modelLoader(
    scene, 
    'asset/mouse/scene.gltf', 
    { x: 0.002, y: 0.002, z: 0.002 },
    {x: Math.PI / 2, y: 0, z: Math.PI / 2},
    {x: 4.2, y: 11.5, z: 3},);

// MONITOR
var monitor = lib.modelLoader(
    scene, 
    'asset/monitor/scene.gltf', 
    { x: 1.2, y: 1, z: 1},
    {x: Math.PI / 2, y: 0, z: Math.PI},
    {x: -3, y: 15.2, z: 0},);

// PC
var pc = lib.modelLoader(
    scene, 
    'asset/pc/scene.gltf', 
    { x: 0.78, y: 0.78, z: 0.78},
    {x: Math.PI/2, y: Math.PI, z: Math.PI},
    {x: 10, y: 15, z: 1.4},);

// MOUSEPAD
var mousepad = lib.modelLoader(
    scene, 
    'asset/mousepad/scene.gltf', 
    { x: 0.7, y: 0.7, z: 0.7},
    {x: Math.PI/2, y: Math.PI, z: Math.PI},
    {x: -2, y: 10.2, z: 1.7},);

// TABLE
var table = lib.modelLoader(
    scene, 
    'asset/table/scene.gltf', 
    { x: 8, y: 8, z: 8},
    {x: Math.PI/2, y: Math.PI, z: Math.PI},
    {x: 0, y: 0, z: 0},);

// CHAIR
var chair = lib.modelLoader(
    scene, 
    'asset/chair/scene.gltf', 
    { x: 0.035, y: 0.035, z: 0.035},
    {x: Math.PI/2, y: Math.PI, z: 0},
    {x: -3.4, y: 0, z: 15},);

// PLANE
const plane = new THREE.PlaneGeometry(1000, 1000, 500, 500);
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
const planeMesh = new THREE.Mesh(plane, planeMaterial);
planeMesh.receiveShadow = true
planeMesh.position.set(-10, -1, 0);
planeMesh.rotation.x = -Math.PI / 2;
scene.add(planeMesh);


// LIGHTING
var ambient = new THREE.AmbientLight(0xffffff, 0.02);
scene.add(ambient);

var hemi = new THREE.HemisphereLight(0x404040, 0x000000, 1);
scene.add(hemi);

var pointLight = new THREE.PointLight(0xfffaaa, 100.0, 50);
pointLight.position.set(4, 20, 2);
pointLight.castShadow = true;
scene.add(pointLight);
scene.add(new THREE.PointLightHelper(pointLight, 1, 0x00ff00));

var pointLight1 = new THREE.PointLight(0xfffaaa, 100.0, 50);
pointLight1.position.set(-5, 20, 2);
pointLight1.castShadow = true;
scene.add(pointLight1);
scene.add(new THREE.PointLightHelper(pointLight1, 1, 0x00ff00));

var spotlight = new THREE.SpotLight(0xffffff, 5.0, 5);
spotlight.position.set(2, 15, 0);
spotlight.target.position.set(3, 1, 0);
spotlight.castShadow = true;
scene.add(spotlight);


// SHOW MODEL
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, cam);
}

animate();
