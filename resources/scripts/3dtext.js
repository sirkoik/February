import {THREE, scene, fontPath} from './scene.js';
export {loadFont, addText, addCustomText};

let loader = new THREE.FontLoader();
let textGeometry = {};

// loadFont: loads a font with THREE.FontLoader. Promise form.
function loadFont(path, text) {
    return new Promise((resolve, reject) => {
        loader.load(path, (font) => {
            textGeometry = new THREE.TextGeometry(text, {
                font: font,
                size: 0.5,
                height: 0.1
            });
            
            resolve('Font loaded.');
        });
    });
}

// addText: add text mesh.
// name: name of THREE.js object.
// requires geometry to be loaded with loadFont.
function addText(name, objToRemove) {
    // https://stackoverflow.com/questions/40694372/what-is-the-right-way-to-remove-a-mesh-completely-from-the-scene-in-three-js
    if (objToRemove) {
        let mesh = scene.getObjectByName(objToRemove);
        scene.remove(mesh);
        mesh.geometry.dispose();
        mesh.material.dispose();
        mesh = undefined;
    }
    
    let geometry = textGeometry;

    let material = new THREE.MeshStandardMaterial({color: 0xffffff});
    let mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    
    geometry.computeBoundingBox();
    geometry.center();
    
    scene.add(mesh);
}

// addCustomText: Adds custom text (deletes old text and replaces it)
async function addCustomText(objToRemove) {
    let text = prompt('Enter custom text');
    if (!text) return false;
    
    await loadFont(fontPath, text);
    
    addText(objToRemove, objToRemove);
    
    let url = window.location.href.split('?')[0] + '?text=' + text
    history.pushState({'page_id': 1}, text, url);
}