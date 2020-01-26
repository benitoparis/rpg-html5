import { ctx, config, launchGame} from '../main.js';

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
    this.storyTelling = [
      {
        id: 1,
        texts : [
          'Contrairement à une opinion répandue, le Lorem Ipsum n\'est pas simplement du texte aléatoire.',
          'et en étudiant tous les usages de ce mot dans la littérature classique',
          'L\'extrait standard de Lorem Ipsum utilisé depuis le XVIè siècle est reproduit ci-dessous pour les curieux.',
          'à reproduire le même extrait sans fin, ce qui fait de lipsum.com le seul vrai générateur de Lorem Ipsum',
          'Nam sole orto magnitudine angusti gurgitis sed profundi a transitu arcebantur et dum piscatorios quaerunt lenunculos ve',
          'Adolescebat autem obstinatum propositum erga haec et similia multa',
          'Advenit post multos Scudilo Scutariorum tribunus velamento subagrestis ingenii persuasionis opifex callidus. qui eum adulabili',
          'Sed quid est quod in hac causa maxime homines admirentur et '


        ]
      },
      {
        id : 2,
        texts : [
          'questa apertura del Corriere dello Sport ',
          'scambio di punte sullasse Inter-Napoli. Operazione in chiusura, anche il nerazzurro',
          'del Bologna e il pallavolista di Modena: il tecnico si schiera con Salvini',
          'Derby emiliano tra'
        ]
      },
    ];
    this.index = 0;
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
  drawMessages(msg, x, y , fontsize) {

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
    ctx.fillStyle = "#FFFFFF";

    for(let i = 0; i <= msg.length; i += 60){
      let start = i;
      let end = i  + 60;
      y += 50;

      let cuttedMsg = msg.slice(start, end);
      console.log(start,end, y, cuttedMsg);
      ctx.fillText(cuttedMsg, x, y);

    }

  };


  // On renseigne le dialogue courant
  setCurrentDialog(){
    const id = config.rangeNumber(1, this.dialogList.length+1);
    return this.dialogList.find(item=> {
      return item.id === id;
    })
  }

  // Dessine l'image du menu
  launchStorytelling = (id)=> {

    const story = this.storyTelling.find(item=>{
      return item.id === id;
    });

    if(this.index <= story.texts.length - 1){ // S'il reste un message dans la story on affiche la suite
      const msg = story.texts[this.index];

      // On dessine un fond noir sur l'écran d'accueil
      ctx.fillStyle="#000000";
      ctx.fillRect(0,0, stage.width, stage.height);

      // On affiche les messages
      this.drawMessages(msg, 10 , stage.height / 3, 2);

      // On affiche la commande "Press Enter"
      this.drawMessages('Press Enter to continue', stage.width - 500 , stage.height - 100, 2);

      this.index++;
    } else { // Si plus de messages dans la story on lance le début de l'aventure
      launchGame();
    }

  };

}
