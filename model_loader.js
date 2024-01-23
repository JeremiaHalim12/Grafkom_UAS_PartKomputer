// model_loader.js
import * as THREE from "three";
import { GLTFLoader } from "./node_modules/three/examples/jsm/loaders/GLTFLoader.js";

export function modelLoader(
  scene,
  filePath,
  name,
  scale,
  rotation,
  position,
  pointerElement,
  cam,
  createClickable = true,
  circlePosition,
  bulatObject,
  zoomFactor,
  zoomin,
  zoomX,
  zoomY,
  zoomZ
) {
  const loader = new GLTFLoader();
  let rayCast = new THREE.Raycaster();
  let mouse = {};
  let selected;
  // let arrow = new THREE.ArrowHelper(
  //   rayCast.ray.direction,
  //   cam.position,
  //   50,
  //   0xff0000
  // );
  // scene.add(arrow);

  loader.load(filePath, (gltf) => {
    var loader = gltf.scene.children[0];
    loader.scale.set(scale.x, scale.y, scale.z);
    loader.rotation.set(rotation.x, rotation.y, rotation.z);
    loader.position.set(position.x, position.y, position.z);
    loader.receiveShadow = true;
    loader.castShadow = true;
    loader.name = name;
    scene.add(gltf.scene);
  });

  let clickableCircle;
  if (createClickable) {
    // Object bulat
    clickableCircle = new THREE.Mesh(
      new THREE.CircleGeometry(0.4, 32),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        opacity: 0.8,
        transparent: true,
      })
    );
    // clickableCircle.rotation.set(crotation.x, crotation.y, crotation.z); ==> buat putar object bulat
    clickableCircle.position.copy(circlePosition || position);
    clickableCircle.userData.clickable = true;
    clickableCircle.name = bulatObject;
    scene.add(clickableCircle);
  }

  addEventListener("mousedown", (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * -2 + 1;
    // console.log(mouse);

    const pointerX = window.innerWidth / 2;
    const pointerY = window.innerHeight / 2;

    pointerElement.style.left = pointerX + "px";
    pointerElement.style.top = pointerY + "px";

    rayCast.setFromCamera(mouse, cam);
    const intersects = rayCast.intersectObjects([clickableCircle]);
    // let items = rayCast.intersectObjects(scene.children);
    // arrow.setDirection(rayCast.ray.direction);

    if (intersects.length > 0) {
      selected = intersects[0].object;

      console.log("clicked object:", selected.name);

      if (selected.name == "buttonMouse") {
        console.log("zoom mouse");
        // ZOOM ANIMATION KE MOUSE
        const targetX = zoomX;
        const targetY = zoomY;
        const targetZ = zoomZ;

        const zoom = zoomFactor;
        const newPosition = new THREE.Vector3(targetX, targetY, targetZ + zoom);

        cam.position.copy(newPosition);

        // Make the camera look at the specified coordinates
        const targetPosition = new THREE.Vector3(targetX, targetY, targetZ);
        cam.lookAt(targetPosition);

        // Update the controls if necessary
        zoomin.target.copy(targetPosition);
        zoomin.update();
      } 
      else if (selected.name == "buttonKeyboard") {
        console.log("zoom keyboard");
        // ZOOM ANIMATION KE KEYBOARD
        const targetX = zoomX;
        const targetY = zoomY;
        const targetZ = zoomZ;

        const zoom = zoomFactor;
        const newPosition = new THREE.Vector3(targetX, targetY, targetZ + zoom);

        cam.position.copy(newPosition);

        // Make the camera look at the specified coordinates
        const targetPosition = new THREE.Vector3(targetX, targetY, targetZ);
        cam.lookAt(targetPosition);

        // Update the controls if necessary
        zoomin.target.copy(targetPosition);
        zoomin.update();
      }
      else if (selected.name == "buttonMonitor") {
        console.log("zoom monitor");
        // ZOOM ANIMATION KE MONITOR
        const targetX = zoomX;
        const targetY = zoomY;
        const targetZ = zoomZ;

        const zoom = zoomFactor;
        const newPosition = new THREE.Vector3(targetX, targetY, targetZ + zoom);

        cam.position.copy(newPosition);

        // Make the camera look at the specified coordinates
        const targetPosition = new THREE.Vector3(targetX, targetY, targetZ);
        cam.lookAt(targetPosition);

        // Update the controls if necessary
        zoomin.target.copy(targetPosition);
        zoomin.update();
      }
    }

    // items.forEach((i) => {
    //   if (i.object.userData.clickable) {
    //     console.log(i.object.name);
    //     selected = i.object;
    //   }
    // });
  });
}