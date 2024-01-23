import * as THREE from "three";
import { RectAreaLightHelper } from "./node_modules/three/examples/jsm/helpers/RectAreaLightHelper.js";

export function showLight(scene) {
  var ambient = new THREE.AmbientLight(0xffffff, 0.02);
  scene.add(ambient);

  // LAMPU TIDUR
  var lampu = new THREE.DirectionalLight(0xfffaaa, 2);
  lampu.position.set(45, 16, 4);
  lampu.target.position.set(45, 0, 4);
  lampu.target.updateMatrixWorld();
  lampu.castShadow = true;
  scene.add(lampu);
  // scene.add(new THREE.DirectionalLightHelper(lampu, 2, 0x00ff00));
  var lampuGlow = new THREE.PointLight(0xfffaaa, 150.0, 2);
  lampuGlow.position.set(45, 16, 4);
  lampuGlow.castShadow = true;
  scene.add(lampuGlow);
  // scene.add(new THREE.PointLightHelper(lampuGlow, 1, 0x00ff00));

  // LAMPU PC
  var directionalPCKiri = new THREE.DirectionalLight(0xfffaaa, 1);
  directionalPCKiri.position.set(0, 20, 2);
  directionalPCKiri.target.position.set(0, 0, 2);
  directionalPCKiri.target.updateMatrixWorld();
  directionalPCKiri.castShadow = true;
  scene.add(directionalPCKiri);
  // scene.add(new THREE.DirectionalLightHelper(directionalPCKiri, 2, 0x00ff00));

  // LAMPU PINK
  var picture = new THREE.DirectionalLight(0xff10ff, 0.5);
  picture.position.set(23, 20, 67);
  picture.target.position.set(23, 0, 65);
  picture.target.updateMatrixWorld();
  // picture.castShadow = true;
  scene.add(picture);
  // scene.add(new THREE.DirectionalLightHelper(picture, 2, 0x00ff00));


  // CEILING STRIP LIGHT
  const rectLight = new THREE.RectAreaLight(0xfffaaa, 8.0, 150, 1);
  rectLight.position.set(-23, 34.5, -6);
  rectLight.rotation.set(0,Math.PI/-2,0);
  scene.add(rectLight);
  // scene.add(new RectAreaLightHelper(rectLight, 0x00ff00));
  const rectLight1 = new THREE.RectAreaLight(0xfffaaa, 10.0, 80, 1);
  rectLight1.position.set(15, 34.5, -7.25);
  rectLight1.rotation.set(Math.PI,0,0);
  scene.add(rectLight1);
  // scene.add(new RectAreaLightHelper(rectLight1, 0x00ff00));
  const rectLight2 = new THREE.RectAreaLight(0xfffaaa, 10.0, 150, 1);
  rectLight2.position.set(-23, 34.5, 67);
  scene.add(rectLight2);
  // scene.add(new RectAreaLightHelper(rectLight2, 0x00ff00));
}
