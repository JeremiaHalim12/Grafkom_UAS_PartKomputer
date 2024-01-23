import * as THREE from "three";

export function play(cam) {
  let listener = new THREE.AudioListener();
  cam.add(listener);
  let music = new THREE.Audio(listener);
  let loader = new THREE.AudioLoader().load('asset/audio/dream.mp3', (e)=>{
    music.setBuffer(e);
    music.setLoop(true);
    music.setVolume(0.5);
    music.play();
  });
  
  addEventListener('keydown', (event)=>{
    if (event.key == "m"){
        if (music.isPlaying) {
            music.pause();
        }
        else {
            music.play();
        }
    }
  });
}