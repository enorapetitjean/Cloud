const request = require('request');
const idJoueur = newId();
const tps = setInterval(toServer, 10000); //nouvelle manche toutes les 10 secondes

//génère un id pour le joueur
function newId() {
    return Math.floor(Math.random() * 300000);
}

//génère un entier aléatoire entre 2 et 200
function generateNumber() {
    entierAleatoire(2, 200);
}

//génère un entier aléatoire entre min et max
function entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//fonction qui gère les interractions avec le serveur
function toServer() {
    const send = {
        player: {
            newId,
            value: generateNumber()
        },
        sendTo: 'http://serveur:3000'
    }
    request.post(send, (err, player) => {
        if (player.includes("C'est gagné")) { //on remet la partie à zéro
            clearInterval(tps);
        }
        if (err) {
            console.log(err);
        }
        console.log(player);
    })
}
