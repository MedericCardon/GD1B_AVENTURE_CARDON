var player;
var cursors;
var passage_bas;
var blockCentral;
var blockCentral_2;
var arbre;

var compteur = 150; // par défaut: 150 //
var invincible = false;
var pdv5;
var pdv4;
var pdv3;
var pdv2;
var pdv1;
var playerPdv = 5;
var cle;
var scoreCle = 0;
var scoreGateau = 0;
var scoreBonbon = 0;
var texte_cle;
var texte_bonbon;
var texte_gateau;
var texte_carte;
var gateau;
var bonbon;

var changeZone = false;

var visibleGateau = false;
var visibleBonbon = false;

var keyZ;
var keyQ;
var keyS;
var keyD;
var keyE;
var boutonTire;

var gamepad;
var paddle;
var padConnected;
var pad;

var carte;
var nbCarte = 0;
var lanceCarte = false;
var etat_carte = true;

var compteurBullet = 50;
var bulletOn = true;
var groupeBullets;
var bullet;



class Scene_01 extends Phaser.Scene{
    constructor(){
        super("Scene_01");
    }
    init(data){
    }
    preload(){

        // ----- Decors ----- //

        this.load.image('passage_bas','assets/01_decors/block_decors-assets/passage_zone_01.png')
        this.load.image('scene_01','assets/02_spriteSheet_personnage/scene_01.png')
        this.load.image('player','assets/02_spriteSheet_personnage/player.png');
        this.load.image('arbre', 'assets/01_decors/block_decors-assets/arbre.png')
        this.load.image('blockCentral', 'assets/01_decors/block_decors-assets/block_central.png')
        this.load.image('blockCentral_2', 'assets/01_decors/block_decors-assets/block_central_2.png')
        this.load.image('pdv5', 'assets/04_items/Item_collectibles-assets/pdv_5.png')
        this.load.image('pdv4', 'assets/04_items/Item_collectibles-assets/pdv_4.png')
        this.load.image('pdv3', 'assets/04_items/Item_collectibles-assets/pdv_3.png')
        this.load.image('pdv2', 'assets/04_items/Item_collectibles-assets/pdv_2.png')
        this.load.image('pdv1', 'assets/04_items/Item_collectibles-assets/pdv_1.png')
        this.load.image('carte', 'assets/04_items/Item_collectibles-assets/carte.png')

        

        // ----- Items & HUD ----- //

        this.load.image('cle','assets/04_items/Item_collectibles-assets/cle.png')
        this.load.image('gateau','assets/04_items/Item_collectibles-assets/gateau.png')
        this.load.image('bonbon','assets/04_items/Item_collectibles-assets/bonbon.png')
        this.load.image('HUD','assets/04_items/Item_collectibles-assets/HUD.png')
    }
    create(){

        
        
        this.add.image(0,0,'scene_01').setOrigin(0).setScrollFactor(0);
        passage_bas = this.physics.add.sprite(580, 700,'passage_bas');
        

        blockCentral = this.physics.add.staticGroup(); // Le personnage passe derrière //
        blockCentral_2 = this.physics.add.staticGroup(); // Le personnage passe devant //
        arbre = this.physics.add.staticGroup(); // arbre element de décor // 
        groupeBullets = this.physics.add.group();
        

       blockCentral.create(410,250,'blockCentral').setOrigin(0).setSize(250,20).setOffset(150,150);

        // ----- Player ----- //

        player = this.physics.add.sprite(300, 300, 'player');
        player.setCollideWorldBounds(true);

        this.add.image(50,10,'HUD').setOrigin(0);
        
        
        
        
        pdv1 = this.physics.add.sprite(40,40,'pdv1').setAlpha(0);
        pdv2 = this.physics.add.sprite(40,40,'pdv2').setAlpha(0);
        pdv3 = this.physics.add.sprite(40,40,'pdv3').setAlpha(0);
        pdv4 = this.physics.add.sprite(40,40,'pdv4').setAlpha(0);
        pdv5 = this.physics.add.sprite(40,40,'pdv5').setAlpha(0);

        if(playerPdv == 5){
            pdv5.setAlpha(1);
            pdv4.setAlpha(0);
            pdv3.setAlpha(0);
            pdv2.setAlpha(0);
            pdv1.setAlpha(0);
        }
        if(playerPdv == 4){
            pdv5.setAlpha(0);
            pdv4.setAlpha(1);
            pdv3.setAlpha(0);
            pdv2.setAlpha(0);
            pdv1.setAlpha(0);
        }
        if(playerPdv == 3){
            pdv5.setAlpha(0);
            pdv4.setAlpha(0);
            pdv3.setAlpha(1);
            pdv2.setAlpha(0);
            pdv1.setAlpha(0);
        }
        if(playerPdv == 2){
            pdv5.setAlpha(0);
            pdv4.setAlpha(0);
            pdv3.setAlpha(0);
            pdv2.setAlpha(1);
            pdv1.setAlpha(0);
        }
        if(playerPdv == 1){
            pdv5.setAlpha(0);
            pdv4.setAlpha(0);
            pdv3.setAlpha(0);
            pdv2.setAlpha(0);
            pdv1.setAlpha(1);
        }

       // ----- Arbres ----- //

       arbre.create(460,40,'arbre').setOrigin(0);
       arbre.create(800,50,'arbre').setOrigin(0);

       carte = this.physics.add.sprite(770,350,'carte');

       this.tweens.add({
        targets: carte,
        y:340,
        duration: 1500,
        yoyo: true,
        repeat: -1
    });

       
       blockCentral_2.create(420,250,'blockCentral_2').setOrigin(0).setSize(0,0).setOffset(150,150);

        this.physics.add.overlap(player,passage_bas, changementZone, null, this);
        this.physics.add.collider(player,blockCentral);
        this.physics.add.collider(player,carte,dropCarte,null,this);



        // ----- Pad + touches clavier ----- //

        cursors = this.input.keyboard.createCursorKeys();
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        boutonTire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        keyZ.reset();
        keyQ.reset();
        keyS.reset();
        keyD.reset();

        


        this.input.gamepad.once('connected', function (pad, button, index) {
            paddle = pad;
            padConnected = true;
        }); 

        // ----- score texte ----- //

        texte_cle = this.add.text(168, 28, scoreCle, { font: '20px Georgia', fill: '#f0acdc' });
        texte_bonbon = this.add.text(250,28, scoreBonbon,{font: '20px Georgia', fill: '#f0acdc' });
        texte_gateau = this.add.text(345,28, scoreGateau,{font: '20px Georgia', fill: '#f0acdc' });
        texte_carte = this.add.text(430,28, nbCarte,{font: '20px Georgia', fill: '#f0acdc' });

        
        function changementZone(){
            this.scene.start("Scene_02");
            player.setX(100);
            player.setY(100);
            console.log("changement");
            changeZone = true;
        }
        if (changeZone == true){
            player.setX(700);
            player.setY(600);
        }


    }
    
    update(){
        if ( Phaser.Input.Keyboard.JustDown(boutonTire)) {
            tirer(player);
        }

        if(etat_carte == false){
            carte.destroy(true,true);
        }

        if(invincible == true){ // relance du compteur d'invulné player //
            compteur-- ;
            if(compteur == 0){
                compteur = 150;
                invincible = false ;
            }
        }

        if(bulletOn == false){ // relance du compteur d'invulné player //
            compteurBullet-- ;
            if(compteurBullet == 0){
                compteurBullet = 50;
                bulletOn = true ;
            }
        }
        
        if(keyE.isDown && playerPdv < 5 && scoreGateau >= 1){
            console.log(scoreGateau);
            playerPdv += 1;
            scoreGateau -= 1;
            texte_gateau.setText(scoreGateau);

            if(playerPdv == 5){
                pdv5.setAlpha(1);
                pdv4.setAlpha(0);
                pdv3.setAlpha(0);
                pdv2.setAlpha(0);
                pdv1.setAlpha(0);
            }
            if(playerPdv == 4){
                pdv5.setAlpha(0);
                pdv4.setAlpha(1);
                pdv3.setAlpha(0);
                pdv2.setAlpha(0);
                pdv1.setAlpha(0);
            }
            if(playerPdv == 3){
                pdv5.setAlpha(0);
                pdv4.setAlpha(0);
                pdv3.setAlpha(1);
                pdv2.setAlpha(0);
                pdv1.setAlpha(0);
            }
            if(playerPdv == 2){
                pdv5.setAlpha(0);
                pdv4.setAlpha(0);
                pdv3.setAlpha(0);
                pdv2.setAlpha(1);
                pdv1.setAlpha(0);
            }
            if(playerPdv == 1){
                pdv5.setAlpha(0);
                pdv4.setAlpha(0);
                pdv3.setAlpha(0);
                pdv2.setAlpha(0);
                pdv1.setAlpha(1);
            }
       }

        // ----- controles clavier ----- //
        if (keyD.isDown){
            player.setVelocityX(200);
            player.setFlipX(false);
        }
        else if (keyQ.isDown){
            player.setVelocityX(-200);
            player.setFlipX(true);
        }
        else if (keyD.isUp && keyQ.isUp){
            player.setVelocityX(0);
        }
        if (keyZ.isDown){
            player.setVelocityY(-200);
        }
        else if (keyS.isDown){
            player.setVelocityY(200);
        }
        else if (keyZ.isUp && keyS.isUp){
            player.setVelocityY(0);
        }
        // ----- controles manette ----- //

        if (padConnected) {

            if(paddle.right){ 
                player.setVelocityX(200);
            }
            if(paddle.left){ 
                player.setVelocityX(-200);
            }
            if(paddle.up){ 
                player.setVelocityY(-200);
            }
            if(paddle.down){
                player.setVelocityY(200);
            }
        }
            
    }
}

function tirer(player) {
    if(nbCarte >= 1){
        if (bulletOn == true){
            var coefDir;
            if (player.direction == 'left') { 
                coefDir = -1; 
            } else { 
                coefDir = 1 }
            // on crée la balle a coté du joueur
            bullet = groupeBullets.create(player.x + (25 * coefDir), player.y - 4, 'carte');
            // parametres physiques de la balle.
            bullet.setCollideWorldBounds(false);
            bullet.body.allowGravity =false;
            bullet.setVelocity(500 * coefDir, 0); // vitesse en x et en y
            bulletOn = false;
            nbCarte -=1;
            texte_carte.setText(nbCarte);
            }
        }
}

/*function killEnnemi(){
    etat_ennemi = false;
    if (etat_ennemi == false){
        ennemi_cerveau.destroy();
        gateau.setAlpha(1);
        bonbon.setAlpha(1);
        gateau.setX(ennemi_cerveau.x);
        gateau.setY(ennemi_cerveau.y);
        visibleGateau = true;

        bonbon.setX(ennemi_cerveau.x + 30);
        bonbon.setY(ennemi_cerveau.y + 20);
        visibleBonbon = true;
    }
}*/

/*function hit (bullet) {
     bullet.destroy();
}*/

function perdPdv(){
    
    if(invincible == false){
        playerPdv -= 1;
        console.log(playerPdv);
        if(playerPdv == 5){
            pdv5.setAlpha(1);
            pdv4.setAlpha(0);
            pdv3.setAlpha(0);
            pdv2.setAlpha(0);
            pdv1.setAlpha(0);
        }
        if(playerPdv == 4){
            pdv5.setAlpha(0);
            pdv4.setAlpha(1);
            pdv3.setAlpha(0);
            pdv2.setAlpha(0);
            pdv1.setAlpha(0);
        }
        if(playerPdv == 3){
            pdv5.setAlpha(0);
            pdv4.setAlpha(0);
            pdv3.setAlpha(1);
            pdv2.setAlpha(0);
            pdv1.setAlpha(0);
        }
        if(playerPdv == 2){
            pdv5.setAlpha(0);
            pdv4.setAlpha(0);
            pdv3.setAlpha(0);
            pdv2.setAlpha(1);
            pdv1.setAlpha(0);
        }
        if(playerPdv == 1){
            pdv5.setAlpha(0);
            pdv4.setAlpha(0);
            pdv3.setAlpha(0);
            pdv2.setAlpha(0);
            pdv1.setAlpha(1);
        }
    }
    invincible = true;
}

function heal(playerPdv,scoreGateau){
    if(playerPdv < 5 && scoreGateau >= 1){
        console.log(playerPdv);
        playerPdv += 1;
        scoreGateau -= 1;
        texte_gateau.setText(scoreGateau);
    }
    if(playerPdv == 5){
        pdv5.setAlpha(1);
        pdv4.setAlpha(0);
        pdv3.setAlpha(0);
        pdv2.setAlpha(0);
        pdv1.setAlpha(0);
    }
    if(playerPdv == 4){
        pdv5.setAlpha(0);
        pdv4.setAlpha(1);
        pdv3.setAlpha(0);
        pdv2.setAlpha(0);
        pdv1.setAlpha(0);
    }
    if(playerPdv == 3){
        pdv5.setAlpha(0);
        pdv4.setAlpha(0);
        pdv3.setAlpha(1);
        pdv2.setAlpha(0);
        pdv1.setAlpha(0);
    }
    if(playerPdv == 2){
        pdv5.setAlpha(0);
        pdv4.setAlpha(0);
        pdv3.setAlpha(0);
        pdv2.setAlpha(1);
        pdv1.setAlpha(0);
    }
    if(playerPdv == 1){
        pdv5.setAlpha(0);
        pdv4.setAlpha(0);
        pdv3.setAlpha(0);
        pdv2.setAlpha(0);
        pdv1.setAlpha(1);
    }
}
function dropCarte(){
    nbCarte += 6;
    texte_carte.setText(nbCarte);
    carte.destroy();
    lanceCarte = true;
    etat_carte = false;
}
