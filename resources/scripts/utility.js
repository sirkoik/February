import {THREE, scene} from './scene.js';
import {size} from './objects.js';
export {randSign, addPlane, addHelpers, getQueryVar};


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

function addHelpers() {
    let axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);
}

// getQueryVar: get a variable from the query string.
// @name name of query variable
function getQueryVar(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}