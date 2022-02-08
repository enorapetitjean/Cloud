const express = require('express');
const appli = express();
appli.use(express.json());

//génère un entier aléatoire entre 2 et 200
function generateNumber() {
    entierAleatoire(2, 200);
}

//génère un entier aléatoire entre min et max
function entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//fait le pgcd des nombres du joueur et du serveur pour déterminer si ils sont premiers entre eux
function premiers(player, serveur) {
    if (serveur > player) {
        var a = player;
        player = serveur;
        serveur = a;
    } //pgcd
    while (true) { 
        if (serveur == 0) {
            return true;
        }
        if (player == 0){
            return true;
        } 
        return false 
    }
}

class Joueur {
    idPlayer;
    gagner = false;
    historique = []; // { player: 0, server :0 }
    creditDispo = 300;
    points = 0;
    debiteur = false;

    constructor(idPlayer) {
        this.idPlayer = idPlayer;
    }

}
// création à l'éxecution de la Map qui contient toutes les parties pendant l'éxécution entre le serveur et les différents joueurs (clients)
let allGames = new Map ();

//dans le post toutes les interractions possibles entre les clients et le serveur en fonction des situations
appli.post ('/', (req,res) => {
    let g = false; //variable locale pour voir si le joueur gagne la manche

    //Situation 1: le joueur est nouveau il faut le créer avant de jouer
    if (allGames.get(req.player.idPlayer) == undefined){
        allGames.set(req.player.idPlayer, new Joueur(req.player.idPlayer));
    }

    //Situation 2: nouvelle manche --> generation des nombre players et serveur + vérification + inscription à l'historique
    let numberServeur = generateNumber();
    let numberClient = allGames.get(res.player.value);
    Joueur.creditDispo= Joueur.creditDispo -10;
    
    //Situation 3: vérifier si le joueur a gagner la manche ou non 
    if (premiers(numberClient, numberServeur) == true){
        g = true;
        allGames.points = points + 100;
    }

    //Situation 4: vérifier si le joueur a gagner la partie
    if (allGames.get(req.player.idPlayer).points >= 1000){
        allGames.get(req.player.idPlayer).gagner = true;
    }

    //Situation 5: vérifier si le client n'est pas débiteur actuellement
    if (allGames.get(req.player.idPlayer).points <0){
        allGames.get(req.player.idPlayer).debiteur = true;
    }

    //Situation 6: mise à jour des informations de jeu dans l'historique
    //allGames.get(req.player.idPlayer).historique
    //pas eu le temps de l'implémenter

})

app.listen(3000, () => {
    console.log('Serveur sur le port 3000');
});