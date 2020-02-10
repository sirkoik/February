import {
    THREE,
    renderer,
    scene
} from './scene.js';
import {
    GLTFLoader
} from './three.js-r112/examples/jsm/loaders/GLTFLoader.js';
import {
    RGBELoader
} from './three.js-r112/examples/jsm/loaders/RGBELoader.js';
import {setProgress} from './dom.js';

export {
    load,
    loadEnvMap
};

// load: Load a GLTF scene.
function load(url) {
    let prevProg = 0;
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
        loader.load(url, (gltf) => {
            const root = gltf.scene;
            scene.add(root);

            resolve('Object loaded');
        }, progressEvent => {
                let prog = Math.round(progressEvent.lengthComputable ? 100 * progressEvent.loaded / progressEvent.total : 0);

                setProgress(prog - prevProg);
                prevProg = prog;
        });
    });
}

// loadEnvMap: load an HDR environment map.
function loadEnvMap(url) {
    const loader = new RGBELoader();
    let pmremGenerator = new THREE.PMREMGenerator(renderer);
    
    let prevProg = 0;

    return new Promise((resolve, reject) => {
        loader.setDataType(THREE.UnsignedByteType)
            .load(url, (hdrEquiRect, textureData) => {
                let hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(hdrEquiRect);
                pmremGenerator.compileCubemapShader();

                //scene.background = hdrCubeRenderTarget.texture;

                // this is very important in order for objects to receive the lighting!
                scene.environment = hdrCubeRenderTarget.texture;

                renderer.toneMappingExposure = 0.8;
                resolve('Envmap loaded');
            }, progressEvent => {
                let prog = Math.round(progressEvent.lengthComputable ? 100 * progressEvent.loaded / progressEvent.total : 0);

                setProgress(prog - prevProg);
                prevProg = prog;
            });
    });
}