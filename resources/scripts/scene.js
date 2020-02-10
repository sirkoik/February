import * as THREE from "./three.js-r112/build/three.module.js";
import {
    OrbitControls
} from "./three.js-r112/examples/jsm/controls/OrbitControls.js";
import {addObjects, count as objCount, animFunctions} from './objects.js';
import {addPlane, addHelpers} from './utility.js';
import {load, loadEnvMap} from './loader.js';
import {loadFont, addText} from './3dtext.js';
import {getQueryVar} from './utility.js';
import {setProgressText, finishLoading} from './dom.js';
export {
    SCENE, THREE, scene, renderer, clock, clockDelta, increment, fontPath, fontText, setFontText,
    TEXT_OBJ_NAME
};

const SCENE = () => {};

// object and path constants
const TEXT_OBJ_NAME = 'vdayText';
//const fontPath = './resources/scripts/three.js-r112/examples/fonts/helvetiker_regular.typeface.json';
const fontPath = './resources/fonts/bright-beauty/Bright beauty_Regular.json';
const objPath = './resources/models/heart.glb';
//const envMapPath = './resources/textures/envmaps/autumn_meadow_1k.hdr';
const envMapPath = './resources/textures/envmaps/studio_small_02_1k.hdr';

// text
const DEFAULT_FONT_TEXT = 'Happy\nValentine\'s\nDay!';
let fontText = DEFAULT_FONT_TEXT;
function setFontText(text) {
    fontText = text;
}


// renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
//renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputEncoding = THREE.sRGBEncoding;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// camera setup
const fov = 75;
const aspect = 2;
const near = 0.1;
const far = 75;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 10);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// orbit controls
let controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = false;
controls.enableDamping = true;
//scene.add(controls);

// scene setup
const scene = new THREE.Scene();

const buildScene = async() => {
    
    // try to get font text based on query variable. base64 encoding is recommended for multi-line text.
    try {
        fontText = getQueryVar('base64') == 'true'? atob(getQueryVar('text')) : getQueryVar('text');
    } catch(e) {
        fontText = getQueryVar('text');
    }
    fontText = fontText != 'undefined' && fontText !== null? fontText : DEFAULT_FONT_TEXT;
    
    document.getElementById('text-custom-entry').value = fontText;
    
    const loaded = await Promise.all([
        (async() => {
            setProgressText(await load(objPath));
        })(),
        (async() => {
            setProgressText(await loadEnvMap(envMapPath));
        })(),
        (async() => {
            setProgressText(await loadFont(fontPath, fontText));
        })()
    ]);
    
    // hide loading overlay after all Promises have been fulfulled.
    finishLoading();

    //addPlane();
    //addHelpers();
    addFog();
    addObjects();
    addLights();
    addText(TEXT_OBJ_NAME);
    
    
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

function addPointLight(posX, posY, posZ, intensity) {
    let light = new THREE.PointLight();
    light.intensity = intensity || 1.0;
    //light.name = 'centerLight';
    light.position.set(posX, posY, posZ);
    scene.add(light);

    let pointLightHelper = new THREE.PointLightHelper(light, 2);
    scene.add(pointLightHelper);
}



// Add lights.
function addLights() {
    scene.background = new THREE.Color(0xcc0000);
    
//    addPointLight(0,0,0);
//    addPointLight(10,10,10,0.5);
//    addPointLight(-10,10,-10,0.5);
    
//    let light2 = new THREE.PointLight();
//    light2.intensity = 0.5;
//    light2.position.set(5, 5, 5);
//    scene.add(light2);
    
//    let hemi = new THREE.HemisphereLight(0xff0000, 0xaa0000, 0.5);
//    scene.add(hemi);
//    middleLight = scene.getObjectByName('centerLight');
    
//    let ambLight = new THREE.AmbientLight(0xffffff);
//    ambLight.intensity = 0.2;
//    scene.add(ambLight);
}


// Add fog.
function addFog() {
    let fog = new THREE.Fog(0xcc0000, 1, 20);
    scene.fog = fog;
}