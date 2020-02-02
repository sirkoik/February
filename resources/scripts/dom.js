export {domInit}

// domInit: Initialize DOM functions.
function domInit() {
    document.querySelector('.burger').addEventListener('click', toggleMenu, false);
    
    for (let el of document.querySelectorAll('.menu-items a')) {
        el.addEventListener('click', toggleMenu, false);
    }
    
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
    el.classList.toggle('hidden');
    el.classList.toggle('flex');    
}