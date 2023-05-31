// Dimensions
export const PADDLEWIDTH=20;
export const PADDLEHEIGHT=100;
export const BALLSIZE=10;
export const PADDLEMARGIN=10;
export const STROKEWIDTH=2;
export const OSPADDLETH=20;

// Directions
export const UP=-1;
export const DOWN=1;
export const NODIR=0;
export const MAXANGLE=1; // 1 rad ~= 57°
export const INITANGLE=0.08 // ~= 5°
// Score
export const PLAYERSCORE=1;
export const OSSCORE=2;
export const NOSCORE=0;

// Animation settings
export const BOARDCOLOR="black";
export const BALLCOLOR="chartreuse";
export const STROKECOLOR="chartreuse";
export const SHADOWCOLOR="green";
export const SHADOWBLUR=10;
export const BALLV=5;
export const SHADOWITER=4;
export const PADDLEV=3;

// Collision types
export const HORIZONTAL="Horizontal";
export const VERTICAL="Vertical";
export const SINGULAR="Singular";
export const NOCOLLISION="No collision";

// HTML elements and dimensions
export const canvas = document.querySelector("canvas");
export const screenwidth = canvas.width;
export const screenheight = canvas.height;
export const pPlayerScore = document.getElementById("playerscore");
export const pOSScore = document.getElementById("osscore");

// Sound
export let pongSound = new Audio('./assets/4359__noisecollector__pongblipf4.mp3');
export let missSound = new Audio('./assets/351563__bertrof__game-sound-incorrect-with-delay.mp3');
pongSound.volume = missSound.volume = 0.2;


