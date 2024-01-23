// model_loader.js
import * as THREE from "three";
import { GLTFLoader } from "./node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import { TweenMax, Power2 } from "./node_modules/gsap/gsap-core.js";

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
      new THREE.SphereGeometry(0.3, 32),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        opacity: 0.8,
        transparent: true,
      })
    );
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
        const newPosition = new THREE.Vector3(
          targetX,
          targetY + zoom,
          targetZ + zoom
        );

        var newCam = cam.position.copy(newPosition);

        // Make the camera look at the specified coordinates
        const targetPosition = new THREE.Vector3(targetX, targetY, targetZ);
        cam.lookAt(targetPosition);

        TweenMax.to(newCam, 1, {
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z,
          ease: Power2.easeInOut,
          onComplete: showTextInCard(),
        });

        // Update the controls if necessary
        zoomin.target.copy(targetPosition);
        zoomin.update();

        function showTextInCard() {
          const card = document.createElement("div");
          card.innerHTML =
            '<p style="font-weight: bold; font-family: \'Gill Sans\', \'Gill Sans MT\', Calibri, \'Trebuchet MS\', sans-serif; font-size: 15px;></p><p style="font-family: \'Gill Sans\', \'Gill Sans MT\', Calibri, \'Trebuchet MS\', sans-serif; font-size: 10px;>MOUSE<br>Shows the location of the cursor on the monitor screen</p>';

          card.style.position = "fixed";
          card.style.top = "70px";
          card.style.left = "50%";
          card.style.transform = "translate(-50%, -50%)";
          card.style.backgroundColor = "white";
          card.style.padding = "20px";
          card.style.width = "450px";
          card.style.height = "80px";
          card.style.borderRadius = "10px";
          card.style.alignItems = "center";

          document.body.appendChild(card);

          document.addEventListener("keydown", closeCard);

          function closeCard() {
            if (card) {
              // Remove the card from the DOM
              card.remove();
              // Remove the event listener to prevent multiple closings
              document.removeEventListener("keydown", closeCardOnKeyPress);
            }
          }

          // Event listener function to close the card on any key press
          function closeCardOnKeyPress() {
            closeCard();
          }
        }
      } 
      else if (selected.name == "buttonKeyboard") {
        console.log("zoom keyboard");
        // ZOOM ANIMATION KE KEYBOARD
        const targetX = zoomX;
        const targetY = zoomY;
        const targetZ = zoomZ;

        const zoom = zoomFactor;
        const newPosition = new THREE.Vector3(
          targetX,
          targetY + zoom,
          targetZ + zoom
        );

        var newCam = cam.position.copy(newPosition);

        // Make the camera look at the specified coordinates
        const targetPosition = new THREE.Vector3(targetX, targetY, targetZ);
        cam.lookAt(targetPosition);

        TweenMax.to(newCam, 1, {
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z,
          ease: Power2.easeInOut,
          onComplete: showTextInCard(),
        });

        // Update the controls if necessary
        zoomin.target.copy(targetPosition);
        zoomin.update();

        function showTextInCard() {
          const card = document.createElement("div");
          card.innerHTML =
          '<p style="font-weight: bold; font-family: \'Gill Sans\', \'Gill Sans MT\', Calibri, \'Trebuchet MS\', sans-serif; font-size: 15px;></p><p style="font-family: \'Gill Sans\', \'Gill Sans MT\', Calibri, \'Trebuchet MS\', sans-serif; font-size: 10px;>KEYBOARD<br>For typing purposes</p>';

          card.style.position = "fixed";
          card.style.top = "70px";
          card.style.left = "50%";
          card.style.transform = "translate(-50%, -50%)";
          card.style.backgroundColor = "white";
          card.style.padding = "20px";
          card.style.width = "450px";
          card.style.height = "80px";
          card.style.borderRadius = "10px";
          card.style.alignItems = "center";

          document.body.appendChild(card);

          document.addEventListener("keydown", closeCard);

          function closeCard() {
            if (card) {
              // Remove the card from the DOM
              card.remove();
              // Remove the event listener to prevent multiple closings
              document.removeEventListener("keydown", closeCardOnKeyPress);
            }
          }

          // Event listener function to close the card on any key press
          function closeCardOnKeyPress() {
            closeCard();
          }
        }
      } 
      else if (selected.name == "buttonMonitor") {
        console.log("zoom monitor");
        // ZOOM ANIMATION KE MONITOR
        const targetX = zoomX;
        const targetY = zoomY;
        const targetZ = zoomZ;

        const zoom = zoomFactor;
        const newPosition = new THREE.Vector3(targetX, targetY, targetZ + zoom);

        var newCam = cam.position.copy(newPosition);

        // Make the camera look at the specified coordinates
        const targetPosition = new THREE.Vector3(targetX, targetY, targetZ);
        cam.lookAt(targetPosition);

        TweenMax.to(newCam, 1, {
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z,
          ease: Power2.easeInOut,
          onComplete: showTextInCard(),
        });

        // Update the controls if necessary
        zoomin.target.copy(targetPosition);
        zoomin.update();

        function showTextInCard() {
          const card = document.createElement("div");
          card.innerHTML =
          '<p style="font-weight: bold; font-family: \'Gill Sans\', \'Gill Sans MT\', Calibri, \'Trebuchet MS\', sans-serif; font-size: 15px;></p><p style="font-family: \'Gill Sans\', \'Gill Sans MT\', Calibri, \'Trebuchet MS\', sans-serif; font-size: 10px;>MONITOR<br>Has many types, such as size (21&quot;, 24&quot;, 32&quot;, etc.), refresh rate (60hz, 75hz, 144hz, etc.)</p>';

          card.style.position = "fixed";
          card.style.top = "70px";
          card.style.left = "50%";
          card.style.transform = "translate(-50%, -50%)";
          card.style.backgroundColor = "white";
          card.style.padding = "20px";
          card.style.width = "450px";
          card.style.height = "80px";
          card.style.borderRadius = "10px";
          card.style.alignItems = "center";

          document.body.appendChild(card);

          document.addEventListener("keydown", closeCard);

          function closeCard() {
            if (card) {
              // Remove the card from the DOM
              card.remove();
              // Remove the event listener to prevent multiple closings
              document.removeEventListener("keydown", closeCardOnKeyPress);
            }
          }

          // Event listener function to close the card on any key press
          function closeCardOnKeyPress() {
            closeCard();
          }
        }
      } else if (selected.name == "buttonPC") {
        console.log("zoom PC");
        // ZOOM ANIMATION KE PC
        const targetX = zoomX;
        const targetY = zoomY;
        const targetZ = zoomZ;

        const zoom = zoomFactor;
        const newPosition = new THREE.Vector3(targetX - zoom, targetY, targetZ);

        var newCam = cam.position.copy(newPosition);

        // Make the camera look at the specified coordinates
        const targetPosition = new THREE.Vector3(targetX - 2, targetY, targetZ);
        cam.lookAt(targetPosition);

        TweenMax.to(newCam, 1, {
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z,
          ease: Power2.easeInOut,
          onComplete: showTextInCard(),
        });

        // Update the controls if necessary
        zoomin.target.copy(targetPosition);
        zoomin.update();

        function showTextInCard() {
          const card = document.createElement("div");
          card.innerHTML =
          '<p style="font-weight: bold; font-family: \'Gill Sans\', \'Gill Sans MT\', Calibri, \'Trebuchet MS\', sans-serif; font-size: 15px;></p><p style="font-family: \'Gill Sans\', \'Gill Sans MT\', Calibri, \'Trebuchet MS\', sans-serif; font-size: 10px;>PC (Personal Computer)<br>There is a processor, memory, graphics card, and storage</p>';

          card.style.position = "fixed";
          card.style.top = "70px";
          card.style.left = "50%";
          card.style.transform = "translate(-50%, -50%)";
          card.style.backgroundColor = "white";
          card.style.padding = "20px";
          card.style.width = "450px";
          card.style.height = "80px";
          card.style.borderRadius = "10px";
          card.style.alignItems = "center";

          document.body.appendChild(card);

          document.addEventListener("keydown", closeCard);

          function closeCard() {
            if (card) {
              // Remove the card from the DOM
              card.remove();
              // Remove the event listener to prevent multiple closings
              document.removeEventListener("keydown", closeCardOnKeyPress);
            }
          }

          // Event listener function to close the card on any key press
          function closeCardOnKeyPress() {
            closeCard();
          }
        }
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
