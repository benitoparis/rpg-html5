import { ctx, rangeNumber} from '../main.js';

export class Scenario {

  constructor(){
    this.dialogStyle = 'dialog';
    this.dialogList = [
      {
        id: 1,
        dialog: ['Bonjour, vous êtes pressé?','Il y a beaucoup de monde dans le chateau','Vous allez ou au juste?','Savez-vous que le roi organise une fête?','On se croise peu être là-bas?']
      },
      {
        id: 2,
        dialog: ['Pssst Jai quelque chose à vous annoncer','Le voleur a encore frappé']
      },
      {
        id: 3,
        dialog: ['Que faites vous ici','le temps est magnifique']
      },
      {
        id: 4,
        dialog: ['Bonjour','Je suis tout exité','Suivez-moi','Non, par ici']
      }
    ];
    this.msgToDisplay = 'cdcdcdcd';

  }

  // Dessine le dialogue
  drawDialogs() {

  switch(this.dialogStyle){
    case 'storyTelling':
      // On dessine un fond noir sur l'écran d'accueil
      ctx.fillStyle="#5858BA";
      ctx.fillRect(50, 400, stage.width - 100, 200);
      // On dessine le border sur le rectangle
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 3;
      ctx.strokeRect(50, 400, stage.width - 100, 200);

      this.drawMessages("Fusce eu nunc non tortor dignissim elementum quis eget justo. Mauris scelerisque eu justo sed pulvinar. Sed at hendrerit leo. Vivamus ut tortor viverra, vestibulum lorem non, accumsan dui.", 70, 450, 3);
    break;

    case 'dialog':
      // On dessine un fond noir sur l'écran d'accueil
      ctx.fillStyle="#5858BA";
      ctx.fillRect(50, 400, stage.width - 100 , 200);
      // On dessine une bordure blanche
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 3;
      ctx.strokeRect(50, 400, stage.width - 100, 200);

      // On affiche le message au centre de la boite de dialogue
      this.drawMessages(70, 450, 3);
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

  // Méthode pour écrire des messages sur l'écran
  drawMessages(x,y, fontsize) {

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

    for(let i = 0; i <= this.msgToDisplay.length; i += 60){
      let start = i;
      let end = i  + 60;
      y += 25;

      let cuttedMsg = this.msgToDisplay.slice(start, end);
      console.log(start,end, y, cuttedMsg);
      ctx.fillText(cuttedMsg, x, y);

    }

  };


  // On renseigne le dialogue courant
  setCurrentDialog(){
    const id = rangeNumber(1, this.dialogList.length+1);
    return this.dialogList.find(item=> {
      return item.id === id;
    })
  }


}
