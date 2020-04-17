// Déclaration des variables
const stage = document.getElementById("stage");
stage.width = 750;
stage.height = 625;

// On utilise la méthode getContext pour aller chercher les methodes et les propriétés du canvas
export const ctx = stage.getContext("2d");

// On dessine un fond rouge sur l'écran d'accueil
ctx.fillStyle = "#E44E4A";
ctx.fillRect(0,0, stage.width, stage.height);



// On dessine un fond blanc
ctx.fillStyle="#FFFFFF";
ctx.fillRect(
  200, // Position X
  200, // Position Y
  50, // Largeur du carré
  50 // Largeur du carré
);


const image1 = new Image();
image1.src = '../img/background.png';
image1.onload = () => {

  // Méthode pour dessiner une image
  ctx.drawImage(
    image1,
    0,
    0,
    750, // Position X sur le canvas
    825, // Position Y sur le canvas
  );

}


const image2 = new Image();
image2.src = '../img/sprites/heros1.png';
image2.onload = () => {

  // Méthode pour dessiner une partie croppée à l'intérieur d'une image
  ctx.drawImage(
    image2,
    32 , // Position X de la partie à croper
    0 , // Position Y de la partie à croper
    30, // Largeur de la partie à croper
    30, // Hauteur de la partie à corper
    150, // Position X sur le canvas
    150, // Position Y sur le canvas
    48, // Largeur de la partie cropée
    48 // Hauteur de la partie cropée
  );

}

// // Les coordonnées du héros
const hero = {
  x: 40,
  y: 40
};

//Méthode qui réagit aux évènements du clavier
const handleKeyboardInput = (event) => {

   if (event.keyCode === 13) { // Si touche ENTRER

     //console.log('ENTREE');

   }  else if(event.key === 'ArrowRight') { // Si direction droite

     console.log('DROITE');
     hero.x = hero.x + 25;


   }  else if(event.key === 'ArrowLeft') { // Si direction gauche

     console.log('GAUCHE');
     hero.x = hero.x - 25;

   }  else if(event.key === 'ArrowUp') { // Si direction haut

     console.log('HAUT');
     hero.y = hero.y - 25;

   } else if(event.key === 'ArrowDown') {  // Si direction bas

     console.log('BAS');
     hero.y = hero.y + 25;
   }

};


// On ajoute une évènement qui se déclenche dès qu'une touche du clavier est enfoncée.
window.addEventListener('keydown', handleKeyboardInput);



// // Méthode qui fait une boucle
const loop = () => {

  // Méthode pour dessiner le background
  ctx.drawImage(
    image1,
    0,
    0,
    750, // Position X sur le canvas
    825, // Position Y sur le canvas
  );



  // Méthode pour dessiner le héros
  ctx.drawImage(
    image2,
    32 , // Position X de la partie à croper
    0 , // Position Y de la partie à croper
    30, // Largeur de la partie à croper
    30, // Hauteur de la partie à corper
    hero.x, // Position X sur le canvas
    hero.y, // Position Y sur le canvas
    48, // Largeur de la partie cropée
    48 // Hauteur de la partie cropée
  );

};

// On répete la méthode loop toutes les secondes
setInterval(loop, 1000);






