import { Hero } from './class/hero.js';
import { Obstacles } from './class/obstacles.js';
import { Enemies } from './class/enemies.js';
import { GeneralConfig } from './class/general-config.js';
import { Bullet } from './class/bullet.js';
import { People } from './class/people.js';
import { Scenario } from './class/scenario.js';
import { Item } from './class/item.js';
import { MainCharacter } from './class/main-character.js';

// Déclaration des variables
const stage = document.getElementById("stage");
stage.width = 750;
stage.height = 625;
// On utilise la méthode getContext pour aller chercher les methodes et les propriétés du canvas
export const ctx = stage.getContext("2d");
export const config = new GeneralConfig();
export const scenario = new Scenario();
// Déclaration des images
export const charImg = new Image();
export const enemyDragonImg = new Image();
export const enemyKnightImg = new Image();
export const enemySkeletonImg = new Image();
export const backgroundImg = new Image();
export const tileFloorHouseImg = new Image();
export const tileChairHouseImg = new Image();
export const roomImg = new Image();
export const roomImgLayer1 = new Image();
export const roomImgLayer2 = new Image();
export const roomImgLayer3 = new Image();
export const imgPersoFigurant1 = new Image();
export const imgPersoFigurant2 = new Image();
export const imgPersoFigurant3 = new Image();

let backgroundToDisplay = [];
let currentMapSheetDatas;

export let hero = {};
export let people = {};
export let obstacle = [];
export let peopleList = [];
export let itemList = [];
export let darius = {};



// Dessine l'image du menu
const drawHomeMenu = ()=> {

  // On dessine un fond noir sur l'écran d'accueil
  ctx.fillStyle="#000000";
  ctx.fillRect(0,0, stage.width, stage.height);
  // On affiche les messages
  scenario.drawMessages('RPG GAME', stage.width / 5 , stage.height / 3, 1);
  scenario.drawMessages('Press ENTER', stage.width / 5 , stage.height / 2, 2);
  scenario.drawMessages(' ©2020 BG', stage.width / 4, 500, 2);


};


// On charge les images du jeu
config.loadImages(drawHomeMenu);

// Méthode pour trouver un chiffre compris entre a et b
export const rangeNumber = (a,b)=> {
  return Math.floor((Math.random() * b)) + a;
}



// Méthode pour initialiser le héros
const InitHero = () => {
  // On initialise le héros
  hero = new Hero (1,1,15,15);
}

// Méthode pour Initialiser les people
const initPeople = (nb)=> {
  const num = nb;

  let x;
  let y;

  // On crée plusieurs people
  for(let i =  0; i <= num ; i++){

    x = rangeNumber(400, 1000);
    y = rangeNumber(350, 1000);

    let people = new People (x, y, 1, 1);
    peopleList.push(people);
  }
};

const initItems = (nb)=> {

  const index = rangeNumber(0, currentMapSheetDatas.possibleItemPosition.length)
  const coordinate = currentMapSheetDatas.possibleItemPosition[index];

  // On crée plusieurs people
  for(let i =  0; i <= nb ; i++){

    let item = new Item ('treasure', coordinate);
    itemList.push(item);
  }
};


// Méthode pour initialiser les sprites animés
const initSprites = () => {

  InitHero();

   // On récupère les informations sur la mapSheep courrante
  currentMapSheetDatas = config.getCurrentMapSheetDatas(hero);

  initPeople(3);
  initItems(5);



  // On selectionne le bon background
  selectBackGroundImg(hero);
};

// On crée les obstacles
const initObstacles = () => {
  obstacle =  new Obstacles(412, 65, 70, 50);
}


// Méthode pour vérifier la collision entre un élément a et b
export const checkCollision = (a, b) => {

  if((a.x < b.centerX) && (b.centerX < (a.x + a.width))
   && (a.y < b.centerY)
   && (b.centerY < (a.y + a.height))) {
     return true;
  } else {
    return false;
  }
};

// Méthode pour connaitre l'image de fond à afficher
const selectBackGroundImg = (hero) => {

  if (hero.currentWorldPosition.worldId === 1 && hero.currentWorldPosition.mapSheetId === 1){
    backgroundToDisplay.push(config.getImage('room1'));

  }

  if(hero.currentWorldPosition.wordlId === 1 && hero.currentWorldPosition.mapSheetId === 2){
    backgroundToDisplay.push(config.getImage('room2_layer_01'), config.getImage('room2_layer_02'), config.getImage('room2_layer_03')) ;
  }
};

// Méthode pour vérifier la collision entre un élément a et b en prenant en compte les index sur la map
export const checkCollisionByMapIndex = (room) => {

	// Si index du joueur vaut 0 sur la map il y a collision
	if (room.collisionArray[hero.mapIndexPosition] === 0) {

		console.log('room.collisionArray[hero.mapIndexPosition]', room.collisionArray[hero.mapIndexPosition]);
	} else { // Sinon, pas de collision

		console.log('room.collisionArray[hero.mapIndexPosition]', room.collisionArray[hero.mapIndexPosition]);
	}

};


// Dessine l'image de fond
const drawBackground = () => {

  backgroundToDisplay.forEach(background => {

    ctx.drawImage(
      background,
      hero.x - 351, // Position X de la partie à croper
      hero.y - 288.5, // Position Y de la partie à croper
      750 , // Largeur de la partie à croper
      625 , // Hauteur de la partie à corper
      0, // Position X sur le canvas de l'image cropée
      0,  // Position X sur le canvas de l'image cropée
      750 , // Largeur de l'image cropée sur le canvas
      625 // Hauteur de l'image cropée sur le canvas
    );
  })
};

// On met à jour la position du people
const updatePeople = (people) => {

  const x = people.x;
  const y = people.y;
  const centerX = people.centerX;
  const centerY = people.centerY;

  people.update();
  people.setMapIndexPosition();

  //On vérifie si le people est sorti des limites
  if(checkOutOfBounds(currentMapSheetDatas, people)){ // Si le people est en dehors du terrain
    // people.x = x;
    // people.y = y;
    // people.centerX = centerX;
    //poeple.centerY = centerY;
    people.setTarget();
  }
};

// On dessine le people
const drawPeople = ()=> {

  // On itère sur la liste des people
  peopleList.forEach(item => {
    item.draw();
  });

};

// On dessine les items
const drawItems = ()=> {
   // On itère sur la liste des item
  itemList.forEach(item => {
    item.draw();
  });
}


const updateHero = ()=> {
    const x = hero.x;
    const y = hero.y;
    const centerX = hero.centerX;
    const centerY = hero.centerY;

    hero.update(event);

    // On itère sur toutes les portes de la mapsheet
    currentMapSheetDatas.doors.forEach(item => {

      // On vérifie s'il y a une collision entre la porte et le héro
      if (checkCollision(item, hero)) { // Si passe par une porte
        console.log('passe par une porte');

        // On supprime les people
        removePeople();

        // On ajoute des poeple
        initPeople(10);

        const destinationX = item.destination.x;
        const destinationY = item.destination.y;

        // On set la position du héro dans la pièce de destination
        hero.setHeroPosition(item.destination);

        // On récupère les informations sur la mapSheep courrante
        currentMapSheetDatas = config.getCurrentMapSheetDatas(hero);

        // On selectionne le bon background
        selectBackGroundImg(hero);
      };

    });



    // On vérifie si le héro est sorti des limites
    if(checkOutOfBounds(currentMapSheetDatas, hero)){ // Si le héro est en dehors du terrain
      hero.x = x;
      hero.y = y;
      hero.centerX = centerX;
      hero.centerY = centerY;
      hero.setMapIndexPosition();
    }
}

// Méthode qui réagit aux évènements du clavier
const handleInput = (event) => {

  if (event.code === 'Space'){ // Si la touche appuyée est Espace

    // On active le mode dialogue
    setDialogBox();

  } else if (event.keyCode !== 13) { // Si la touche appuyée est différente d'entrée on update le hero

    // on met à jour le hero
    updateHero();

	}  else { // le joueur a appuyé sur la touche Entrée

    scenario.launchStorytelling(1);
    // On lance le jeu
    //launchGame();

  }

}

// On initialise tous les élémets du jeu
export const launchGame = (event) => {

    // On initialise les sprites après un délai de deux secondes
    setTimeout(initSprites, 2000);

    // Méthode pour rafraichir tous les éléments du jeu toutes les secondes
    config.setInterval = setInterval(drawAll, 1000 / config.fps);

};

// Méthode qui met fin au jeu
const endGame = () => {

  // On met fin au cycle de rafraichissement
  clearInterval(config.setInterval);

  // On reset les sprites
  hero = {};
  enemies = [];
  peopleList = [];
  itemList = [];
};

// On ajoute une évènement qui se déclenche dès qu'une touche du clavier est enfoncée.
window.addEventListener('keydown', handleInput);


// Méthode pour afficher tous les éléments dans l'animation
const drawAll = () => {

	drawBackground();

	hero.drawHero();

  peopleList.forEach(item => {
    updatePeople(item);
  });

  drawPeople();

  drawItems();

  if(hero.isTalking === true){ // Si le hero ne peut plus bouger
    scenario.drawDialogs();
  }

};

// Méthode qui vérifie si le héro est sorti des limites autorisées
export const checkOutOfBounds = (currentMap, someOne) => {

		// Si index du joueur vaut 0 sur la map il y a collision
		if (currentMap.collisionArray[someOne.mapIndexPosition] === 0) {
			//console.log('collision');
			return true;
		} else { // Sinon, pas de collision
			//console.log('pas de collision');
			return false;
		}


};

// Méthode qui vérifie si le héros passe à travers une porte
export const checkDoorCrossed = ()=> {


}


// On récupère les points du joueur depuis le backend
/* const url = "http://localhost:3000/api/info";
fetch(url)
  .then(function(resp){
    console.log('resp', resp);
    console.log('resp', resp.body.json());
    return resp.json();
  }).then(function(data){
      console.log("data", data);
  }).catch(error => {
    // If there is any error you will catch them here
    console.log("c est une erreur");
}); */


// Méthode pour trouver l'index de l'ennemi qui a été touché
/* export const killEnemy = (targetEnemy) => {
  const killedEnemyIndex = enemies.findIndex(enemy =>{
    return enemy.x === targetEnemy.x;
  });
  hero.bulletsList[hero.shootedBullet].isFlying === false;
  enemies.splice(killedEnemyIndex, 1);
} */




// Méthode qui joue une piste sonore
const playSound = (url)  => {
  // audio.style.display = "none";
  const audio = document.getElementById('myPlayer');
  audio.src = url;
  audio.autoplay = true;
  audio.onended = function(){
    audio.remove() //Remove when played.
  };
  audio.addEventListener('click', audio.play);
};

playSound('../audio/soundtracks/far-east-kingdom.mp3');


// On délenche le mode dialogue
const setDialogBox = () => {
    if(hero.isTalking === false){
      // On vérifie s'il y a collision entre le héro et un people
      peopleList.forEach(people => {

        if(checkCollision(hero, people)){
            console.log('people hero collision');
            hero.setTalkMode();
            // On passe au message suivant
            scenario.msgToDisplay = people.selectMessage();
        }
      })
    } else {

      if(false){ // Si le dialogue doit se terminer
        hero.removeTalkMode();
      } else {
        // On passe au message suivant
        scenario.msgToDisplay = people.selectMessage();
      }

    }
}

// Méthode pour supprimer les people
const removePeople = ()=> {
  peopleList = [];
}



