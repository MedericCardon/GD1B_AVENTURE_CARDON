var player;
var cursors;
var blockCentral_s2;
var blockCentral_s2_2;
var blockHaut;
var blockBas;
var blockDroit;
var passageHaut;
var passageGauche;
var ennemi_cerveau;
var compteur = 150; // par défaut: 150 //
var compteurBullet = 50;
var bulletOn = true;
var invincible = false;
//var playerPdv;
var cle;
var pdv5;
var pdv4;
var pdv3;
var pdv2;
var pdv1;
/*var scoreCle = 0;
var etat_ennemi = true;
var scoreGateau = 0;
var scoreBonbon = 0;
var texte_cle;
var texte_bonbon;
var texte_gateau;*/
var gateau;
var bonbon;

var maison1;

var changeZone = false;

var visibleGateau = false;
var visibleBonbon = false;

var dropBonbon = true;
var dropGateau = true;
var dropCle = true;

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



var groupeBullets;
var bullet;




class Scene_02 extends Phaser.Scene{
    constructor(){
        super("Scene_02");
    }
    init(data){
    }
    preload(){

        this.load.image('background', 'assets/00_background_scenes/background_scene_02-assets/background.png');
        this.load.image('blockCentral_scene2', 'assets/00_background_scenes/background_scene_02-assets/block_scene_2.png');
        this.load.image('blockCentral2_scene2', 'assets/00_background_scenes/background_scene_02-assets/block_central_2.png');
        this.load.image('blockHaut', 'assets/00_background_scenes/background_scene_02-assets/passage_devant_scene_2.png');
        this.load.image('blockBas', 'assets/00_background_scenes/background_scene_02-assets/passage_derriere_scene_2.png');
        this.load.image('blockDroit', 'assets/00_background_scenes/background_scene_02-assets/block_droit_scene_2.png');
        this.load.image('passageHaut_s2', 'assets/01_decors/block_decors-assets/passage_zone_01.png');
        this.load.image('player','assets/02_spriteSheet_personnage/player.png');
        this.load.image('cle','assets/04_items/Item_collectibles-assets/cle.png')
        this.load.image('gateau','assets/04_items/Item_collectibles-assets/gateau.png')
        this.load.image('bonbon','assets/04_items/Item_collectibles-assets/bonbon.png')
        this.load.image('HUD','assets/04_items/Item_collectibles-assets/HUD.png')
        this.load.image('passageGauche_s2', 'assets/01_decors/block_decors-assets/passage_zone_02.png');
        this.load.image('maison1', 'assets/01_decors/batiments-assets/maison_01.png');
        this.load.image('pdv5', 'assets/04_items/Item_collectibles-assets/pdv_5.png')
        this.load.image('pdv4', 'assets/04_items/Item_collectibles-assets/pdv_4.png')
        this.load.image('pdv3', 'assets/04_items/Item_collectibles-assets/pdv_3.png')
        this.load.image('pdv2', 'assets/04_items/Item_collectibles-assets/pdv_2.png')
        this.load.image('pdv1', 'assets/04_items/Item_collectibles-assets/pdv_1.png')

        this.load.spritesheet('ennemi_cerveau', 'assets/03_spriteSheet_monstre_cerveau/spriteSheet_monstre_cerveau-assets/spriteSheet_monstre_cerveau.png', { frameWidth: 155.75, frameHeight: 121 });
        
    }
    create(){

        


        console.log(etat_ennemi);
        this.add.image(0,0,'background').setOrigin(0).setScrollFactor(0);
        


        blockCentral_s2 = this.physics.add.staticGroup();
        blockCentral_s2_2 = this.physics.add.staticGroup();
        blockHaut = this.physics.add.staticGroup();
        blockBas = this.physics.add.staticGroup();
        blockDroit = this.physics.add.staticGroup();
        passageHaut = this.physics.add.staticGroup();
        passageGauche = this.physics.add.staticGroup();
        maison1 = this.physics.add.staticGroup();
        groupeBullets = this.physics.add.group();



        

        ennemi_cerveau = this.physics.add.sprite(600,400, 'ennemi_cerveau');
        ennemi_cerveau.body.setAllowGravity(false); // pas de gravité pour les ennemis //
        ennemi_cerveau.setCollideWorldBounds(true);
        
        passageHaut.create(500,0,'passageHaut_s2');
        passageGauche.create(0,350,'passageGauche_s2');
        blockHaut.create(0,0,'blockHaut').setOrigin(0);
        blockDroit.create(675,310,'blockDroit').setOrigin(0);
        blockCentral_s2_2.create(20,150,'blockCentral2_scene2').setOrigin(0);
        maison1.create(800,505,'maison1').setFlipX(true).setSize(200,150).setOffset(20,-5);
        // ----- Player ----- //
        player = this.physics.add.sprite(200, 200, 'player');
        player.setCollideWorldBounds(true);
        player.setVelocity(0);

        pdv1 = this.physics.add.sprite(320,30,'pdv1').setAlpha(0);
        pdv2 = this.physics.add.sprite(320,30,'pdv2').setAlpha(0);
        pdv3 = this.physics.add.sprite(320,30,'pdv3').setAlpha(0);
        pdv4 = this.physics.add.sprite(320,30,'pdv4').setAlpha(0);
        pdv5 = this.physics.add.sprite(320,30,'pdv5').setAlpha(1);

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

        console.log(scoreGateau);
        
        this.add.image(0,0,'HUD').setOrigin(0);
        

        blockCentral_s2.create(20,150,'blockCentral_scene2').setOrigin(0).setSize(300,50).setOffset(590,230);
        
        blockBas.create(0,100,'blockBas').setOrigin(0);
        
        cle = this.physics.add.sprite(1200,400,'cle');
        cle.body.setAllowGravity(false); 
        cle.setCollideWorldBounds(true);

        gateau = this.physics.add.sprite(ennemi_cerveau.x,ennemi_cerveau.y,'gateau').setAlpha(0);
        bonbon = this.physics.add.sprite(ennemi_cerveau.x,ennemi_cerveau.y,'bonbon').setAlpha(0);

        
        

        this.physics.add.overlap(player,passageHaut,changementZone2, null, this);
        this.physics.add.overlap(player,passageGauche,changementZone1, null, this);
        this.physics.add.collider(player,blockCentral_s2);
        this.physics.add.overlap(player,ennemi_cerveau,perdPdv,null,this);
        this.physics.add.overlap(groupeBullets,ennemi_cerveau,killEnnemi,null,this);
        this.physics.add.overlap(groupeBullets, ennemi_cerveau, hit, null,this);
        this.physics.add.overlap(groupeBullets, blockCentral_s2, hit, null,this);
        this.physics.add.overlap(groupeBullets, maison1, hit, null,this);
        this.physics.add.overlap(player,cle,dropCleS2,null,this);
        this.physics.add.overlap(player,bonbon,dropBonbonS2,null,this);
        this.physics.add.overlap(player,gateau,dropGateauS2,null,this);
        this.physics.add.collider(player,maison1);

        

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

        this.input.gamepad.once('connected', function (pad) {
            paddle = pad;
            padConnected = true;
        });

        // ----- Score texte ----- //
        texte_cle = this.add.text(80, 20, scoreCle, { font: '20px Georgia', fill: '#f0acdc' });
        texte_gateau = this.add.text(160,20, scoreGateau,{font: '20px Georgia', fill: '#f0acdc' });
        texte_bonbon = this.add.text(230,19, scoreBonbon,{font: '20px Georgia', fill: '#f0acdc' });


        
        function changementZone2(){
            this.scene.start("Scene_01");
            console.log("changement");
        }

        function changementZone1(){
            this.scene.start("Scene_03");
            console.log("changement");
        }


        this.anims.create({
            key: 'move_ennemi_cerveau',
            frames: this.anims.generateFrameNumbers('ennemi_cerveau', {start:0, end : 3}),
            frameRate : 7,
            repeat: -1
        });

        this.tweens.add({
            targets: ennemi_cerveau,
            props: {
                x: { value: 800, duration: 2000, flipX: true },
                y: { value: 200, duration: 3000},
            },
            yoyo: true,
            repeat: -1
        });


        this.tweens.add({
            targets: cle,
            y:420,
            duration: 1500,
            yoyo: true,
            repeat: -1
        });

        

    }
    
    
    update(){
        
    
        
    if ( Phaser.Input.Keyboard.JustDown(boutonTire)) {
        tirer(player);
    }

        
        if(etat_ennemi == false && dropBonbon == false && dropGateau == false){
            ennemi_cerveau.destroy(true,true);
            bonbon.destroy(true,true);
            gateau.destroy(true,true);
        }
        if(dropBonbon == false){
            bonbon.destroy(true,true);
        }
        if(dropGateau == false){
            gateau.destroy(true,true);
        }
        if(dropCle == false){
            cle.destroy(true,true);
        }

        // ----- Compteurs ----- //
        
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

        if (keyD.isDown){
            player.direction = 'right';
            player.setVelocityX(200);
            ennemi_cerveau.anims.play('move_ennemi_cerveau');
            player.setFlipX(false);
        }
        else if (keyQ.isDown){
            player.setVelocityX(-200);
            player.setFlipX(true);
            player.direction = 'left';
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
    if (bulletOn == true){
        var coefDir;
        if (player.direction == 'left') { 
            coefDir = -1; 
        } else { 
            coefDir = 1 }
        // on crée la balle a coté du joueur
        bullet = groupeBullets.create(player.x + (25 * coefDir), player.y - 4, 'gateau');
        // parametres physiques de la balle.
        bullet.setCollideWorldBounds(false);
        bullet.body.allowGravity =false;
        bullet.setVelocity(500 * coefDir, 0); // vitesse en x et en y
        bulletOn = false;
        }
}

function killEnnemi(){
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
}

function dropCleS2(){
    if(dropCle == true){
        scoreCle += 1;
        cle.destroy();
        texte_cle.setText(scoreCle);
        dropCle = false;
    }
}

function dropBonbonS2(){
    
    if(visibleBonbon == true && dropBonbon == true){  
        scoreBonbon +=7;
        bonbon.destroy(true,true);
        texte_bonbon.setText(scoreBonbon);
        dropBonbon = false;
    }
}

function dropGateauS2(){
    
    if(visibleGateau == true && dropGateau == true){
        scoreGateau +=1;
        gateau.destroy(true,true);
        texte_gateau.setText(scoreGateau);
        dropGateau = false;
    }
}
function hit (bullet) {
     bullet.destroy();
}
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







