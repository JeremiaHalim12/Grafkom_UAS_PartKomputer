import * as THREE from "three";

export function lantai(scene) {
  const plane = new THREE.PlaneGeometry(1000, 1000, 500, 500);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const planeMesh = new THREE.Mesh(plane, planeMaterial);
  planeMesh.receiveShadow = true;
  planeMesh.position.set(-10, -1, 0);
  planeMesh.rotation.x = -Math.PI / 2;
  scene.add(planeMesh)
}

export function tembok(scene) {
  const tembok = new THREE.PlaneGeometry(80,37,500,500);
  const tembokTexture = new THREE.TextureLoader().load('asset/brick/marble.jpg');
  const tembokMat = new THREE.MeshLambertMaterial({map: tembokTexture});
  const tembokMesh = new THREE.Mesh(tembok, tembokMat);
  tembokMesh.receiveShadow = true;
  tembokMesh.position.set(-23, 18, 28);
  tembokMesh.rotation.y = Math.PI/2;
  scene.add(tembokMesh);
}
