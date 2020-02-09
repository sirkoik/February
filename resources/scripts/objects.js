import {THREE, scene, clock, clockDelta, increment} from './scene.js';
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

//const cubeGeometry = new THREE.BoxBufferGeometry(objScale, objScale, objScale);
//const cubeMaterial = new THREE.MeshBasicMaterial({
//    color: 0x0000ff,
//    transparent: true
//});
//
//const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

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
//    console.log(newObj);
    newObj.scale.set(20, 20, 20);
    newObj.rotation.x = Math.PI / 2;
    
    //newObj.material = newObj.material.clone();
    
    let colors = [
        0xffff00,
        0x00ff00,
        0x0000ff,
        0x00ffff,
        0xff00ff,
        0xff0000
    ];
    
    let randColor = colors[Math.round(Math.random() * (colors.length - 1))];
    
    newObj.material = new THREE.MeshStandardMaterial({color: randColor}).clone();
    newObj.material.transparent = true;
    
    return newObj;
}


// addObject: Add an object to the scene.
// @id ID to assign the object in its group.
function addObject(id) {
    let obj = getRandomObject();

    // set position of the object.    
    let pos = getNewPosition();
    posArray.push([pos[0], pos[1], pos[2]]);
    obj.position.set(pos[0], pos[1], pos[2]);
    
    // set initial rotation and position of the object.
    //obj.rotation.z = Math.PI * Math.random();
    
    obj.userData.randOffset = Math.random() * 10;
    
    // name and opacity
    obj.name = 'ActiveObject'+id;
    obj.material.opacity = 0;
    
    
    // animation function for the object.
    obj.userData.anim = function(objLocal) {
        let inc = increment * clockDelta;
        
        let theta = clock.elapsedTime + objLocal.userData.randOffset;
        
        objLocal.position.x += Math.sin(theta) / 100;
        
        objLocal.position.y += inc;
        
        //objLocal.rotation.z -= inc / 5;
        
        //objLocal.rotation.y = Math.atan(Math.cos(theta)) / 5;
        //objLocal.rotation.y = (1/100) * Math.cos(objLocal.position.y);
        //objLocal.rotation.y = Math.atan(Math.cos(theta)) / 5;
        objLocal.rotation.y = Math.sin(theta) / 100;
        
        //objLocal.rotation.z += inc;
        
        // set position to a random new one after reaching max threshold.
        if (objLocal.position.y > maxThreshold) {
            objLocal.material.opacity -= inc;
            if (objLocal.material.opacity <= 0 || objLocal.position.y > maxThreshold * 2) {
                //console.log('reset posL ' + objLocal.name);
                objLocal.material.opacity = 0;
                let pos = getNewPosition();
                objLocal.position.set(pos[0], pos[1], pos[2]);
            }
        } else {
            if (objLocal.material.opacity < 1) {
                objLocal.material.opacity += inc;
                //console.log(objLocal.material.opacity);
            }
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