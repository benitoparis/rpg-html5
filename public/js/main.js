import { Hero } from './class/hero.js';
import { Obstacles } from './class/obstacles.js';
import { Enemies } from './class/enemies.js';
import { GeneralConfig } from './class/general-config.js';
import { Bullet } from './class/bullet.js';

// Déclaration des variables
const stage = document.getElementById("stage");
stage.width = 750;
stage.height = 625;
// On utilise la méthode getContext pour aller chercher les methodes et les propriétés du canvas
export const ctx = stage.getContext("2d");
export const config = new GeneralConfig();
export const charImg = new Image();
export const enemyDragonImg = new Image();
export const enemyKnightImg = new Image();
export const enemySkeletonImg = new Image();
const backgroundImg = new Image();
const tileFloorHouseImg = new Image();
const tileChairHouseImg = new Image();
const roomImg = new Image();
const roomImgLayer1 = new Image();
const roomImgLayer2 = new Image();
const roomImgLayer3 = new Image();

let backgroundToDisplay = [];
let currentMapSheetDatas;


// Méthode pour trouver un chiffre compris entre a et b
export const rangeNumber = (a,b)=> {
  return Math.floor((Math.random() * b)) + a;
}

let hero = {};
// let enemies = [];
let obstacle = [];



// Méthode pour initialiser le héros
const InitHero = () => {
  // On initialise le héros
  hero = new Hero (1,1,15,15);
}

// On initialise les énnemis
/* const initEnemies = (stageInformation) => {
  console.log('stageInformation', stageInformation);
  for (let i = 0; i < stageInformation.maxEnemies; i++) {
    enemies[i] = new Enemies(
      rangeNumber(100, 500),
      rangeNumber(50, 200),
      50,
      50,
      stageInformation
    );
  }
}; */

// Méthode pour initialiser les sprites animés
const initSprites = () => {

  console.log('par la');

  InitHero();

  // On récupère les informations sur la mapSheep courrante
  currentMapSheetDatas = config.getCurrentMapSheetDatas(hero);

  // On selectionne le bon background
  selectBackGroundImg(hero);
}

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
}

// Méthode pour connaitre l'image de fond à afficher
const selectBackGroundImg = (hero) => {

  if (hero.currentWorldPosition.worldId === 1 && hero.currentWorldPosition.mapSheetId === 1){

    backgroundToDisplay.push(roomImg);

  }

  if(hero.currentWorldPosition.wordlId === 1 && hero.currentWorldPosition.mapSheetId === 2){
    backgroundToDisplay.push(roomImgLayer1, roomImgLayer2, roomImgLayer3) ;

  }

}

// Méthode pour vérifier la collision entre un élément a et b en prenant en compte les index sur la map
export const checkCollisionByMapIndex = (room) => {


	// Si index du joueur vaut 0 sur la map il y a collision
	if (room.collisionArray[hero.mapIndexPosition] === 0) {
		console.log('collision');
		console.log('room.collisionArray[hero.mapIndexPosition]', room.collisionArray[hero.mapIndexPosition]);
	} else { // Sinon, pas de collision
		console.log('pas de collision');
		console.log('room.collisionArray[hero.mapIndexPosition]', room.collisionArray[hero.mapIndexPosition]);
	}

}



// Méthode pour charger les images
const loadImages = () => {

  // On charge l'image du héro.
  charImg.src = '../img/sprites/spritesheet2.png';
  charImg.onload = () => {
  // ctx.drawImage(charImg, 0, 0);
  };



  // // On charge une autre image
  // tileFloorHouseImg.src = '../img/sprites/complete-spritesheet.png';
  // tileFloorHouseImg.onload = () => {
  // // ctx.drawImage(charImg, 0, 0);
  // };

  // // On charge une autre image
  // tileChairHouseImg.src = '../img/sprites/complete-spritesheet.png';
  // tileChairHouseImg.onload = () => {
  // // ctx.drawImage(charImg, 0, 0);
  // };

  // On charge le background complet image
  backgroundImg.src = '../img/background/1.png';
  backgroundImg.onload = () => {
  //ctx.drawImage(charImg, 0, 0);
    drawHomeMenu();
  };

  // On charge l'image du premier ennemie (dragon)
  enemyDragonImg.src = '../img/sprites/dragon.png';
  enemyDragonImg.onload = () => {
  // ctx.drawImage(charImg, 0, 0);
  };

  // On charge l'image du second ennemi (chevalier)
  enemyKnightImg.src = '../img/sprites/knight.png';
  enemyKnightImg.onload = () => {
  // ctx.drawImage(charImg, 0, 0);
  };

  // On charge l'image du troisième (squelette)
  enemySkeletonImg.src = '../img/sprites/squelette.png';
  enemySkeletonImg.onload = () => {
  // ctx.drawImage(charImg, 0, 0);
  };

  // On charge l'image de la room
  roomImg.src = '../img/rooms/room1.png';
  roomImg.onload = () => {
  ctx.drawImage(roomImg, 0, 0);
  };

  // On charge l'image de la room
  roomImgLayer1.src = '../img/rooms/layer_01.png';
  roomImgLayer1.onload = () => {
  // ctx.drawImage(roomImg, 0, 0);
  };

  // On charge l'image de la room
  roomImgLayer2.src = '../img/rooms/layer_02.png';
  roomImgLayer2.onload = () => {
  // ctx.drawImage(roomImg, 0, 0);
  };

  // On charge l'image de la room
  roomImgLayer3.src = '../img/rooms/layer_03.png';
  roomImgLayer3.onload = () => {
  // ctx.drawImage(roomImg, 0, 0);
  };

}




loadImages();


// Dessine l'image du menu
const drawHomeMenu = ()=> {
  // ctx.drawImage(backgroundImg,0,0,960,540,0,0,stage.width,stage.height);


  // On dessine un fond noir sur l'écran d'accueil
  ctx.fillStyle="#000000";
  ctx.fillRect(0,0, stage.width, stage.height);
  // On affiche les messages
  drawMessages('RPG GAME', stage.width / 5 , stage.height / 3, 1);
  drawMessages('Press ENTER', stage.width / 5 , stage.height / 2, 2);
  drawMessages(' ©2020    BG', stage.width / 4, 500, 2);

  dialogBox('storyTelling');
};

// Dessine l'image entre deux niveaux
/* const drawInterStage = ()=> {
  ctx.drawImage(backgroundImg,0,0,960,540,0,0,stage.width,stage.height);
  drawMessages(`Niveau ${config.playerProgress.currentStage}`);
  drawMessages('Appuyez sur Entrée pour jouer', 50, 300);
} */

// Dessine l'image entre deux niveaux
/* const drawFinishedGame = ()=> {
  ctx.drawImage(backgroundImg,0,0,960,540,0,0,stage.width,stage.height);
  drawMessages(`LE JEU EST TERMINE`, 50, 50);
  drawMessages(`vous terminez avec ${config.playerProgress.totalPoints} points`, 50, 100);
  drawMessages('Appuyez sur Entrée pour rejouer', 50, 300);
} */

// Dessine l'image de classement des joueurs
/* const drawRanking = () => {
  // On affiche une image de fond
  ctx.drawImage(backgroundImg,0,0,960,540,0,0,stage.width,stage.height);

  // On dessine le rectangle on l'on va écrire les noms au classement
  ctx.fillStyle="#151348";
  ctx.fillRect(50,50,860,320);
  // On dessine le border blanc sur le rectangle
  ctx.strokeStyle = "#FFFFFF"
  ctx.strokeRect(50, 50, 860, 320);
  // Les coordonnées d'affichage du nom des joueurs du classement
  let x = 50;
  let y = 50;
  // On affiche le nom des joueurs du classement
  config.playersRanking.forEach(player => {
    let msg = `${player.nickname} - ${player.nickname}`;
    drawMessages(msg,x,y);
    y +=20;
  })
} */


// Dessine l'image de fond
const drawBackground = () => {

      backgroundToDisplay.forEach(item => {

                // ctx.drawImage(backgroundImg, 0 , 0 ,960, 540, 0 , 0, stage.width , stage.height);
        ctx.drawImage(
          item,
          hero.x - 351, // Position X de la partie à croper
          hero.y - 288.5, // Position Y de la partie à croper
          750 , // Largeur de la partie à croper
          625 , // Hauteur de la partie à corper
          0, // Position x de l'image à croper sur le canvas
          0,  // Position y de l'image à croper sur le canvas
          750 , // Largeur de la partie cropée
          625 // Hauteur de la partie cropée
        );
      })




  // ctx.drawImage(backgroundImg, 0 , 0 ,960, 540, 0 , 0, stage.width , stage.height);
 //  ctx.drawImage(
 //    backgroundToDisplay,
 //    hero.x - 351, // Position X de la partie à croper
 //    hero.y - 288.5, // Position Y de la partie à croper
 //    750 , // Largeur de la partie à croper
 //    625 , // Hauteur de la partie à corper
 //    0, // Position x de l'image à croper sur le canvas
 //    0,  // Position y de l'image à croper sur le canvas
 //    750 , // Largeur de la partie cropée
 //    625 // Hauteur de la partie cropée
 //  );

	// // ctx.drawImage(backgroundImg, 0 , 0 ,960, 540, 0 , 0, stage.width , stage.height);
	// ctx.drawImage(
	// 	backgroundToDisplay,
	// 	hero.x - 351, // Position X de la partie à croper
	// 	hero.y - 288.5, // Position Y de la partie à croper
	// 	750 , // Largeur de la partie à croper
	// 	625 , // Hauteur de la partie à corper
	// 	0, // Position x de l'image à croper sur le canvas
	// 	0,  // Position y de l'image à croper sur le canvas
	// 	750 , // Largeur de la partie cropée
	// 	625 // Hauteur de la partie cropée
	// );

  // ctx.drawImage(
  //   roomImgLayer2,
  //   hero.x - 351, // Position X de la partie à croper
  //   hero.y - 288.5, // Position Y de la partie à croper
  //   750 , // Largeur de la partie à croper
  //   625 , // Hauteur de la partie à corper
  //   0, // Position x de l'image à croper sur le canvas
  //   0,  // Position y de l'image à croper sur le canvas
  //   750 , // Largeur de la partie cropée
  //   625 // Hauteur de la partie cropée
  // );

  // ctx.drawImage(
  //   roomImgLayer3,
  //   hero.x - 351, // Position X de la partie à croper
  //   hero.y - 288.5, // Position Y de la partie à croper
  //   750 , // Largeur de la partie à croper
  //   625 , // Hauteur de la partie à corper
  //   0, // Position x de l'image à croper sur le canvas
  //   0,  // Position y de l'image à croper sur le canvas
  //   750 , // Largeur de la partie cropée
  //   625 // Hauteur de la partie cropée
  // );
};


const updateHero = (event) => {

	if (event.keyCode !== 13) { // Si la touche appuyée est différente d'entrée on update le hero
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



		// On vérifie si le héros est sorti des limites
    if(checkOutOfBounds(currentMapSheetDatas)){ // Si le héro est en dehors du terrain
			hero.x = x;
			hero.y = y;
			hero.centerX = centerX;
			hero.centerY = centerY;
			hero.setMapIndexPosition();
		}

	} else { // le joueur a appuyé sur la touche entrée

    // On lance le jeu
    launchGame();

  }

}

const launchGame = (event) => {

  // if (event.keyCode === 13) { // si touche "Entrée"

    // On initialise les sprites
    setTimeout(initSprites, 2000);

    // Méthode pour rafraichir le jeu
    config.setInterval = setInterval(drawAll, 1000 / config.fps);

};

// Méthode qui met fin au jeu
const endGame = () => {
  clearInterval(config.setInterval);

  // On reset les sprites
  hero = {};
  enemies = [];
};

// On ajoute une évènement qui se déclenche dès qu'une touche du clavier est activée.
window.addEventListener('keydown', updateHero);

// On ajoute une évènement qui se déclenche dès qu'une touche du clavier est activée.
// window.addEventListener('keydown', launchGame);


// Méthode pour dessiner tous les énnemis de la liste
/* const drawEnemies = () => {
  // On intère sur chaque énnemies de la liste
  enemies.forEach(enemy => {
    enemy.draw();
  });
} */

// Méthode pour mettre à jour les coordonnées des énnemis
/* const updateEnemies = () => {
  enemies.forEach(enemy=> {
    enemy.update();
  });
} */

// Méthode pour afficher tous les éléments dans l'animation
const drawAll = () => {

	drawBackground();
/* 	config.drawHeroLifeCredit(hero.getLifeCredit());
	config.drawStageName();
	config.drawRemainingBullet(hero.getRemainingBullet()); */

	hero.drawHero();



	// On renseigne l'index du joueur sur la map à l'aide des ses coordonnées x/y
	// hero.setMapIndexPosition();



	// On vérifie la collision entre le héro et les obstacles
	// checkCollisionByMapIndex(room);


	// On vérifie s'il y a collision entre la balle et un ennemi
/* 	enemies.forEach(enemy => {
		if (checkCollision(enemy, hero.bulletsList[hero.shootedBullet])){
			console.log('colision entre une balle et un ennemi');
			killEnemy(enemy);
		};
	}); */

	// On vérifie s'il y a collision entre le héro et un ennemi
/* 	enemies.forEach(enemy => {
		if (checkCollision(enemy, hero)){
			console.log('colision entre une balle et un ennemi');
			if(hero.isHeroDead()){ // Si le héro est mort
				// On arrete la partie
				endGame();
				// On indique un message
				drawMessages('Perdu ! La partie est terminée', 50, 300);
				// On affiche le classement général des joueurs
				drawRanking();
				setTimeout(drawHomeMenu, 5000);
			} else {
				hero.removeLifeCredit();
				hero.resetHeroPosition();
			}

		};
	}); */

/* 	if(hero.bulletsList[hero.shootedBullet].isFlying === true){
		hero.bulletsList[hero.shootedBullet].drawBullet();
		hero.bulletsList[hero.shootedBullet].update();
	} */
	// drawEnemies();
	// updateEnemies();

	// Si tous les énnemis sont morts
/* 	if (enemies.length === 0) {

		// On arrete la partie
		endGame();
		// On indique un message
		drawMessages('Bravo, la partie est terminée', 50, 300);

		// On passe au tableau suivant
		if(config.stageConfig.length > config.playerProgress.currentStage){
			config.playerProgress.currentStage++

			// On enregistre la progression du héros
			config.updateHero();

		} else {
			drawFinishedGame()
		}


		// On relance le jeu
		setTimeout(drawInterStage, 1000);
	} */

	// Si plus de balle
/* 	if(hero.getRemainingBullet() === 0){
		// On arrete la partie
		endGame();
		// On indique un message
		drawMessages('Perdu, la partie est terminée', 50, 300);

		// On relance le jeu
		setTimeout(drawInterStage, 1000);

	} */

};

// Méthode qui vérifie si le héro est sorti des limites autorisées
export const checkOutOfBounds = (currentMap) => {

		// Si index du joueur vaut 0 sur la map il y a collision
		if (currentMap.collisionArray[hero.mapIndexPosition] === 0) {
			console.log('collision');
			return true;
		} else { // Sinon, pas de collision
			console.log('pas de collision');
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



// Méthode pour écrire des messages sur l'écran
const drawMessages = (msg,x,y, fontsize) => {
  switch(fontsize) {
    case 1:
      ctx.font = "100px Arial";
      break;
    case 2:
      ctx.font = "40px Arial";
      break;
    case 3:
      ctx.font = "20px Arial";
      break;
  }
  ctx.fillStyle = "#FFFFFF";

  console.log('msg.length', msg.length);

  for(let i = 0; i <= msg.length; i += 60){
    let start = i;
    let end = i  + 60;
    y += 25;

    let cuttedMsg = msg.slice(start, end);
    console.log(start,end, y, cuttedMsg);
    ctx.fillText(cuttedMsg, x, y);

  }


}


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

// Pour dessiner un cadre de dialogue
const dialogBox = style => {

  switch(style){
    case 'storyTelling':
      // On dessine un fond noir sur l'écran d'accueil
      ctx.fillStyle="#5858BA";
      ctx.fillRect(50, 400, stage.width - 100, 200);
      // On dessine le border sur le rectangle
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 3;
      ctx.strokeRect(50, 400, stage.width - 100, 200);

      drawMessages("Fusce eu nunc non tortor dignissim elementum quis eget justo. Mauris scelerisque eu justo sed pulvinar. Sed at hendrerit leo. Vivamus ut tortor viverra, vestibulum lorem non, accumsan dui.", 70, 450, 3);
    break;

    case 'dialog':
      // On dessine un fond noir sur l'écran d'accueil
      ctx.fillStyle="#5858BA";
      ctx.fillRect(50, 400, stage.width - 100 , 200);
      // On dessine le border sur le rectangle
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 3;
      ctx.strokeRect(50, 400, stage.width - 100, 200);

      drawMessages("Fusce eu nunc non tortor dignissim elementum quis eget justo. Mauris scelerisque eu justo sed pulvinar. Sed at hendrerit leo. Vivamus ut tortor viverra, vestibulum lorem non, accumsan dui.", 70, 450, 3);
    break;
  }

  // function fillTextMultiLine(ctx, text, x, y) {
  //   var lineHeight = ctx.measureText("M").width * 1.2;
  //   var lines = text.split("\n");
  //   for (var i = 0; i < lines.length; ++i) {
  //     ctx.fillText(lines[i], x, y);
  //     y += lineHeight;
  //   }
  // }

}



