// model_loader.js
import * as THREE from "three";
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { Raycaster } from 'three';
import { TweenMax, Power2 } from "./node_modules/gsap/gsap-core.js";

export function modelLoader(scene, filePath, scale, rotation, position, cam, createClickable = true, circlePosition, zoomFactor) {
    const loader = new GLTFLoader();
    const raycaster = new Raycaster();
    const mouse = new THREE.Vector2();

    // Initialize clickableObjects array
    raycaster.clickableObjects = [];

    loader.load(filePath, (gltf) => {
        var loader = gltf.scene.children[0];
        loader.scale.set(scale.x, scale.y, scale.z);
        loader.rotation.set(rotation.x, rotation.y, rotation.z);
        loader.position.set(position.x, position.y, position.z);
        scene.add(gltf.scene);

        // Check if a clickable circle should be created
        if (createClickable) {
            // Create clickable circle
            const clickableCircle = new THREE.Mesh(new THREE.CircleGeometry(1, 32), new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true }));
            // clickableCircle.rotation.set(crotation.x, crotation.y, crotation.z);
            clickableCircle.position.copy(circlePosition || position);
            clickableCircle.userData.clickable = true;
            scene.add(clickableCircle);

            // Add to clickableObjects array
            raycaster.clickableObjects.push(clickableCircle);
        }
    });

    // Add raycasting logic
    window.addEventListener('click', onClick);

    function onClick(event) {
        // Calculate mouse position in normalized device coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Ensure the camera is an instance of THREE.PerspectiveCamera
        if (!(cam instanceof THREE.PerspectiveCamera)) {
            console.error('Invalid camera type. Please use a PerspectiveCamera.');
            return;
        }

        // Update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, cam);

        // Calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(raycaster.clickableObjects);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;
            handleButtonClick(clickedObject, cam, zoomFactor);
        }
    }
}

// Function to handle button click
function handleButtonClick(clickedObject, cam, zoomFactor) {
    // Zoom in to the clicked object
    const targetPosition = clickedObject.position.clone().add(new THREE.Vector3(0, 0, zoomFactor || 5));
    TweenMax.to(cam.position, 1, { x: targetPosition.x, y: targetPosition.y, z: targetPosition.z, ease: Power2.easeInOut });
}
