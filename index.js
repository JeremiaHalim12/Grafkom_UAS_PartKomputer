import * as THREE from "three";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

// scene, camera, renderer
const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    1,
    100
);
const renderer = new THREE.WebGLRenderer();
// scene.background = new THREE.Color(0x01060f);
// renderer.setPixelRatio(devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap

// cam position
cam.position.x = 10;
cam.position.y = 5;

document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(cam, renderer.domElement);

// var Grid = new THREE.GridHelper(100, 100, 0x0a0a0a, 0x000000);
// Grid.position.set(0, -1, 0);
// scene.add(Grid);

// Memuat model scene.gltf
const loader = new GLTFLoader();
loader.load('gaming_desktop_pc/scene.gltf', (gltf) => {
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshLambertMaterial();
        }
    });
    scene.add(gltf.scene);
});

const plane = new THREE.PlaneGeometry( 1000,1000,500,500 );
const planeMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff });
const planeMesh = new THREE.Mesh( plane, planeMaterial );
planeMesh.receiveShadow = true
planeMesh.position.set(-10,-1,0);
planeMesh.rotation.x = -Math.PI/2;
scene.add( planeMesh );

var ambient = new THREE.AmbientLight( 0xffffff, 0.02);
scene.add( ambient );

var hemi = new THREE.HemisphereLight(0x404040, 0x000000, 1);
scene.add(hemi);

var pointLight = new THREE.PointLight( 0xfffaaa, 2, 50);
pointLight.position.set( 1,6,1 );
pointLight.castShadow = true;
scene.add( pointLight );
scene.add(new THREE.PointLightHelper(pointLight,1,0x00ff00));

var spotlight = new THREE.SpotLight( 0xffffff ,2.0, 5);
spotlight.position.set(2,10,0);
spotlight.target.position.set(3,1,0);
spotlight.castShadow = true;
scene.add(spotlight);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, cam);
}

animate();
