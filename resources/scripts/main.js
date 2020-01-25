import {SCENE} from './scene.js';
import {load as objLoad} from './loader.js';

window.onload = () => {
    // this needs to be in an async function to work.
    SCENE();
    console.log('Running.');
}