import {THREE, scene, fontPath, fontText, setFontText} from './scene.js';
import {setProgress, showLoadingOverlay, hideLoadingOverlay} from './dom.js';
export {loadFont, addText, addCustomText, revertBoxText};

let loader = new THREE.FontLoader();
let textGeometry = {};

// loadFont: loads a font with THREE.FontLoader. Promise form.
function loadFont(path, text) {
    let prevProg = 0;
    
    return new Promise((resolve, reject) => {
        loader.load(path, (font) => {
            textGeometry = new THREE.TextGeometry(text, {
                font: font,
                size: 0.8,
                height: 0.1
            });
            
            resolve('Font loaded');
        }, progressEvent => {
            
                let prog = Math.round(progressEvent.lengthComputable ? 100 * progressEvent.loaded / progressEvent.total : 0);

                setProgress(prog - prevProg);
                prevProg = prog;
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

    let material = new THREE.MeshStandardMaterial({
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 10
    });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    
    geometry.computeBoundingBox();
    geometry.center();
    
    scene.add(mesh);
}

// addCustomText: Adds custom text (deletes old text and replaces it)
// since this is now multi-line, it encodes the string as base64.
async function addCustomText(objToRemove) {
//    let text = prompt('Enter custom text');
//    if (!text) return false;
    let text = document.getElementById('text-custom-entry').value;
    if (!text || text == '') return false;
    
    // BUG for some reason this won't set
    setFontText(text);
    
    showLoadingOverlay();
    await loadFont(fontPath, text);
    
    addText(objToRemove, objToRemove);
    
    let url = window.location.href.split('?')[0] + '?text=' + btoa(text) + '&base64=true';
    url = url.replace('#', ''); // remove any pound signs from url
    history.pushState({'page_id': 1}, text, url);
    hideLoadingOverlay();
}

function revertBoxText() {
    document.getElementById('text-custom-entry').value = fontText;
}