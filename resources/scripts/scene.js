import * as THREE from "./three.js-r112/build/three.module.js";
import {
    OrbitControls
} from "./three.js-r112/examples/jsm/controls/OrbitControls.js";
import {addObjects, count as objCount, animFunctions} from './objects.js';
import {addPlane} from './utility.js';
import {load} from './loader.js';
export {
    SCENE, THREE, scene, clockDelta, increment
};

const SCENE = () => {};

const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// camera setup
const fov = 75;
const aspect = 2;
const near = 0.1;
const far = 50;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(5, 0, 10);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// orbit controls
let controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = false;
controls.enableDamping = true;
//scene.add(controls);

// scene setup
const scene = new THREE.Scene();

const buildScene = async() => {
    const objPath = './resources/models/heart.glb';
    
    const loaded = await Promise.all([
        (async() => {
            await load(objPath);
        })()
    ]);

    //addPlane();
    addObjects();
    addLights();
    
    animate();
    onWindowResize();
}

buildScene();

let clock = new THREE.Clock();
clock.start();
let increment = 1;
let clockDelta = 0;

let middleLight = {};

// animation function
function animate() {
    requestAnimationFrame(animate);

    clockDelta = clock.getDelta();
    //cube.rotation.y += increment * clock.getDelta();
    
    // animate light
    //middleLight.intensity = Math.PI/4 + Math.cos(clock.elapsedTime);
    
    // update controls
    controls.update();
    
    // run each object's custom animation function.
    for (let x = 0; x < objCount; x++) {
        //scene.getObjectByName('ActiveObject'+x).userData.anim(x);
        let objLocal = scene.getObjectByName('ActiveObject'+x);
        objLocal.userData.anim(objLocal);
//        animFunctions[x](objLocal);
    }
    
    renderer.render(scene, camera);
}



// listen for resize events.
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    let w = window.innerWidth, h = window.innerHeight;
    
    camera.aspect =  w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
}




// Add lights.
function addLights() {
    scene.background = new THREE.Color(0xcc0000);
    
    let light = new THREE.PointLight();
    light.name = 'centerLight';
    scene.add(light);
    
//    let light2 = new THREE.PointLight();
//    light2.intensity = 0.5;
//    light2.position.set(5, 5, 5);
//    scene.add(light2);
    
    let hemi = new THREE.HemisphereLight(0xff0000, 0xaa0000, 0.5);
    scene.add(hemi);
    middleLight = scene.getObjectByName('centerLight')
    
//    let ambLight = new THREE.AmbientLight(0xffffff);
//    ambLight.intensity = 0.2;
//    scene.add(ambLight);
}