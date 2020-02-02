import {SCENE} from './scene.js';
import {load as objLoad} from './loader.js';
import {domInit} from './dom.js';

window.onload = () => {
    // this needs to be in an async function to work.
    SCENE();
    domInit();
    console.log('Running.');
}