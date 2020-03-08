import { ctx, hero, config, dialogBox} from '../main.js';
import { WorldPosition } from './world-position.js';
import { TargetZone } from './target-zone.js';

// classe d'un people
export class People {

 // Constructeur de la classe people...
 constructor(params) {

    this.name = params.name;
    this.reference = params.reference;
    this.characterImg = config.getImage(this.reference);
    /* propriétés communes sprites animés */
    this.x = params.x; // Position X sur la map
    this.y = params.y; // Position Y sur la map
    this.width = 48;
    this.height = 48;
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
    this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
    this.speedX = 15;
    this.speedY = 15;
    this.faceX = 0;
    this.faceY = 64;
    this.currentLoopIndex = 0;
    this.rightCycleLoop = [{faceX:0,faceY:64}, {faceX:32,faceY:64},{faceX:0,faceY:64},{faceX:64,faceY:64}];
    this.leftCycleLoop = [{faceX:0,faceY:32}, {faceX:32,faceY:32},{faceX:0,faceY:32},{faceX:64,faceY:32}];
    this.upCycleLoop = [{faceX:0,faceY:96}, {faceX:32,faceY:96},{faceX:0,faceY:96},{faceX:64,faceY:96}];
    this.downCycleLoop = [{faceX:0,faceY:0}, {faceX:32,faceY:0},{faceX:0,faceY:0},{faceX:64,faceY:0}];
    this.dialog = params.dialog;
    this.currentWorldPosition = new WorldPosition(params.belongsToWorldId,params.belongsToMapSheetId );

    this.target = {x: 388, width: 100, y: 800, height: 100, direction: 'south'};

  }

  // Méthode pour afficher le people
  draw() {
    ctx.drawImage(
      this.characterImg,
      this.faceX , // Position X de la partie à croper
      this.faceY , // Position Y de la partie à croper
      30 , // Largeur de la partie à croper
      30 , // Hauteur de la partie à corper
      351 - (hero.x - this.x),
      288.5 - (hero.y - this.y),
      this.width, // Largeur de la partie cropée
      this.height // Hauteur de la partie cropée
    );
  }

  // Méthode qui va modifier les coordonnées du people.
  update() {

    this.setCurrentLoopIndex();

    switch (this.target.direction) {
      case 'east':
        this.speedX = 2;

        this.x = (this.x + this.speedX);

        // On détermine la positon x/y du crop du personnage
        this.faceX = this.rightCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.rightCycleLoop[this.currentLoopIndex].faceY;

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
        break;

      case 'south':

        this.speedY = 2;
        this.y = (this.y + this.speedY);
        // On détermine la positon x/y du crop du personnage
        this.faceX = this.downCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.downCycleLoop[this.currentLoopIndex].faceY;
        break;

        default:
          alert('default update');
          break;
    }

    this.setCenter();

    if(this.checkTargetCollision()){ // Si il a atteint sa cible on définit une nouvelle cible

      this.setTarget(false);
    }
  }

  // Méthode qui détermine la position cible du people
  setTarget(isCollide){

    if (isCollide){ // Si collision

      switch (this.target.direction){
        case 'east':
          this.target = {x: this.x - 200 , width: 100, y: this.y - 25, height: 100, direction : 'west' };
          break;
        case 'west':
          this.target = {x: this.x + 200 ,width: 100, y: this.y - 25, height: 100, direction : 'east'};
          break;
        case 'north':
          this.target = {x: this.x - 25, width: 100, y: this.y + 200, height: 100, direction : 'south' };
          break;
        case 'south':
          this.target = {x: this.x - 25, width: 100, y: this.y - 200, height: 100,  direction : 'north' };
          break;
      }

    } else { // Si pas de collision alors on set une nouvelle cible

      this.target = new TargetZone(this.x, this.y);
      console.log('this.target', this.target);



      // const randomNumber = config.rangeNumber(1,4);

      // this.target = {};

      // switch(randomNumber){
      //   case 1 : // A l'Est
      //     this.target = {x: this.x + 200 ,width: 100, y: this.y - 25, height: 100, direction : 'east'};
      //   break;
      //   case 2 : // A l'Ouest
      //     this.target = {x: this.x - 200 , width: 100, y: this.y - 25, height: 100, direction : 'west' };
      //   break;
      //   case 3 : // Au Nord
      //     this.target = {x: this.x - 25, width: 100, y: this.y - 200, height: 100,  direction : 'north' };
      //   break;
      //   case 4 : // Au Sud
      //     this.target = {x: this.x - 25, width: 100, y: this.y + 200, height: 100, direction : 'south' };
      //   break;

        // default:
        // this.target = {x: this.x + 200, width: 100 , y: this.y - 25,height: 100, direction : 'east'};
        // break;
      // };
    }


  }

  // On recalcule le centre du people
  setCenter(){

    // On recalcule le centre du people
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
  }

  drawTarget(){
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(
      351 - (hero.x - this.target.x),
      288.5 - (hero.y - this.target.y),
      this.target.width,
      this.target.height);
  }


  // Méthode qui renseigne l'index de la séquence de marche
  setCurrentLoopIndex(){
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
  }

  // Méthode qui vérifie si le people a atteint sa cible
  checkTargetCollision() {

   if((this.target.x < this.centerX) && (this.centerX < (this.target.x + this.target.width))
     && (this.target.y < this.centerY)
     && (this.centerY < (this.target.y + this.target.height))) {
       return true;
    } else {
      return false;
    }
  }

  // Méthode pour réinitialiser la position du people
  setPosition(destination) {

    this.x = destination.x;
    this.y = destination.y;
    this.currentWorldPosition =  new WorldPosition(destination.worldId,destination.mapSheetId );
    this.setCenter();
    this.setMapIndexPosition();
  }

  // Méthode pour setter l'index du figuant sur la map
  setMapIndexPosition(){

    this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
  }


}
