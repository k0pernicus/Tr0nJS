var canvas = document.getElementById('canvas');
var height = 400;
var width = 400;
canvas.height = height;
canvas.width = width;
var contenu = canvas.getContext('2d');

/*
Contiendra les variables contenant les codes touches attribuées pour jouer
*/
var keys = {};

/*
Variables contenant les positions initiales des 2 lightCycles principaux ('joueur' et 'ia')
*/
var joueurX = 0;
var iaX = 0;
var joueurY = 100;
var iaY = 400;
var vitesse = 3;

/*
Fonction permettant le rendu du jeu-vidéo
*/
var rendu = function() {
    contenu.fillRect(0, 0, width, height);
    contenu.fillStyle = "#000000";
}

/*
Objet lightCycle -> représente une moto lumière (personnage)
Objet paramètré par:
--> une position (x, y)
--> un nom
--> une couleur [couleur doit être du type 'blue', 'red', etc... ou "rgb(...)"]
Le score du joueur créé est initialisé à 0.
On ajoute une direction afin de pouvoir savoir d'où vient la moto-lumière, pour les changements de direction.
*/
var lightCycle = function(x, y, nom, couleur) {
    this.x = x;
    this.y = y;
    this.d = "left";
    this.nom = nom;
    this.vitesse = vitesse;
    this.couleur = couleur;
    this.score = 0;
    /*Remise à zéro*/
    this.resetAll = function(x, y, vitesse) {
	this.x = x;
	this.y = y;
	this.vitesse = vitesse;
    };
    /*Changement de vitesse*/
    this.setVitesse = function(newVitesse) {
	this.vitesse = newVitesse;
    };
    /*Fonctions de changement de position*/
    this.moveTop = function() {
	this.y += vitesse;
    };
    this.moveBottom = function() {
	this.y -= vitesse;
    };
    this.moveLeft = function() {
	this.x += vitesse;
    };
    this.moveRight = function() {
	this.x -= vitesse;
    };
};

/*
On attribue la fonction de rendu à l'objet lightCycle; couleur doit être du type 'blue', 'red', etc... ou "rgb(...)"
*/
lightCycle.prototype.rendu = function(couleur) {
    contenu.fillRect(this.x, this.y, 6, 6);
    contenu.fillStyle = couleur;
}

/*
  Fonction permettant un update sur l'objet lightCycle -> Tourner à gauche/droite/haut/bas; on vérifiera que, si l'utilisateur tourne à gauche, il n'était pas déjà en direction gauche/droite!
*/
lightCycle.prototype.update = function() {
    for (var key in keys) {
	switch(Number(key)) {
	    case 37:
	    if (this.d != "right") {
		this.moveLeft();
		this.d = "left";
	    };
	    break;
	    case 38:
	    if (this.d != "bottom") {
		this.moveTop();
		this.d = "top";
	    };
	    break;
	    case 39:
	    if (this.d != "left") {
		this.moveRight();
		this.d = "right";
	    };
	    break;
	    case 40:
	    if (this.d != "top") {
		this.moveBottom();
		this.d = "bottom";
	    };
	    break;
	}
    }
    
    /*
      Si l'un des 2 lightCycles a dépassé le terrain alors il perd, on incrémente le score de l'autre et on revient aux positions initiales.
     */
    if (this.x >= width || this.y >= height) {
	if (this.nom === "ia") joueur.score+=1;
	else ia.score+=1;
	/*Retour aux valeurs/positions initiales*/
	joueur.resetAll(joueurX, joueurY, vitesse);
	ia.resetAll(iaX, iaY, vitesse);
    }

};

/*
Évènements liés aux touches up, down, left & right du clavier
---> CONCEPTION A REVOIR
*/
window.addEventListener("keydown", function(event) { keys[event.keyCode] = true; });
window.addEventListener("keyup", function(event) { delete keys[event.keyCode];});
window.addEventListener("keyleft", function(event) { keys[event.keyCode] = true;});
window.addEventListener("keyright", function(event) { delete keys[event.keyCode];});
