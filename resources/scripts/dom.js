import {TEXT_OBJ_NAME, showLoadingText} from './scene.js';
import {addCustomText, revertBoxText} from './3dtext.js';
export {domInit, showLoadingOverlay, hideLoadingOverlay, setProgress, setProgressText, finishLoading}

// domInit: Initialize DOM functions.
function domInit() {
    document.querySelector('.burger').addEventListener('click', toggleMenu, false);
    
    for (let el of document.querySelectorAll('.menu-items a')) {
        el.addEventListener('click', toggleMenu, false);
    }
    
    document.querySelector('#btn-text-update').addEventListener('click', function(e) {
        e.preventDefault();
        addCustomText(TEXT_OBJ_NAME);
    }, false);
    
    document.querySelector('#btn-text-cancel').addEventListener('click', function(e) {
        e.preventDefault();
        revertBoxText();
    });
    
    document.querySelector('.menu-items-customtext').addEventListener('click', toggleOverlay, false);
    document.querySelector('.menu-items-about').addEventListener('click', toggleOverlay, false);
    
    for (let el of document.querySelectorAll('.button-close')) {
        el.addEventListener('click', toggleOverlay, false);
    }
}

function toggleMenu(e) {
    document.querySelector('.menu-items').classList.toggle('hidden');
}

// toggleOverlay: Toggles an overlay based on the targetid attribute of the activated element.
// e.g. if a button (bound with an eventListener) with a targetid of overlay1 is clicked, it will toggle overlay1.
// toggle schema: hidden is display:none, and flex is display:flex. Assumes target is a flexbox.
// addEventListener automatically passes e (event) to this function.
function toggleOverlay(e) {
    let el = document.getElementById(e.target.getAttribute('targetid'));
    tO(el);
}

// toggleOverlayScript: Toggles an overlay based on directly supplied targetId.
function toggleOverlayScript(targetId) {
    let el = document.getElementById(targetId);
    tO(el);
}

// tO: internal overlay toggle function
function tO(el) {
    el.classList.toggle('hidden');
    el.classList.toggle('flex');    
}


// loader

// toggle the loading overlay.
function toggleLoadingOverlay() {
    let el = document.querySelector('.loading-overlay-container');
    tO(el);
}

// showLoadingOverlay: show the loading overlay.
function showLoadingOverlay() {
    let el = document.querySelector('.loading-overlay-container');
    el.classList.remove('hidden');
    el.classList.add('flex');
}

// hide instead of toggling the loading overlay.
function hideLoadingOverlay() {
    let el = document.querySelector('.loading-overlay-container');
    el.classList.remove('flex');
    el.classList.add('hidden');
}

// totalProg depends on how many items are loading with onProgress. 
// since the onProgresses are set to go to 100, the totalProg should match onProgresses * 100.
// i.e. with three progresses, totalProg should be 300. This is a simple case - if you think an 
// item is less significant you can reduce its contribution to totalProg and reduce totalProg likewise.
let prog = 0;
let totalProg = 300; 

// setProgress: set the progress in the progress bar to an adjusted amount based on totalProg
function setProgress(amount) {
    prog += amount;
    
    let total = Math.round(100 * prog / totalProg);
    document.querySelector('.load-progress').style.width = total + '%';
    
    if (total >= 100) {
        finishLoading();
    }
}

// setProgressText: change the progress text when an item loads
function setProgressText(text) {
    if (showLoadingText) document.querySelector('.progress-text').innerText = text + '...';
}

function finishLoading() {
    setProgressText('Loading');
    hideLoadingOverlay();    
}