import * as THREE from "./node_modules/three/build/three.module.js";
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';

// scene, camera, renderer
const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    100
);
const renderer = new THREE.WebGLRenderer();
cam.position.z = 10;
cam.position.y = 2;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(cam, renderer.domElement);

// var ambient = new THREE.AmbientLight(0x404040, 0.15);
// scene.add(ambient);

var plane = new THREE.PlaneGeometry(1000, 1000, 500, 500);
var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
var planeMesh = new THREE.Mesh(plane, planeMaterial);
planeMesh.receiveShadow = true;
planeMesh.position.set(-10, -1, 0);
planeMesh.rotation.x = -Math.PI / 2;
scene.add(planeMesh);

// var pointLight = new THREE.PointLight(0xfffaaa, 2, 50);
// pointLight.position.set(2, 4, -1);
// pointLight.castShadow = true;
// scene.add(pointLight);

window.addEventListener("resize", function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    cam.aspect = width / height;
    cam.updateProjectionMatrix();
});

function draw() {
    controls.update();
    renderer.render(scene, cam);
    requestAnimationFrame(draw);
}
draw();