import { Hero } from './class/hero.js';
import { Enemies } from './class/enemies.js';
import { GeneralConfig } from './class/general-config.js';
import { Bullet } from './class/bullet.js';
import { People } from './class/people.js';
import { Scenario } from './class/scenario.js';
import { Item } from './class/item.js';
import { MainCharacter } from './class/main-character.js';
import { SecretPassage } from './class/secret-passage.js';
import { SwitchButton } from './class/switch-button.js';

// Déclaration des variables
const stage = document.getElementById("stage");
stage.width = 750;
stage.height = 625;
// On utilise la méthode getContext pour aller chercher les methodes et les propriétés du canvas
export const ctx = stage.getContext("2d");
export const config = new GeneralConfig();
export const scenario = new Scenario();


let backgroundToDisplay = [];
let currentMapSheetDatas;

export let hero = {};
// export let people = {};
export let peopleList = [];
export let itemList = [];
export let secretPassageList = [];
export let mainCharacterList = []; //darius
export let switchButtonList = [];


// Dessine l'image du menu
const drawHomeMenu = ()=> {

  // On dessine un fond noir sur l'écran d'accueil
  ctx.fillStyle="#000000";
  ctx.fillRect(0,0, stage.width, stage.height);
  // On affiche les messages
  scenario.drawMessages('MY OWN RPG', 10 , stage.height / 3, 1);
  scenario.drawMessages('Press ENTER', 10 , stage.height / 2, 2);
  scenario.drawMessages(' ©2020 Copyright MYNAME', stage.width / 4, 500, 2);
};


// On charge les images du jeu
config.loadImages(drawHomeMenu);



// Méthode pour initialiser le héros
const InitHero = () => {
  // On initialise le héros
  hero = new Hero (1,1,15,15);
};

// On initialise un monstre
const initMainCharacter = (mainCharacterSet) => {

  mainCharacterSet.forEach(elem=> {
    let mainCharacter = new MainCharacter('persomonstre2', elem);
    mainCharacterList.push(mainCharacter);
  })


};

// Méthode pour Initialiser les people
const initPeople = (peopleSet)=> {

  // On crée plusieurs people
  peopleSet.forEach(elem =>{
    let people = new People(elem);
    peopleList.push(people);
  });
};

// Méthode pour initialiser les items
const initItems = (itemSet)=> {
  // On crée plusieurs item
  // for(let i =  0; i < nb ; i++){
  //   const index = config.rangeNumber(0, currentMapSheetDatas.possibleItemPosition.length - 1)
  //   const coordinate = currentMapSheetDatas.possibleItemPosition[index];

  //   console.log('coordinate', coordinate);
  //   let item = new Item ('spritesheet', coordinate);
  //   itemList.push(item);
  //   console.log('item', item);
  // }
  itemSet.forEach(elem => {
   let item = new Item ('spritesheet', elem);
   itemList.push(item);
  });

};

// On initialise un SwitchButton
const initSwitchButton = (switchButtonSet) => {
 // for(let i =  0; i < nb ; i++){
 //   switchButton = new SwitchButton('spritesheet', {x:2260, y:504});
 // }
 switchButtonSet.forEach(elem => {
   let switchButton = new SwitchButton('spritesheet', elem);
   switchButtonList.push(switchButton);
 });

};

// Méthode qui initialise les passages secrets
const initSecretPassage = (secretPassageSet) => {
  // On crée plusieurs passages secrets
  // currentMapSheetDatas.secretPassagePosition.forEach(elem => {
  //   let secretPassage = new SecretPassage('spritesheet',elem);
  //   secretPassageList.push(secretPassage);
  // });
  secretPassageSet.forEach(elem => {
    let secretPassage = new SecretPassage('spritesheet',elem);
    secretPassageList.push(secretPassage);
  });

};

// Méthode pour initialiser les sprites animés
const initSprites = () => {

  if (typeof(hero.x) === 'undefined'){ // On vérifie si le héro n'a pas déjà été initialisé
    InitHero();
  };

  // On récupère les informations sur la mapSheep courrante
  currentMapSheetDatas = config.getCurrentMapSheetDatas(hero);

  console.log('la currentMapSheetDatas', currentMapSheetDatas);

  const people = currentMapSheetDatas.sprites.people;
  const item = currentMapSheetDatas.sprites.item;
  const mainCharacter = currentMapSheetDatas.sprites.mainCharacter;
  const secretPassage =  currentMapSheetDatas.sprites.secretPassage;
  const switchButton = currentMapSheetDatas.sprites.switchButton;

  // On initialise tous les sprites s'il y en a dans la mapsheet
  initPeople(people);
  initItems(item);
  initMainCharacter(mainCharacter);
  initSecretPassage(secretPassage);
  initSwitchButton(switchButton);

  // On selectionne le bon background
  selectBackGroundImg(hero);
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

// Dessine l'image de fond
const drawBackground = () => {

  backgroundToDisplay.forEach(background => {

    ctx.drawImage(
      background, // Objet image représentant le background
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
  if(config.checkOutOfBounds(currentMapSheetDatas, people)){ // Si le people est en dehors du terrain
    // people.x = x;
    // people.y = y;
    // people.centerX = centerX;
    //poeple.centerY = centerY;
    people.setTarget();
  }
};

// On dessine les people
const drawPeople = ()=> {
  // On itère sur la liste des people
  peopleList.forEach(item => {
    item.draw();
  });
};

// Dessiner le héro
const drawHero = ()=> {
  hero.drawHero();
  hero.drawHeroDatas(stage.width - 200, 30, 3);
}

// Méthode pour afficher les switchbutton
const drawSwitchButton = ()=> {
  switchButtonList.forEach(elem=> {
    elem.draw();
  })
}

const drawMainCharacter = ()=> {
  mainCharacterList.forEach(elem=>{
    elem.draw();
  });
};


// On dessine les items
const drawItems = ()=> {
  // On itère sur la liste des items
  itemList.forEach(item => {
    item.draw();
  });
};

// On dessine les passages secrets
const drawSecretPassage = ()=> {
  // On itère sur la liste des passages secrets
  secretPassageList.forEach(elem => {
    elem.draw();
  });
};

const updateHero = ()=> {
    const x = hero.x;
    const y = hero.y;
    const centerX = hero.centerX;
    const centerY = hero.centerY;

    hero.update(event);

    // On itère sur toutes les portes de la mapsheet
    currentMapSheetDatas.doors.forEach(door => {

      // On vérifie s'il y a une collision entre la porte et le héro
      if (config.checkCollision(door, hero)) { // Si passe par une porte
        console.log('passe par une porte');

        // On supprime tous les sprites sauf le héro
        removeAllSprites();

        const destinationX = door.destination.x;
        const destinationY = door.destination.y;

        // On renseigne la position du héro dans la pièce de destination
        hero.setHeroPosition(door.destination);

        // On récupère les informations sur la mapSheep courrante
        currentMapSheetDatas = config.getCurrentMapSheetDatas(hero);

        // On selectionne le bon background
        selectBackGroundImg(hero);

        // On initalise à nouveau les sprites en fonction de la mapsheet
        initSprites();

        console.log('itemList', itemList);
      };

    });

    let index = 0;
    // On vérifie s'il y a une collision entre un item et le héro
    itemList.forEach(item => {
      if(config.checkCollision(item, hero)){ // Si collision

        // On indentifie l'index de l'item en collision
        const itemIndex = itemList.findIndex(elem => {
          return elem === item;
        });
        // On supprime l'item de la liste
        itemList.splice(itemIndex, 1);

        // On incrémente ne nombre d'item collectés par le héro
        hero.addItem();

        // On supprime définitivement cet élément du jeu
        config.permanentlyRemoveFromWorld(currentMapSheetDatas,'item', item);

        index++;


      }
    });

    // On vérifie s'il y a collision entre le héro et le switchButton
    switchButtonList.forEach(elem=> {
      if(config.checkCollision(elem, hero)){
          elem.toogleOpen();
      };
    });

    // On vérifie si le héro est sorti des limites
    if(config.checkOutOfBounds(currentMapSheetDatas, hero)){ // Si le héro est en dehors du terrain
      hero.x = x;
      hero.y = y;
      hero.centerX = centerX;
      hero.centerY = centerY;
      hero.setMapIndexPosition();
    }
};

// Méthode qui réagit aux évènements du clavier
const handleKeyboardInput = (event) => {

  if (event.code === 'Space'){ // Si la touche appuyée est Espace

    // On active le mode dialogue
    setDialogBox();

  } else if (event.keyCode !== 13) { // Si la touche appuyée est différente d'entrée on update le hero

    // on met à jour le hero
    updateHero();

	}  else { // le joueur a appuyé sur la touche Entrée

    if(!config.gameActive){ // On on n'est pas en phase de jeu
      scenario.launchStorytelling(1);
    }

  }
};

// On initialise tous les élémets du jeu
export const launchGame = (event) => {
  config.gameActive = true;

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
window.addEventListener('keydown', handleKeyboardInput);


// Méthode pour afficher tous les éléments dans l'animation
const drawAll = () => {

	drawBackground();

  peopleList.forEach(item => {
    updatePeople(item);
  });

  drawHero();
  drawPeople();
  drawItems();
  drawSecretPassage();
  drawMainCharacter();
  drawSwitchButton();

  if(hero.isTalking === true){ // Si le hero ne peut plus bouger
    scenario.drawDialogs();
  }
};





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

        if(config.checkCollision(hero, people)){
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
};

// Méthode pour supprimer les people
const removePeople = ()=> {
  peopleList = [];
};

// Méthode qui supprime les switchButton
const removeSwitchButton = ()=>{
  switchButtonList = [];
};

// Méthode qui supprime les passages secrets
const removeSecretPassage = ()=>{
  secretPassageList = [];
};

// Méthode qui supprime tous les items
const removeItems = ()=>{
  itemList = [];
};

// Méthode qui supprime le main character
const removeMainCharacter = ()=>{
  mainCharacterList = [];
}

// On supprime tous les sprites sauf le héro
const removeAllSprites = ()=> {
  removePeople();
  removeSwitchButton();
  removeSecretPassage();
  removeItems();
  removeMainCharacter();
}



