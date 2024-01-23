export function pointerCam(controls) {
  let pointerElement = document.querySelector("#pointer");
  const pointerX = window.innerWidth / 2;
  const pointerY = window.innerHeight / 2;
  pointerElement.style.left = pointerX + "px";
  pointerElement.style.top = pointerY + "px";
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
}

let keyboardControls = [];
addEventListener("keydown", (e) => {
  keyboardControls[e.key] = true;
});
addEventListener("keyup", (e) => {
  keyboardControls[e.key] = false;
});

export function processKeyboard(controls, delta) {
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
