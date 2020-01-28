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
export let people = {};
export let peopleList = [];
export let itemList = [];
export let secretPassageList = [];
export let darius = {};
export let switchButton = {};


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
const initMainCharacter = () => {
 darius = new MainCharacter('persomonstre2', 1000, 400);
 console.log('darius', darius);
};

// Méthode pour Initialiser les people
const initPeople = (nb)=> {
  const num = nb;

  let x;
  let y;

  // On crée plusieurs people
  for(let i =  0; i < num ; i++){

    x = config.rangeNumber(400, 1000);
    y = config.rangeNumber(350, 1000);

    let people = new People (x, y, 1, 1);
    peopleList.push(people);
  }
};

// Méthode pour initialiser les items
const initItems = (nb)=> {
  // On crée plusieurs item
  for(let i =  0; i < nb ; i++){
    const index = config.rangeNumber(0, currentMapSheetDatas.possibleItemPosition.length - 1)
    const coordinate = currentMapSheetDatas.possibleItemPosition[index];

    console.log('coordinate', coordinate);
    let item = new Item ('spritesheet', coordinate);
    itemList.push(item);
    console.log('item', item);
  }
};

// On initialise un SwitchButton
const initSwitchButton = () => {
 switchButton = new SwitchButton('spritesheet', {x:2270, y:504});
};

// Méthode qui initialise les passages secrets
const initSecretPassage = () => {
  // On crée plusieurs passages secrets
  currentMapSheetDatas.secretPassagePosition.forEach(elem => {
    let secretPassage = new SecretPassage('spritesheet',elem);
    secretPassageList.push(secretPassage);
  });
};

// Méthode pour initialiser les sprites animés
const initSprites = () => {

  InitHero();

  // On récupère les informations sur la mapSheep courrante
  currentMapSheetDatas = config.getCurrentMapSheetDatas(hero);

  initPeople(3);
  initItems(20);
  initMainCharacter();
  initSecretPassage();


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

        // On supprime les people
        removePeople();

        // On ajoute des people
        initPeople(5);

        // On initialise le switch button
        initSwitchButton();

        const destinationX = door.destination.x;
        const destinationY = door.destination.y;

        // On set la position du héro dans la pièce de destination
        hero.setHeroPosition(door.destination);

        // On récupère les informations sur la mapSheep courrante
        currentMapSheetDatas = config.getCurrentMapSheetDatas(hero);

        // On selectionne le bon background
        selectBackGroundImg(hero);
      };




    });

    let index = 0;
    // On vérifie s'il y a une collision entre un item et le héro
    itemList.forEach(item => {
      if(config.checkCollision(item, hero)){ // Si collision

        // On indentifie l'index de l'item en collision
        const index = itemList.findIndex(elem => {
          return elem === item;
        });
        // On supprime l'item de la liste
        itemList.splice(index, 1);

        // On incrémente ne nombre d'item collectés par le héro
        hero.addItem();
        index++;
      }
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

	hero.drawHero();
  darius.draw();
  switchButton.draw();
  hero.drawHeroDatas(stage.width - 200, 30, 3);

  peopleList.forEach(item => {
    updatePeople(item);
  });

  drawPeople();
  drawItems();
  drawSecretPassage();



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





