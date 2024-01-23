import * as lib from "./model_loader.js";

export function objectLoader(scene, pointerElement, cam) {
  // MOUSE
  lib.modelLoader(
    scene,
    "asset/mouse/scene.gltf",
    "mouse",
    { x: 0.002, y: 0.002, z: 0.002 },
    { x: Math.PI / 2, y: 0, z: Math.PI / 2 },
    { x: 4.2, y: 11.5, z: 3 },
    pointerElement,
    cam,
    true,
    { x: 4.2, y: 12.5, z: 5 },
    "buttonMouse"
  );

  // KEYBOARD
  lib.modelLoader(
    scene,
    "asset/keyboard/scene.gltf",
    "keyboard",
    { x: 0.008, y: 0.008, z: 0.008 },
    { x: Math.PI / 2, y: Math.PI, z: Math.PI },
    { x: -5.4, y: 10.7, z: 3 },
    pointerElement,
    cam,
    true,
    { x: -2.7, y: 13, z: 5 },
    "buttonKeyboard"
  );

  // MONITOR
  lib.modelLoader(
    scene,
    "asset/monitor/scene.gltf",
    "monitor",
    { x: 1.2, y: 1, z: 1 },
    { x: Math.PI / 2, y: 0, z: Math.PI },
    { x: -3, y: 15.2, z: 0 },
    pointerElement,
    cam,
    true,
    { x: -2.2, y: 14.5, z: 0.8 },
    "buttonMonitor"
  );

  // PC
  lib.modelLoader(
    scene,
    "asset/pc/scene.gltf",
    "pc",
    { x: 0.78, y: 0.78, z: 0.78 },
    { x: Math.PI / 2, y: Math.PI, z: Math.PI },
    { x: 10, y: 15, z: 1.4 },
    pointerElement,
    cam,
    true,
    { x: 10, y: 14.5, z: 0.8 },
    "buttonPC"
  );
}

export function atribut(scene, pointerElement, cam) {
  // TABLE
  lib.modelLoader(
    scene,
    "asset/table/scene.gltf",
    "",
    { x: 8, y: 8, z: 8 },
    { x: Math.PI / 2, y: Math.PI, z: Math.PI },
    { x: 0, y: 0, z: 0 },
    pointerElement,
    cam,
    false
  );

  // CHAIR
  lib.modelLoader(
    scene,
    "asset/chair/scene.gltf",
    "",
    { x: 0.035, y: 0.035, z: 0.035 },
    { x: Math.PI / 2, y: Math.PI, z: 0 },
    { x: -3.4, y: 0, z: 15 },
    pointerElement,
    cam,
    false
  );

  // MOUSEPAD
  lib.modelLoader(
    scene,
    "asset/mousepad/scene.gltf",
    "",
    { x: 0.7, y: 0.7, z: 0.7 },
    { x: Math.PI / 2, y: Math.PI, z: Math.PI },
    { x: -2, y: 10.2, z: 1.7 },
    pointerElement,
    cam,
    false
  );

  // ROOM
  lib.modelLoader(
    scene,
    "asset/room1/scene.gltf",
    "",
    { x: 2, y: 2, z: 2 },
    { x: Math.PI/2, y: Math.PI, z: 0 },
    { x: 57, y: -5, z: 30 },
    pointerElement,
    cam,
    false
  );
}
