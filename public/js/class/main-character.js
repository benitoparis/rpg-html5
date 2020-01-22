import { ctx, rangeNumber, config} from '../main.js';

// classe d'un MainCharacter
export class MainCharacter {

 // Constructeur de la classe Item
 constructor(type, x, y) {
    this.name = name; // Exemple 'darius'
    this.reference = this.setReference();
    this.characterImg = config.getImage(this.reference);
    this.x = x // Position X sur la map
    this.y = y; // Position Y sur la map
    this.faceX = 0;
    this.faceY = 30;
    this.width = 48;
    this.height = 48;
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
    this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
  }

  // Méthode pour afficher le personnage sur le canvas
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

  // Méthode pour setter l'index du personnage sur la map
  setMapIndexPosition(){
    this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
  }

  // Méthode qui renvoie une reference de l'item
  setReference(){
    return `${this.name}`;
  }

}
