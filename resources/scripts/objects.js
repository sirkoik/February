import {THREE, scene, clockDelta, increment} from './scene.js';
import {randSign} from './utility.js';
export {addObjects, size, count, animFunctions};

let size = 10;
let count = 100;
let objScale = 1;
let posArray = [];

let minThreshold = -size;
let maxThreshold = size;

// placeholder object

/*let box = new THREE.Box3();
box.setFromCenterAndSize(
    new THREE.Vector3(1, 1, 1),
    new THREE.Vector3(1, 1, 1)
);

let cube = new THREE.Box3Helper(box, 0x0000ff);*/

const cubeGeometry = new THREE.BoxBufferGeometry(objScale, objScale, objScale);
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    transparent: true
});

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

const animFunctions = [];

// getRandomObject: Get a random object.
// In this case, the object is loaded into the "Scene" object from gltf.
function getRandomObject() {
    //let newObj = cube.clone();
    //newObj.material = new THREE.MeshBasicMaterial().copy(cube.material);
    
    let sourceObj = scene.getObjectByName('Scene').children[0];
    sourceObj.material.transparent = true;
    sourceObj.material.opacity = 0;
    
    let newObj = sourceObj.clone();
    console.log(newObj);
    newObj.scale.set(20, 20, 20);
    newObj.rotation.x = Math.PI / 2;
    
    newObj.material = newObj.material.clone();
    //newObj.material.transparent = true;
    
    return newObj;
}


function addObject(id) {
    let obj = getRandomObject();
    let pos = getNewPosition();
    
    posArray.push([pos[0], pos[1], pos[2]]);

    obj.material.opacity = 0;
    
    obj.position.set(pos[0], pos[1], pos[2]);
    
    obj.name = 'ActiveObject'+id;
    
    obj.userData.anim = function(objLocal) {
        //let objLocal = scene.getObjectByName('ActiveObject'+id);
        
        //obj.position.y += 0.1;
        let inc = increment * clockDelta;
        //alert(id + ' increment ' + inc);
        objLocal.position.y += inc;
        
        //alert(id+' '+obj.position.y);
        if (objLocal.position.y > maxThreshold) {
            objLocal.material.opacity -= inc;
            //obj.position.y = -size;
            if (objLocal.material.opacity <= 0) {
                let pos = getNewPosition();
                objLocal.position.set(pos[0], pos[1], pos[2]);
            }
        } else {
            if (objLocal.material.opacity < 1) objLocal.material.opacity += inc;
        }
    };
    
    scene.add(obj);
}

function addObjects() {
    for (let x = 0; x < count; x++) {
        addObject(x);
    }
    
    console.log(posArray);
}

function getNewPosition() {
    //do {
        let posX = randSign() * size * Math.random();
    //} while ()
    
    let posY = randSign() * size * Math.random();
    let posZ = randSign() * size * Math.random();
    
    return [posX, posY, posZ];
}