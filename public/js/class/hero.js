import { ctx, config } from '../main.js';
import { AnimatedSprite } from './animated-sprite.js';

// classe du héros
export class Hero extends AnimatedSprite {

 // Constructeur de la classe du héros...
 constructor(params) {

    // On appelle le constructeur de la classe parent
    super(params)

    this.reference = 'perso1';
    this.characterImg = config.getImage(this.reference);
    this.isTalking = false;
    this.items = 0 // Nb de trésor collecté
    this.xp = 500200; // Chiffre en dur
  }

  // Méthode pour afficher le sprite du héros
  drawHero() {

    ctx.drawImage(
      this.characterImg,
      this.faceX , // Position X de la partie à croper
      this.faceY , // Position Y de la partie à croper
      32 , // Largeur de la partie à croper
      32 , // Hauteur de la partie à corper
      // this.x, // Position x de l'image à croper sur le canvas
      // this.y,  // Position y de l'image à croper sur le canvas
      351, // on l'affiche toujours au milieu du canvas // Position x de l'image à croper sur le canvas
      288.5, // on l'affiche toujours au milieu du canvas // Position y de l'image à croper sur le canvas
      this.width, // Largeur de la partie cropée
      this.height // Hauteur de la partie cropée
    );
  }

  // Méthode qui va modifier les coordonnées du héros.
  update(event) {

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

    switch (event.key) {
      case "ArrowRight":

        if (this.faceY === 310) {
          this.speedX = 20;
          this.speedY = 20;
        }
        this.x = (this.x + this.speedX);

        // On détermine la positon x/y du crop du personnage
        this.faceX = this.rightCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.rightCycleLoop[this.currentLoopIndex].faceY;

        break;

      case "ArrowLeft":

        if (this.faceY === 120) {
          this.speedX = 20;
          this.speedY = 20;
        }
        this.x = this.x - this.speedX;

        // On détermine la positon x/y du crop du personnage
        this.faceX = this.leftCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.leftCycleLoop[this.currentLoopIndex].faceY;
        break;

      case "ArrowUp":

        if(this.faceY === 210) {
          this.speedX = 20;
          this.speedY = 20;
        }
        this.y = this.y - this.speedY;

        this.faceX = 8;
        this.faceY = 22;

        // On détermine la positon x/y du crop du personnage
        this.faceX = this.upCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.upCycleLoop[this.currentLoopIndex].faceY;
        break;

      case "ArrowDown":

        if (this.faceY === 22) {
          this.speedX = 20;
          this.speedY = 20;
        }
        this.y = this.y + this.speedY;

        this.faceX = 8;
        this.faceY = 210;
        // On détermine la positon x/y du crop du personnage
        this.faceX = this.downCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.downCycleLoop[this.currentLoopIndex].faceY;
        break;

      default:
        break;
    }

    // On recalcule le centre du héros
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));

    // On recalcule la position de l'index du héros sur la map
    this.setMapIndexPosition();

  }

  // Méthode pour réinitialiser la position du héro
  setPosition(destination) {
    this.x = destination.x;
    this.y = destination.y;
    this.currentWorldPosition.worldId = destination.worldId;
    this.currentWorldPosition.mapSheetId = destination.mapSheetId;
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
    this.setMapIndexPosition();
  };


  // Méthode pour setter l'index du héros sur la map
  setMapIndexPosition(){
    this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));

  }

  // On indique que le hero est en train de parler
  setTalkMode(){
    this.isTalking = true;
  }

  // On retire le mode talk
  removeTalkMode(){
    this.isTalking = false;
  }

  // On ajoute un item
  addItem(){
    this.items++ ;
  }

   // Affiche des informations sur le héro
  drawHeroDatas(x, y , fontsize) {

    switch(fontsize) {
      case 1:
        ctx.font = "100px small-caption";
        break;
      case 2:
        ctx.font = "40px small-caption";
        break;
      case 3:
        ctx.font = "20px small-caption";
        break;
    }

    const message = `Item : ${this.items}   XP : ${this.xp}`;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(message, x, y);

  };

}
