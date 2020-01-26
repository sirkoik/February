import {
    THREE,
    renderer,
    scene
} from './scene.js';
import {
    GLTFLoader
} from './three.js-r112/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from './three.js-r112/examples/jsm/loaders/RGBELoader.js';

export {
    load, loadEnvMap
};

// load: Load a GLTF scene.
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

// loadEnvMap: load an HDR environment map.
function loadEnvMap(url) {
    const loader = new RGBELoader();
    let pmremGenerator = new THREE.PMREMGenerator(renderer);
    
    return new Promise((resolve, reject) => {
        loader.setDataType(THREE.UnsignedByteType)
            .load(url, (hdrEquiRect, textureData) => {
                let hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(hdrEquiRect);
                pmremGenerator.compileCubemapShader();

                //scene.background = hdrCubeRenderTarget.texture;
                
                // this is very important in order for objects to receive the lighting!
                scene.environment = hdrCubeRenderTarget.texture;

                renderer.toneMappingExposure = 0.8;
                resolve('Envmap loaded.');
            });
    });
}
