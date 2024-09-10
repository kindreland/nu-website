// JavaScript Document

// var to store current theme
let darkmode = localStorage.getItem('darkmode');
// theme switch button
const themeSwitch = document.getElementById('theme-switch');


function enableDarkmode (){
    localStorage.setItem('darkmode', 'active');
}

function disableDarkmode(){
    localStorage.setItem('darkmode', null);
}


if(darkmode === 'active') enableDarkmode();



themeSwitch.addEventListener('click', () =>{
    // retrieve theme storage if any stored
    darkmode = localStorage.getItem('darkmode');
    
    if(darkmode !== 'active'){
        enableDarkmode()
    }
    else{
        disableDarkmode()
    }
});