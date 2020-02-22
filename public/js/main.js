import { Hero } from './class/hero.js';
import { GeneralConfig } from './class/general-config.js';
import { People } from './class/people.js';
import { DialogBox } from './class/dialog-box.js';
import { Item } from './class/item.js';
import { MainCharacter } from './class/main-character.js';
import { SecretPassage } from './class/secret-passage.js';
import { SwitchButton } from './class/switch-button.js';
import { Storytelling } from './class/storytelling.js';
import { Door } from './class/door.js';

// Déclaration des variables
const stage = document.getElementById("stage");
stage.width = 750;
stage.height = 625;

// On utilise la méthode getContext pour aller chercher les methodes et les propriétés du canvas
export const ctx = stage.getContext("2d");
export const config = new GeneralConfig();
export const dialogBox = new DialogBox();
export const storytelling = new Storytelling(config.stories);

let backgroundToDisplay = [];
let currentMapSheetDatas;

// On initialise des objets vides
export let hero = {};
export let peopleList = [];
export let mainCharacterList = [];
export let itemList = [];
export let secretPassageList = [];
export let switchButtonList = [];
export let doorsList = [];


// On charge les images du jeu
config.loadImages();


// Méthode pour initialiser le héros
const InitHero = () => {
  hero = new Hero (1,1,15,15);
};

// Méthode pour initialiser les portes
const InitDoors = (doorsSet) => {
  doorsSet.forEach(elem => {
    let door = new Door(elem);
    doorsList.push(door);
  })
};

// On initialise un monstre
const initMainCharacter = (mainCharacterSet) => {
  mainCharacterSet.forEach(elem => {
    let mainCharacter = new MainCharacter(elem);
    mainCharacterList.push(mainCharacter);
  })
};

// Méthode pour Initialiser les people
const initPeople = (peopleSet)=> {
  peopleSet.forEach(elem =>{
    let people = new People(elem);
    peopleList.push(people);
  });
};

// Méthode pour initialiser les items
const initItems = (itemSet)=> {
  itemSet.forEach(elem => {
   let item = new Item ('spritesheet', elem);
   itemList.push(item);
  });

};

// On initialise les boutons sur la map
const initSwitchButton = (switchButtonSet) => {
 switchButtonSet.forEach(elem => {
   let switchButton = new SwitchButton('spritesheet', elem);
   switchButtonList.push(switchButton);
 });
};

// Méthode qui initialise les passages secrets sur la map
const initSecretPassage = (secretPassageSet) => {

  console.log('secretPassageSet', secretPassageSet);

  // On intère sur les boutons
  switchButtonList.forEach( elem => {
    if(elem.target === 'secretPassage' && elem.isOpen){ // Si un boutton active les passages secret et est activé
      secretPassageSet.forEach(passage => {
        let secretPassage = new SecretPassage('spritesheet',passage);
        secretPassageList.push(secretPassage);
      });
    }
    console.log('secretPassageList', secretPassageList);
  })
};

// Méthode pour initialiser les sprites
const initSprites = () => {

  if (typeof(hero.x) === 'undefined'){ // On vérifie si le héro n'a pas déjà été initialisé
    InitHero();
  };

  // On récupère les informations sur la mapSheep courrante
  currentMapSheetDatas = config.getCurrentMapSheetDatas(hero);


  const people = currentMapSheetDatas.sprites.people;
  const items = currentMapSheetDatas.sprites.item;
  const mainCharacters = currentMapSheetDatas.sprites.mainCharacter;
  const secretPassages =  currentMapSheetDatas.sprites.secretPassage;
  const switchButtons = currentMapSheetDatas.sprites.switchButton;
  const doors = currentMapSheetDatas.doors;

  // On initialise tous les sprites s'il y en a dans la mapsheet
  initPeople(people);
  initItems(items);
  initMainCharacter(mainCharacters);
  initSecretPassage(secretPassages);

  if(!config.checkSpritesExists(switchButtonList)){ // Si n'existe pas encore dans la mapsheet

     console.log(config.checkSpritesExists(switchButtonList));
     console.log('init switchButton');
     initSwitchButton(switchButtons);
  }


  InitDoors(doors);

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

// On met à jour la position des personnages
const updatePeople = () => {

  peopleList.forEach(people => {
    const x = people.x;
    const y = people.y;
    const centerX = people.centerX;
    const centerY = people.centerY;

    people.update();
    people.setMapIndexPosition();

    //On vérifie si le personnage est sorti des limites / a traversé un mur.
    if(config.checkOutOfBounds(currentMapSheetDatas, people)){ // Si le personnage est en dehors du terrain
      people.setTarget();
    }
  });
};

// On dessine les personnages
const drawPeople = ()=> {
  // On itère sur la liste des personnages
  peopleList.forEach(people => {
    people.draw();
  });
};

// On dessine le héros
const drawHero = () => {
  hero.drawHero();
  // On dessine aussi les stats du héros en haut de l'écran
  hero.drawHeroDatas(stage.width - 200, 30, 3);
};

// Méthode pour afficher les boutons
const drawSwitchButton = () => {
  switchButtonList.forEach(button => {

    if(button.currentWorldPosition.mapSheetId === hero.currentWorldPosition.mapSheetId &&
       button.currentWorldPosition.wordlId === hero.currentWorldPosition.wordlId ){ // Si le boutton apparrient à la même map que la map courante
      button.draw();
    }

  })
}
// On dessine les personnages principaux
const drawMainCharacter = () => {
  mainCharacterList.forEach(mainCharacter => {

    if(config.checkSameMapSheet(mainCharacter, hero) ){ // On vérifie si le héros et le personnage principals sont sur la même carte

      mainCharacter.draw();

    }

  });
};

// On dessine les items/objets
const drawItems = () => {
  // On itère sur la liste des items
  itemList.forEach(item => {
    item.draw();
  });
};

// Dessine la boite de dialogue
export const drawDialogBox = () => {
  if(hero.isTalking){ // Si le heros est en mode discussion
    dialogBox.drawDialogs();
  }
};

// On dessine les passages secrets
const drawSecretPassage = ()=> {
  // On itère sur la liste des passages secrets
  secretPassageList.forEach(secretPassage => {
    secretPassage.draw();
  });
};

// On update les coordonnées du héros
const updateHero = () => {
    const x = hero.x;
    const y = hero.y;
    const centerX = hero.centerX;
    const centerY = hero.centerY;

    hero.update(event);

    // On itère sur toutes les portes de la mapsheet
    doorsList.forEach(door => {

      // On vérifie s'il y a une collision entre la porte et le héros
      if (config.checkCollision(door, hero)) { // Si passe par une porte

        removeDestructibleSprites();

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

      };

    });

    // On itère sur les passages secrets
    secretPassageList.forEach(passage =>{
      if(config.checkCollision(passage, hero)) { // On vérifie s'il y a une collision entre le passage secret et le héros

        // On renseigne la position du héro dans la pièce de destination
        hero.setHeroPosition(passage.destination);

        removeDestructibleSprites();

        // On récupère les informations sur la mapSheep courrante
        currentMapSheetDatas = config.getCurrentMapSheetDatas(hero);

        // On selectionne le bon background
        selectBackGroundImg(hero);

        // On initalise à nouveau les sprites en fonction de la mapsheet
        initSprites();
      }
    });


    let index = 0;
    // On vérifie s'il y a une collision entre un item/ Objet et le héros
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

    // On vérifie s'il y a collision entre le héros et un bouton
    switchButtonList.forEach(button => {

      if(config.checkCollision(button, hero)){ // Si collision
        if(button.target === 'secretPassage' && button.isOpen){
          alert('Levier désactivé');
        } else {
           alert('Levier activé');
        }
        button.toogleOpen();
      };

    });


    // On vérifie si le héros est sorti des limites
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

  if (event.code === 'Space'){ // Si le joueur appuie sur la touche ESPACE

    // On active le mode dialogue
    setDialogBox();

  } else if (event.keyCode === 13) { // Si touche ENTRER

    if(!config.gameActive){ // On n'est pas en phase de jeu

      // On lance la cinématique
      storytelling.launchStorytelling(1);
    }

	}  else { // n'importe quelle autre touche

    // on met à jour le hero
    updateHero();

  }
};

// On initialise tous les élémets du jeu
export const launchGame = (event) => {

  ctx.clearRect(0, 0, stage.width, stage.height);

  config.gameActive = true;

  // On initialise les sprites après un délai de deux secondes
  setTimeout(initSprites, 2000);

  // Méthode pour rafraichir tous les éléments du jeu toutes les secondes
  config.setInterval = setInterval(drawAll, 1000 / config.fps);
};

// Méthode qui met fin au jeu
const endGame = () => {

  // On reset les sprites dont le héros
  removeAllSprites();

  // On reset le canvas
  ctx.clearRect(0, 0, stage.width, stage.height);

  // On met fin à la phase de jeu
  config.gameActive = false;

  // On met fin au cycle de rafraichissement
  clearInterval(config.setInterval);

  storytelling.drawBlackScreen('the END');

  // on relance le menu du jeu
  setTimeout(config.drawHomeMenu, 3000);
};

// On ajoute une évènement qui se déclenche dès qu'une touche du clavier est enfoncée.
window.addEventListener('keydown', handleKeyboardInput);


// Méthode pour afficher tous les éléments dans l'animation
const drawAll = () => {

	drawBackground();
  updatePeople();
  drawHero();
  drawPeople();
  drawItems();
  drawMainCharacter();
  drawSwitchButton();
  drawSecretPassage();
  drawDialogBox();
};


// Méthode qui joue une piste sonore
const initSound = (url)  => {
  // audio.style.display = "none";
  const audio = document.getElementById('myPlayer');
  audio.src = url;
  audio.autoplay = true;
  audio.onended = function(){
    audio.remove() //Remove when played.
  };
  audio.addEventListener('click', audio.play);
};


initSound('../audio/soundtracks/far-east-kingdom.mp3');


// On déclenche le mode dialogue
const setDialogBox = () => {
    if(hero.isTalking === false){ // Le héros n'est pas déjà en cours de discussion

      peopleList.forEach(people => {
        // On vérifie s'il y a collision entre le héro et un personnage
        if(config.checkCollision(hero, people)){ // Si collision

          // Le héros passe en mode discussion
          hero.setTalkMode();

          // On injecte le personnage dans l'objet dialogBox
          dialogBox.getSprite(people);

          // On renseigne le message à afficher
          dialogBox.setMsgToDisplay();
        }
      });

      // On vérifie s'il y a collision entre le héros et l'un des personnages principaux
      mainCharacterList.forEach(mainCharacter => {

        if(config.checkCollision(hero, mainCharacter)){ // Si collision

          // Le héros passe en mode discussion
          hero.setTalkMode();

          if(mainCharacter.doSomething(hero)){ // Si le personnage principal constate que le héros a récupéré les 12 trésors

            // On renseigne une nouvelle discussion
            mainCharacter.dialog = ['bravo', 'c super', 'vous avez collecté tous les trésors'];

            // La partie est terminée
            // On met fin au jeu
            setTimeout(endGame, 5000);
          }
          // On injecte le personnage principal dans l'objet dialogBox
          dialogBox.getSprite(mainCharacter);

          // On renseigne le message à afficher
          dialogBox.setMsgToDisplay();
        }

      });


    } else { // Si le héros est déjà en train de discuter

      if (dialogBox.checkDialogContinue()){ // Si le dialogue continue

        // On passe au message suivant
        dialogBox.setMsgToDisplay();

      } else {
        // On stoppe la conversation
        hero.removeTalkMode();
      }

    }
};

// Méthode pour supprimer les personnages
const removePeople = () => {
  peopleList = [];
};

// Méthode pour supprimer les boutons
const removeSwitchButton = () => {
  switchButtonList = [];
};

// Méthode pour supprimer les passages secrets
const removeSecretPassage = ()=>{
  secretPassageList = [];
};

// Méthode pour supprimer tous les items
const removeItems = () =>{
  itemList = [];
};

// Méthode pour supprimer les personnages principaux
const removeMainCharacter = ()=>{
  mainCharacterList = [];
}

// Méthode pour supprimer les portes
const removeDoors = ()=> {
  doorsList = [];
}

// Méthode pour supprimer tous les sprites
const removeAllSprites = () => {
  removePeople();
  removeSwitchButton();
  removeSecretPassage();
  removeItems();
  removeMainCharacter();
  removeDoors();
  hero = {};
};

// On supprime les sprites que l'on est autorisé à détruire pendant la partie
const removeDestructibleSprites = () =>{
  removePeople();
  removeSecretPassage();
  removeItems();
  removeDoors();
};




