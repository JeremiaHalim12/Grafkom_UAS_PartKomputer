import * as THREE from "three";
import { PointerLockControls } from "./node_modules/three/examples/jsm/controls/PointerLockControls.js";
import * as sky from "./sky.js";
import * as object from "./object.js";
import * as controller from "./controls.js";
import * as light from "./lighting.js";
import * as plane from "./plane.js";
import * as audio from "./audio.js";

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
cam.rotation.y = Math.PI/-3;
cam.position.x = -15;
cam.position.y = 15;
cam.position.z = 50;

document.body.appendChild(renderer.domElement);

let controls = new PointerLockControls(cam, renderer.domElement);
let clock = new THREE.Clock();
let pointerElement = document.querySelector("#pointer");
controller.pointerCam(controls, pointerElement);

// 3D MODEL

// AUDIO
audio.play(cam);

// OBJECT MODEL
object.atribut(scene, pointerElement, cam);
object.objectLoader(scene, pointerElement, cam);

// PLANE
// plane.lantai(scene);
plane.tembok(scene);

// SKY
sky.skyMap(scene);

// LIGHT
light.showLight(scene);

// SHOW MODEL
function animate() {
  requestAnimationFrame(animate);
  let delta = clock.getDelta();
  controller.processKeyboard(controls, delta);
  renderer.render(scene, cam);
}

animate();
