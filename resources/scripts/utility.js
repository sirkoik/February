import {THREE, scene} from './scene.js';
import {size} from './objects.js';
export {randSign, addPlane};


// randSign: return -1 or +1 randomly.
function randSign() {
    return Math.random() >= 0.5? 1 : -1;
}

function addPlane() {
    let geometry = new THREE.PlaneBufferGeometry(size * 2, size * 2, 32);
    let material = new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide});
    let plane = new THREE.Mesh(geometry, material);
    
    plane.rotation.x = Math.PI / 2;
    //plane.position.x = -size / 2;
    //plane.position.z = -size / 2;
    
    scene.add(plane);
}