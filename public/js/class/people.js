import { ctx, rangeNumber, hero, config} from '../main.js';

// classe d'un people
export class People {

 // Constructeur de la classe people...
 constructor(x, y, speedX, speedY) {

    this.reference = this.setReference();
    this.characterImg = config.getImage(this.reference);
    this.x = x; // Position X sur la map
    this.y = y; // Position Y sur la map
    this.dx = 0;
    this.dy = 0;
    this.width = 48;
    this.height = 48;
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
    this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
    this.speedX = speedX;
    this.speedY = speedY;
    this.faceX = 0;
    this.faceY = 30;
    this.target = {x: 388, width: 100, y: 800, height:100, direction: 'south'};
    this.currentLoopIndex = 0;
    this.rightCycleLoop = [{faceX:0,faceY:64}, {faceX:32,faceY:64},{faceX:0,faceY:64},{faceX:64,faceY:64}];
    this.leftCycleLoop = [{faceX:0,faceY:32}, {faceX:32,faceY:32},{faceX:0,faceY:32},{faceX:64,faceY:32}];
    this.upCycleLoop = [{faceX:0,faceY:96}, {faceX:32,faceY:96},{faceX:0,faceY:96},{faceX:64,faceY:96}];
    this.downCycleLoop = [{faceX:0,faceY:0}, {faceX:32,faceY:0},{faceX:0,faceY:0},{faceX:64,faceY:0}];
    this.moveStatus = true;
    //this.lifeCredits = 3;
    //this.isDead = false;
    //this.shootedBullet = 0;
    //this.bulletCredits = 10;
    //this.bulletsList = new Array(this.bulletCredits);
    //this.shootDirection = 'right';
    // for(let i = 0; i < this.bulletCredits; i++){
    //   this.bulletsList[i] = new Bullet(1,1);
    // }
  }

  // Méthode pour afficher le sprite du people
  draw() {
    ctx.drawImage(
      this.characterImg,
      this.faceX , // Position X de la partie à croper
      this.faceY , // Position Y de la partie à croper
      30 , // Largeur de la partie à croper
      30 , // Hauteur de la partie à corper
      //this.x, // Position x de l'image à croper sur le canvas
      // this.y,  // Position y de l'image à croper sur le canvas
      351 - (hero.x - this.x),
      288.5 - (hero.y - this.y),
      this.width, // Largeur de la partie cropée
      this.height // Hauteur de la partie cropée
    );
  }

  // Méthode qui va modifier les coordonnées du people.
  update() {

    if(this.moveStatus){ // S'il a le droit de bouger


      if(this.frame === this.fps){
        this.frame = 0;
      } else {
        this.frame++;
      }

      // On détermine quel sprite afficher
      if (this.frame % 3 === 0){ // on décide d'incrémenter l'index toutes les 3 frames
        this.currentLoopIndex++;
      }

      // Si l'index est supérieur au nombre de position possible on le repositionne à zero
      if (this.currentLoopIndex >= this.rightCycleLoop.length) {
        this.currentLoopIndex = 0;
      }

      switch (this.target.direction) {
        case 'east':
          this.speedX = 2;

          this.x = (this.x + this.speedX);

          // On détermine la positon x/y du crop du personnage
          this.faceX = this.rightCycleLoop[this.currentLoopIndex].faceX;
          this.faceY = this.rightCycleLoop[this.currentLoopIndex].faceY;
          // this.shootDirection = 'right';

          break;

        case 'west':
          this.speedX = 2;

          this.x = (this.x - this.speedX);

          // On détermine la positon x/y du crop du personnage
          this.faceX = this.leftCycleLoop[this.currentLoopIndex].faceX;
          this.faceY = this.leftCycleLoop[this.currentLoopIndex].faceY;
          break;

        case 'north':
          this.speedY = 2;

          this.y = (this.y - this.speedY);

          // On détermine la positon x/y du crop du personnage
          this.faceX = this.upCycleLoop[this.currentLoopIndex].faceX;
          this.faceY = this.upCycleLoop[this.currentLoopIndex].faceY;
          // this.shootDirection = 'up';
          break;

        case 'south':

          this.speedY = 2;
          this.y = (this.y + this.speedY);
          // On détermine la positon x/y du crop du personnage
          this.faceX = this.downCycleLoop[this.currentLoopIndex].faceX;
          this.faceY = this.downCycleLoop[this.currentLoopIndex].faceY;
          // this.shootDirection = 'down';
          break;

          default:
            alert('default update');
            break;
      }

    } else {

      this.speedX = 0;
      this.speedY = 0;
    }

    // On recalcule le centre du people
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));

    if(this.checkTargetCollision()){ // Si il a atteint sa cible on définit une nouvelle cible

      this.setTarget();
    }

  }


  // Méthode pour réinitialiser la position du people
/*  setHeroPosition(destination) {
    this.x = destination.x;
    this.y = destination.y;
    this.currentWorldPosition.worldId = destination.worldId;
    this.currentWorldPosition.mapSheetId = destination.mapSheetId;
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
    this.setMapIndexPosition();
  };*/


  // Méthode pour récupérer le nombre de crédit
/*  getLifeCredit(){
  return this.lifeCredits;
  }

  // On vérifie si le héro est mort
  isHeroDead(){
    return this.isDead;
  }

  // Méthode pour connaitre la direction du joueur
  getDirection(){
    return this.shootDirection;
  }*/

  // Méthode pour récupérer le nombre de balle restant
  // getRemainingBullet(){
  //   return this.bulletsList.length - this.shootedBullet;
  // }

  // Méthode pour setter l'index du héros sur la map
  setMapIndexPosition(){
    this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));

  }

  // Méthode qui détermine la position cible du people
  setTarget(){


    const randomNumber = rangeNumber(1,4);

    this.target = {};

    switch(randomNumber){
      case 1 : // A l'est
        this.target = {x: this.x + 200 ,width: 100, y: this.y - 25, height: 100, direction : 'east'};
      break;
      case 2 : // A l'ouesté
        this.target = {x: this.x - 200 , width: 100, y: this.y - 25, height: 100, direction : 'west' };
      break;
      case 3 : // Au nord
        this.target = {x: this.x - 25, width: 100, y: this.y - 200, height: 100,  direction : 'north' };
      break;
      case 4 : // Au sud
        this.target = {x: this.x - 25, width: 100, y: this.y + 200, height: 100, direction : 'south' };
      break;

      default:
      this.target = {x: this.x + 200, width: 100 , y: this.y - 25,height: 100, direction : 'east'};
      break;
    };

  }

  // Est-ce qu'il a atteint sa cible
  checkTargetCollision() {

   if((this.target.x < this.centerX) && (this.centerX < (this.target.x + this.target.width))
     && (this.target.y < this.centerY)
     && (this.centerY < (this.target.y + this.target.height))) {
       return true;
    } else {
      return false;
    }
  }

  // Dessine la cible courante du people sur le canvas
  drawTarget(){
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(
        351 - (hero.x - this.target.x),
        288.5 - (hero.y - this.target.y),
        100,
        100
      );
  }

  // Méthode qui renvoie une reference de people
  setReference(){
    const randomId = rangeNumber(1,12);
    return `persofigurant${randomId}`;
  }

}
