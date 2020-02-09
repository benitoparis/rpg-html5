import { ctx, config, hero} from '../main.js';

// classe d'un SwitchButton
export class SwitchButton {

 // Constructeur de la classe SwitchButton
 constructor(reference, params) {
    this.reference = reference
    this.img = config.getImage(this.reference);
    this.x = params.x // Position X sur la map
    this.y = params.y; // Position Y sur la map
    this.target = 'secretPassage';
    this.width = 48;
    this.height = 48;
    this.faceX = 0;
    this.faceY = 32;
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
    this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
    this.isOpen = false;
  }


  // Méthode pour afficher le SwitchButton sur le canvas
  draw() {
    ctx.drawImage(
      this.img, // Objet image à afficher
      this.faceX , // Position X de la partie à croper
      this.faceY , // Position Y de la partie à croper
      30 , // Largeur de la partie à croper
      30 , // Hauteur de la partie à corper
      351 - (hero.x - this.x), // Position X sur le canvas
      288.5 - (hero.y - this.y), // Position Y sur le canvas
      this.width, // Largeur de l'image sur le canvas
      this.height // Hauteur de l'image sur le canvas
    );
  }

  // Méthode pour setter l'index du SwitchButton sur la map
  setMapIndexPosition(){
    this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
  }

  // Méthode qui ouvre/ ferme le SwitchButton
  toogleOpen(){
      this.isOpen = this.isOpen ? false : true;

      if(this.isOpen){ // Si bouton activé
        // On détermine les coordonnées de l'image à cropper
        this.faceX = 66;
        this.faceY = 32;
      } else {
        this.faceX = 0;
        this.faceY = 32;
      }
  }

}
