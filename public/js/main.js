import { Hero, Obstacles, Enemies, GeneralConfig} from './class.js';
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

// Méthode pour trouver un chiffre compris entre a et b
export const rangeNumber = (a,b)=> {
	return Math.floor((Math.random() * b)) + a;
}

let hero = {};
// let enemies = [];
let obstacle = [];

// On récupère la map
const firstMap = config.roomSheets.find(data => {
	return data.id === 1;
});
// On récupère la room
const room = firstMap.rooms.find(item=>{
	return item.id === 1;
});

// Méthode pour initialiser le héros
const InitHero = () => {
	// On initialise le héros
	hero = new Hero (1,1,2,2);
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
	
	InitHero();
/* 	const stageInfo = config.getStage();
	console.log('config', config);
	console.log('stageInfo', stageInfo);
	initEnemies(stageInfo); */

	// On positionne le Héro n'importe où sur la map
	hero.setHeroPosition(1000, 1000);
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

	// On charge une autre image
	tileFloorHouseImg.src = '../img/sprites/complete-spritesheet.png';
	tileFloorHouseImg.onload = () => {
	// ctx.drawImage(charImg, 0, 0);
	};

	// On charge une autre image
	tileChairHouseImg.src = '../img/sprites/complete-spritesheet.png';
	tileChairHouseImg.onload = () => {
	// ctx.drawImage(charImg, 0, 0);
	};

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
	// ctx.drawImage(roomImg, 0, 0);
	};

}

loadImages();

// Dessine l'image du menu
const drawHomeMenu = ()=> {
	// ctx.drawImage(backgroundImg,0,0,960,540,0,0,stage.width,stage.height);

	// On dessine une background d'accueil
	ctx.drawImage(
		roomImg,
		0 , // Position X de la partie à croper
		0 , // Position Y de la partie à croper
		750 , // Largeur de la partie à croper
		625 , // Hauteur de la partie à corper
		0, // Position x de l'image à croper sur le canvas
		0,  // Position y de l'image à croper sur le canvas
		750 , // Largeur de la partie cropée
		625 // Hauteur de la partie cropée
	);


	drawMessages('Appuyez sur Entrée', 50, 50);
}

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
const drawBackground = ()=> {
	// ctx.drawImage(backgroundImg, 0 , 0 ,960, 540, 0 , 0, stage.width , stage.height);

	ctx.drawImage(
		roomImg,
		hero.x - 351, // Position X de la partie à croper
		hero.y - 288.5, // Position Y de la partie à croper
		750 , // Largeur de la partie à croper
		625 , // Hauteur de la partie à corper
		0, // Position x de l'image à croper sur le canvas
		0,  // Position y de l'image à croper sur le canvas
		750 , // Largeur de la partie cropée
		625 // Hauteur de la partie cropée
	  ); 
}




// // Dessine le parquet au sol
// const drawFloor = ()=> {
// 	    let indexX = 0;
//     let indexY = 0;
//     [...new Array(41)].forEach(item => {
//     		[...new Array(20)].forEach(data => {
// 				ctx.drawImage(tileFloorHouseImg, 128 , 128 , 33 , 33, indexX * 33 , indexY * 33, 33 , 33);
// 				indexY++
// 				if(indexY === 20){
// 					indexY = 0;
// 				}
//     		});
//     	indexX++;
//     });
// }

// // dessine des chaises
// const drawChair = () => {
// 	let indexX = 0;
//     let indexY = 0;
//     [...new Array(41)].forEach(item => {
//     		[...new Array(20)].forEach(data => {
//     			if (Math.random() > 0.8){
//     				ctx.drawImage(tileChairHouseImg, 322 , 193 , 33 , 33, indexX * 33 , indexY * 33, 33 , 33);
//     			}

// 				indexY++
// 				if(indexY === 20){
// 					indexY = 0;
// 				}
//     		});
//     	indexX++;
//     });
// }

const updateHero = (event) => {

	if (event.keyCode !== 13){ // Si la touche appuyée est différente d'entrée
		const x = hero.x;
		const y = hero.y;
		const centerX = hero.centerX;
		const centerY = hero.centerY;
		
		hero.update(event);
		

		console.log('checkOutOfBounds(room)', checkOutOfBounds(room));
	
		// if(checkOutOfBounds(room)){ // Si le héro est en dehors du terrain
		if(false){ // Si le héro est en dehors du terrain		
			hero.x = x;
			hero.y = y;
			hero.centerX = centerX;
			hero.centerY = centerY;
			hero.setMapIndexPosition();
		}
		
	
		// Si la/les balles volantes est sortie du terrain on change son statut
/* 		hero.bulletsList.forEach(item => {
			if(item.isFlying && checkOutOfBounds(item)){
				item.isFlying = false;
				
				// On inrémente le nombre de balle tirée
				hero.shootedBullet += 1;
			}
		}) */
	}
}

const launchGame = (event) => {

	if (event.keyCode === 13) { // si touche "Entrée"

		// On initialise les sprites
		setTimeout(initSprites, 1000);

		// Méthode pour rafraichir le jeu
		config.setInterval = setInterval(drawAll, 1000 / config.fps);
		
		// setTimeout(startRefresh, 5000);
		// return startRefresh;
	}
};

// Méthode qui met fin au jeu
const endGame = () => {
	clearInterval(config.setInterval);
	
	// On reset les sprites
	hero = {};
	enemies = [];
}

// On ajoute une évènement qui se déclenche dès qu'une touche du clavier est activée.
window.addEventListener('keydown', updateHero);

// On ajoute une évènement qui se déclenche dès qu'une touche du clavier est activée.
window.addEventListener('keydown', launchGame);


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
}

// Méthode qui vérifie si le héro est sorti des limites autorisées
export const checkOutOfBounds = (currentRoom) => {
		
		// Si index du joueur vaut 0 sur la map il y a collision
		if (currentRoom.collisionArray[hero.mapIndexPosition] === 0) {
			console.log('collision');
			console.log('room.collisionArray[hero.mapIndexPosition]', room.collisionArray[hero.mapIndexPosition]);
			return true;
		} else { // Sinon, pas de collision
			console.log('pas de collision');
			console.log('room.collisionArray[hero.mapIndexPosition]', room.collisionArray[hero.mapIndexPosition]);
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
const drawMessages = (msg,x,y) => {
	ctx.font = "40px Arial";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText(msg, x, y);
}




