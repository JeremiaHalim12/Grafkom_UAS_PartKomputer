import * as THREE from "three";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
import { PointerLockControls } from "./node_modules/three/examples/jsm/controls/PointerLockControls.js";
import * as lib from "./model_loader.js";

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
renderer.shadowMap.type = THREE.BasicShadowMap;

// CAM POSITION
cam.position.y = 17;
cam.position.z = 22;

document.body.appendChild(renderer.domElement);

let controls = new PointerLockControls(cam, renderer.domElement);
let clock = new THREE.Clock();
let pointerElement = document.querySelector("#pointer");
instructions.addEventListener("click", function () {
  controls.lock();
});

controls.addEventListener("lock", function () {
  instructions.style.display = "none";
  blocker.style.display = "none";
});

controls.addEventListener("unlock", function () {
  blocker.style.display = "block";
  instructions.style.display = "";
});

let keyboardControls = [];
addEventListener("keydown", (e) => {
  keyboardControls[e.key] = true;
});
addEventListener("keyup", (e) => {
  keyboardControls[e.key] = false;
});

function processKeyboard(delta) {
  let speed = 12;
  let actualSpeed = speed * delta;
  if (keyboardControls["w"]) {
    controls.moveForward(actualSpeed);
  }
  if (keyboardControls["s"]) {
    controls.moveForward(-actualSpeed);
  }
  if (keyboardControls["a"]) {
    controls.moveRight(-actualSpeed);
  }
  if (keyboardControls["d"]) {
    controls.moveRight(actualSpeed);
  }
}

// // 3D MODEL
// var room = lib.modelLoader(
//     scene,
//     'asset/room/scene.gltf',
//     { x: 18, y: 18, z: 18 },
//     { x: Math.PI / 2, y: Math.PI, z: Math.PI / 2 },
//     { x: 9, y: 0, z: 33 },
//     cam,
//     false
// );

// AUDIO
// const listener = new THREE.AudioListener();
// const audioLoader = new THREE.AudioLoader();
// const audio = new THREE.Audio(listener);

// audioLoader.load("asset/audio/AUDIO.mp3", function (buffer) {
//   audio.setBuffer(buffer);
//   audio.setLoop(true);
//   audio.setVolume(0.5);
//   audio.play();
// });

//SOFA
// var sofa = lib.modelLoader(
//     scene,
//     'asset/sofa/scene.gltf',
//     { x: 0.035, y: 0.035, z: 0.035 },
//     { x: Math.PI/2, y: Math.PI, z: 0 },
//     { x: -5, y: 0, z: 15 }
// );

// // KEYBOARD
// var keyboardModel = lib.modelLoader(
//     scene,
//     'asset/keyboard/scene.gltf',
//     { x: 0.008, y: 0.008, z: 0.008 },
//     { x: Math.PI / 2, y: Math.PI, z: Math.PI },
//     { x: -5.4, y: 10.7, z: 3 },
//     controls,
//     cam,
//     true,
//     { x: -2.7, y: 13, z: 5 },
//     7
// );

// MOUSE
// var mouse = lib.modelLoader(
//     scene,
//     'asset/mouse/scene.gltf',
//     { x: 0.002, y: 0.002, z: 0.002 },
//     { x: Math.PI / 2, y: 0, z: Math.PI / 2 },
//     { x: 4.2, y: 11.5, z: 3 },
//     controls,
//     cam,
//     true,
//     { x: 4.2, y: 12.5, z: 5 },
//     7,
//     4,
//     15,
//     3
// );
var mouse = lib.modelLoader(
  scene,
  "asset/mouse/scene.gltf",
  "mouse",
  { x: 0.002, y: 0.002, z: 0.002 },
  { x: Math.PI / 2, y: 0, z: Math.PI / 2 },
  {x: 4.2, y: 11.5, z: 3},
  pointerElement,
  cam,
  true,
  {x: 4.2, y: 12.5, z: 5},
  "buttonMouse"
);

// // MONITOR
// var monitor = lib.modelLoader(
//     scene,
//     'asset/monitor/scene.gltf',
//     { x: 1.2, y: 1, z: 1 },
//     { x: Math.PI / 2, y: 0, z: Math.PI },
//     { x: -3, y: 15.2, z: 0 },
//     controls,
//     cam,
//     true,
//     { x: -2.2, y: 14.5, z: 0.8 },
//     7,
//     10,
//     15,
//     2
// );

// // PC
// var pc = lib.modelLoader(
//     scene,
//     'asset/pc/scene.gltf',
//     { x: 0.78, y: 0.78, z: 0.78 },
//     { x: Math.PI / 2, y: Math.PI, z: Math.PI },
//     { x: 10, y: 15, z: 1.4 },
//     controls,
//     cam,
//     true,
//     { x: 10, y: 14.5, z: 0.8 },
//     7,
//     3,
//     15,
//     2
// );

// // MOUSEPAD
// var mousepad = lib.modelLoader(
//     scene,
//     'asset/mousepad/scene.gltf',
//     { x: 0.7, y: 0.7, z: 0.7 },
//     { x: Math.PI / 2, y: Math.PI, z: Math.PI },
//     { x: -2, y: 10.2, z: 1.7 },
//     cam,
//     false,
// );

// // TABLE
// var table = lib.modelLoader(
//     scene,
//     'asset/table/scene.gltf',
//     { x: 8, y: 8, z: 8 },
//     { x: Math.PI / 2, y: Math.PI, z: Math.PI },
//     { x: 0, y: 0, z: 0 },
//     cam,
//     false,
// );

// // CHAIR
// var chair = lib.modelLoader(
//     scene,
//     'asset/chair/scene.gltf',
//     { x: 0.035, y: 0.035, z: 0.035 },
//     { x: Math.PI / 2, y: Math.PI, z: 0 },
//     { x: -3.4, y: 0, z: 15 },
//     cam,
//     false,
// );

// PLANE
const plane = new THREE.PlaneGeometry(1000, 1000, 500, 500);
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
const planeMesh = new THREE.Mesh(plane, planeMaterial);
planeMesh.receiveShadow = true;
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
  // controls.update();
  let delta = clock.getDelta();
  processKeyboard(delta);
  renderer.render(scene, cam);
}

animate();
