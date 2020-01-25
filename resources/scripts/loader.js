import {THREE, scene} from './scene.js';
import {GLTFLoader} from './three.js-r112/examples/jsm/loaders/GLTFLoader.js';
export {load};


function load(url) {
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
        loader.load(url, (gltf) => {
            const root = gltf.scene;
            scene.add(root);
            
            console.log(root);
            resolve('Object loaded.');
        });        
    });

}