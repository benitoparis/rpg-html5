import { ctx, rangeNumber, charImg, hero} from '../main.js';

// classe d'un people
export class People {

 // Constructeur de la classe people...
 constructor(dx, dy, speedX, speedY) {

    this.x = 400; // Position X sur la map
    this.y = 400; // Position Y sur la map
    this.dx = dx;
    this.dy = dy;
    this.width = 48;
    this.height = 48;
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
    this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
    this.speedX = speedX;
    this.speedY = speedY;
    this.faceX = 70;
    this.faceY = 207;
    this.target = {x: 400, y: 800, direction: 'south'};
    this.currentLoopIndex = 0;
    this.rightCycleLoop = [{faceX:70,faceY:120},{faceX:8,faceY:120},{faceX:140,faceY:120},{faceX:8,faceY:120}];
    this.leftCycleLoop = [{faceX:8,faceY:310},{faceX:70,faceY:310},{faceX:8,faceY:310},{faceX:140,faceY:310}];
    this.upCycleLoop = [{faceX:8,faceY:22},{faceX:70,faceY:22},{faceX:8,faceY:22},{faceX:140,faceY:22}];
    this.downCycleLoop = [{faceX:8,faceY:210},{faceX:70,faceY:210},{faceX:8,faceY:210},{faceX:140,faceY:210}];
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
      charImg,
      this.faceX , // Position X de la partie à croper
      this.faceY , // Position Y de la partie à croper
      74 , // Largeur de la partie à croper
      95 , // Hauteur de la partie à corper
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

    // On reiseigne une nouvelle cible
    //this.setTarget();

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
      case "east":

        if (this.faceY === 310) {
          this.speedX = 1;
          this.speedY = 0;
        }
        this.x = (this.x + this.speedX);

        // On détermine la positon x/y du crop du personnage
        this.faceX = this.rightCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.rightCycleLoop[this.currentLoopIndex].faceY;
        // this.shootDirection = 'right';

        break;

      case "west":

        if (this.faceY === 120) {
          this.speedX = 1;
          this.speedY = 0;
        }
        this.x = (this.x - this.speedX);

        // On détermine la positon x/y du crop du personnage
        this.faceX = this.leftCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.leftCycleLoop[this.currentLoopIndex].faceY;

        // this.shootDirection = 'left';
        break;

      case "north":

        if(this.faceY === 210) {
          this.speedX = 0;
          this.speedY = 1;
        }
        this.y = (this.y - this.speedY);

        this.faceX = 8;
        this.faceY = 22;

        // On détermine la positon x/y du crop du personnage
        this.faceX = this.upCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.upCycleLoop[this.currentLoopIndex].faceY;
        // this.shootDirection = 'up';
        break;

      case "south":

        if (this.faceY === 22) {
          this.speedX = 0;
          this.speedY = 1;
        }
        this.y = (this.y + this.speedY);

        this.faceX = 8;
        this.faceY = 210;
        // On détermine la positon x/y du crop du personnage
        this.faceX = this.downCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.downCycleLoop[this.currentLoopIndex].faceY;
        // this.shootDirection = 'down';
        break;

        default:
          break;
    }


    // On recalcule le centre du people
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));

    // On recalcule la position de l'index du people sur la map
    // this.setMapIndexPosition();

    console.log('this.x', this.x);
    console.log('this.y', this.y);

    if(this.reachTarget()){ // S'il a atteint sa cible
       // On renseigne une nouvelle cible
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
    console.log('randomNumber', randomNumber);

    switch(randomNumber){
      case 1 : // A l'est
        this.target = {x: this.x + 200 , y: this.y , direction : 'east'};
        console.log('1');
        console.log('this.target', this.target);
      break;
      case 2 : // A l'ouest
        this.target = {x: this.x - 200 , y: this.y, direction : 'west' };
        console.log('2');
        console.log('this.target', this.target);
      break;
      case 3 : // Au nord
        this.target = {x: this.x, y: this.y - 200, direction : 'north' };
        console.log('3');
        console.log('this.target', this.target);
      break;
      case 4 : // Au sud
        this.target = {x: this.x, y: this.y + 200, direction : 'south' };
      console.log('4');
      console.log('this.target', this.target);
      break;

      default:
      alert('default direction');
      this.target = {x: this.x + 200 , y: this.y , direction : 'east'};
      break;

    };

  }

  // Est-ce qu'il a atteint sa cible
  reachTarget() {

    if (this.x === this.target.x && this.y === this.target.y){
      return true;
    } else {
      return false;
    }
  }

}
