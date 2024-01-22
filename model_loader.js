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
  bulatObject
) {
  const loader = new GLTFLoader();
  let rayCast = new THREE.Raycaster();
  let mouse = {};
  let selected;
  let arrow = new THREE.ArrowHelper(
    rayCast.ray.direction,
    cam.position,
    50,
    0xff0000
  );
  scene.add(arrow);

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

  if (createClickable) {
    // Object bulat
    const clickableCircle = new THREE.Mesh(
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
    let items = rayCast.intersectObjects(scene.children);
    arrow.setDirection(rayCast.ray.direction);

    items.forEach((i) => {
      if (i.object.name != "") {
        console.log(i.object.name);
        selected = i.object;
      }
    });
  });

  if (selected == "buttonMouse") {
    // ZOOM ANIMATION KE MOUSE
  }
}

// export function modelLoader(
//   scene,
//   filePath,
//   scale,
//   rotation,
//   position,
//   zoomin,
//   cam,
//   createClickable = true,
//   circlePosition,
//   zoomFactor,
//   zoomX,
//   zoomY,
//   zoomZ
// ) {
//   const loader = new GLTFLoader();
//   const raycaster = new Raycaster();
//   const mouse = new THREE.Vector2();

//   // Initialize clickableObjects array
//   raycaster.clickableObjects = [];

//   loader.load(filePath, (gltf) => {
//     var loader = gltf.scene.children[0];
//     loader.scale.set(scale.x, scale.y, scale.z);
//     loader.rotation.set(rotation.x, rotation.y, rotation.z);
//     loader.position.set(position.x, position.y, position.z);
//     loader.receiveShadow = true;
//     loader.castShadow = true;
//     scene.add(gltf.scene);

//     // Check if a clickable circle should be created
//     if (createClickable) {
//       // Create clickable circle
//       const clickableCircle = new THREE.Mesh(
//         new THREE.CircleGeometry(0.4, 32),
//         new THREE.MeshBasicMaterial({
//           color: 0xffffff,
//           opacity: 0.8,
//           transparent: true,
//         })
//       );
//       // clickableCircle.rotation.set(crotation.x, crotation.y, crotation.z);
//       clickableCircle.position.copy(circlePosition || position);
//       clickableCircle.userData.clickable = true;
//       scene.add(clickableCircle);

//       // Add to clickableObjects array
//       raycaster.clickableObjects.push(clickableCircle);
//     }
//   });

//   // Add raycasting logic
//   window.addEventListener("click", onClick);

//   function onClick(event) {
//     // Calculate mouse position in normalized device coordinates
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * -2 + 1;

//     // Ensure the camera is an instance of THREE.PerspectiveCamera
//     if (!(cam instanceof THREE.PerspectiveCamera)) {
//       console.error("Invalid camera type. Please use a PerspectiveCamera.");
//       return;
//     }

//     // Update the picking ray with the camera and mouse position
//     raycaster.setFromCamera(mouse, cam);

//     // Calculate objects intersecting the picking ray
//     const intersects = raycaster.intersectObjects(raycaster.clickableObjects);

//     // if (intersects.length > 0) {
//     //     const targetPosition = intersects[0].point;
//     //     handleButtonClick(zoomin, cam, zoomFactor, targetPosition);
//     //   }

//     handleButtonClick(zoomin, cam, zoomFactor, zoomX, zoomY, zoomZ);
//   }
// }

// // Function to handle button click
// function handleButtonClick(zoomin, cam, zoomFactor, zoomX, zoomY, zoomZ) {
//     // https://chat.openai.com/share/a88a3597-c6e9-4d2c-b45b-3b6027cc3b3a
//     // https://chat.openai.com/share/55471b1f-f008-4133-8672-e2e5aa1a956e
//   // Zoom in to the clicked object
//   const targetX = zoomX;
//   const targetY = zoomY;
//   const targetZ = zoomZ;

//   const zoom = zoomFactor;
//   const newPosition = new THREE.Vector3(targetX, targetY, targetZ + zoom);

//   cam.position.copy(newPosition);

//   // Make the camera look at the specified coordinates
//   const targetPosition = new THREE.Vector3(targetX, targetY, targetZ);
//   cam.lookAt(targetPosition);

//   // Update the controls if necessary
//   zoomin.target.copy(targetPosition);
//   zoomin.update();
// }
