var player;
var cursors;
var block_central_devant;
var block_central_deriere;
var block_bas_s3;
var passage_s4;
var passage_s2;
var ennemi_cerveau1;
var ennemi_cerveau2;
var compteurEnnemi1 = 50;
var ennemiInvulne1 = false;
var compteurEnnemi2 = 50;
var ennemiInvulne2 = false;
var pdvEnnemi1 = 3;
var pdvEnnemi2 = 2;
var etat_ennemi1 = true;
var etat_ennemi2 = true;
var compteur = 150; // par défaut: 150 //
var invincible = false;


var cle1;

var gateau1;
var bonbon1;
var gateau2;
var bonbon2;

var dropBonbon1 = true;
var dropBonbon2 = true;

var dropGateau1 = true;

var visibleGateau1 = false;
var visibleBonbon1 = false;

var visibleGateau2 = false;
var visibleBonbon2 = false;


var gamepad;
var paddle;
var padConnected;
var pad;

var nbCarte;



class Scene_03 extends Phaser.Scene{
    constructor(){
        super("Scene_03");
    }
    init(data){
    }
    preload(){

        this.load.image('player','assets/02_spriteSheet_personnage/player.png');
        this.load.image('cle','assets/04_items/Item_collectibles-assets/cle.png')
        this.load.image('gateau','assets/04_items/Item_collectibles-assets/gateau.png')
        this.load.image('bonbon','assets/04_items/Item_collectibles-assets/bonbon.png')
        this.load.image('HUD','assets/04_items/Item_collectibles-assets/HUD.png')

        this.load.image('background_s3','assets/00_background_scenes/background_scene_03-assets/background.png')
        this.load.image('arbres','assets/00_background_scenes/background_scene_03-assets/arbres_contour.png')
        this.load.image('block_devant','assets/00_background_scenes/background_scene_03-assets/block_central_deriere.png')
        this.load.image('block_arriere','assets/00_background_scenes/background_scene_03-assets/block_central_devant.png')
        this.load.image('block_bas','assets/00_background_scenes/background_scene_03-assets/block_bas_droit.png')
        this.load.image('passageHaut_s3', 'assets/01_decors/block_decors-assets/passage_zone_01.png');

        this.load.spritesheet('ennemi_cerveau', 'assets/03_spriteSheet_monstre_cerveau/spriteSheet_monstre_cerveau-assets/spriteSheet_monstre_cerveau.png', { frameWidth: 155.75, frameHeight: 121 });
    }

    create(){

        this.add.image(0,0,'background_s3').setOrigin(0).setScrollFactor(0);
       
        block_central_deriere = this.physics.add.staticGroup();
        block_central_devant = this.physics.add.staticGroup();
        block_bas_s3 = this.physics.add.staticGroup();
        passage_s4 = this.physics.add.staticGroup();
        passage_s2 = this.physics.add.staticGroup();
        groupeBullets = this.physics.add.group();
        

        block_central_devant.create(815,275,'block_devant');


        ennemi_cerveau1 = this.physics.add.sprite(400,300, 'ennemi_cerveau');
        ennemi_cerveau1.body.setAllowGravity(false); // pas de gravité pour les ennemis //
        ennemi_cerveau1.setCollideWorldBounds(true);

        this.anims.create({
            key: 'move_ennemi_cerveau',
            frames: this.anims.generateFrameNumbers('ennemi_cerveau', {start:0, end : 3}),
            frameRate : 7,
            repeat: -1
        });

        this.tweens.add({
            targets: ennemi_cerveau1,
            props: {
                x: { value: 600, duration: 2000, flipX: true },
                y: { value: 200, duration: 3000},
            },
            yoyo: true,
            repeat: -1
        });

        

        ennemi_cerveau2 = this.physics.add.sprite(900,500, 'ennemi_cerveau');
        ennemi_cerveau2.body.setAllowGravity(false); // pas de gravité pour les ennemis //
        ennemi_cerveau2.setCollideWorldBounds(true);

        this.tweens.add({
            targets: ennemi_cerveau2,
            props: {
                x: { value: 600, duration: 2000, flipX: true },
                y: { value: 450, duration: 3000},
            },
            yoyo: true,
            repeat: -1
        });

        player = this.physics.add.sprite(1230, 350, 'player');
        player.setCollideWorldBounds(true);
        player.setVelocity(0);

        

        block_central_deriere.create(815,237,'block_arriere');
        passage_s4.create(650,0,'passageHaut_s3');
        passage_s2.create(1280,350,'passageGauche_s2');
        block_bas_s3.create(1155,450,'block_bas');

        

        this.add.image(0,0,'arbres').setOrigin(0).setScrollFactor(0);

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
        
        this.add.image(50,10,'HUD').setOrigin(0);

        gateau1 = this.physics.add.sprite(ennemi_cerveau1.x,ennemi_cerveau1.y,'gateau').setAlpha(0);
        bonbon1 = this.physics.add.sprite(ennemi_cerveau1.x,ennemi_cerveau1.y,'bonbon').setAlpha(0);

        bonbon2 = this.physics.add.sprite(ennemi_cerveau2.x,ennemi_cerveau2.y,'bonbon').setAlpha(0);

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
        texte_cle = this.add.text(168, 28, scoreCle, { font: '20px Georgia', fill: '#f0acdc' });
        texte_bonbon = this.add.text(250,28, scoreBonbon,{font: '20px Georgia', fill: '#f0acdc' });
        texte_gateau = this.add.text(345,28, scoreGateau,{font: '20px Georgia', fill: '#f0acdc' });
        texte_carte = this.add.text(430,28, nbCarte,{font: '20px Georgia', fill: '#f0acdc' });

        function changementZone3(){
            this.scene.start("Scene_02");
            console.log("changement");
        }

        function changementZone4(){
            this.scene.start("Scene_04");
            console.log("changement");
        }

        this.physics.add.overlap(player,ennemi_cerveau1,perdPdv,null,this);
        this.physics.add.overlap(player,ennemi_cerveau2,perdPdv,null,this);

        this.physics.add.overlap(groupeBullets,ennemi_cerveau1,killEnnemi1,null,this);
        this.physics.add.overlap(groupeBullets,ennemi_cerveau2,killEnnemi2,null,this);
        this.physics.add.overlap(player,passage_s2,changementZone3,null,this);
        this.physics.add.overlap(player,passage_s4,changementZone4,null,this);
        this.physics.add.overlap(player,bonbon1,dropBonbonS3_1,null,this);
        this.physics.add.overlap(player,gateau1,dropGateauS3,null,this);
        this.physics.add.overlap(player,bonbon2,dropBonbonS3_2,null,this);
        this.physics.add.overlap(player,gateau2,dropGateauS3,null,this);

        
    }

    update(){

        if(etat_ennemi1 == false && dropBonbon1 == false && dropGateau1 == false){
            ennemi_cerveau1.destroy(true,true);
            bonbon1.destroy(true,true);
            gateau1.destroy(true,true);
        }
        if(dropBonbon1 == false){
            bonbon1.destroy(true,true);
        }
        if(dropGateau1 == false){
            gateau1.destroy(true,true);
        }
        if(etat_ennemi2 == false && dropBonbon2 == false){
            ennemi_cerveau2.destroy(true,true);
            bonbon2.destroy(true,true);
        }
        if(dropBonbon2 == false){
            bonbon2.destroy(true,true);
        }

        if(invincible == true){ // relance du compteur d'invulné player //
            compteur-- ;
            if(compteur == 0){
                compteur = 150;
                invincible = false ;
            }
        }

        if(ennemiInvulne1 == true){ // relance du compteur d'invulné player //
            compteurEnnemi1-- ;
            if(compteurEnnemi1 == 0){
                compteurEnnemi1 = 50;
                ennemiInvulne1 = false;
            }
        }

        if(ennemiInvulne2 == true){ // relance du compteur d'invulné player //
            compteurEnnemi2-- ;
            if(compteurEnnemi2 == 0){
                compteurEnnemi2 = 50;
                ennemiInvulne2 = false;
            }
        }

        if ( Phaser.Input.Keyboard.JustDown(boutonTire)) {
            tirer(player);
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

        // ----- Compteurs ----- //

        if(invincible == true){ // relance du compteur d'invulné player //
            compteur-- ;
            if(compteur == 0){
                compteur = 150;
                invincible = false ;
            }
        }

        if (keyD.isDown){
            player.direction = 'right';
            player.setVelocityX(200);
                if (etat_ennemi1 == true){
                    ennemi_cerveau1.anims.play('move_ennemi_cerveau');
                }
                if(etat_ennemi2 == true){  
                    ennemi_cerveau2.anims.play('move_ennemi_cerveau');
                }
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

function hitCarte (bullet) {
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

function killEnnemi1 () {
    if(ennemiInvulne1 == false){
        pdvEnnemi1 -= 1;
        bullet.destroy();
    }
    ennemiInvulne1 = true;
    if(pdvEnnemi1 <= 0){
        etat_ennemi1 = false;
        if (etat_ennemi1 == false){
            ennemi_cerveau1.destroy();
            gateau1.setAlpha(1);
            bonbon1.setAlpha(1);
            gateau1.setX(ennemi_cerveau1.x);
            gateau1.setY(ennemi_cerveau1.y);
            visibleGateau1 = true;
            bonbon1.setX(ennemi_cerveau1.x + 30);
            bonbon1.setY(ennemi_cerveau1.y + 20);
            visibleBonbon1 = true; 
        }
    }
}

function killEnnemi2 () {
    if(ennemiInvulne2 == false){
        pdvEnnemi2 -= 1;
        bullet.destroy();
    }
    ennemiInvulne2 = true;
    if(pdvEnnemi2 <= 0){
        etat_ennemi2 = false;
        if (etat_ennemi2 == false){
            etat_ennemi2 = false;
        ennemi_cerveau2.destroy();
        bonbon2.setAlpha(1);
        bonbon2.setX(ennemi_cerveau2.x + 30);
        bonbon2.setY(ennemi_cerveau2.y + 20);
        visibleBonbon2 = true;
        }
    }
}

function dropCleS3(){
    scoreCle += 1;
    cle.destroy();
    texte_cle.setText(scoreCle);
}

function dropBonbonS3_1(){
    
    if(visibleBonbon1 == true && dropBonbon1 == true){
        scoreBonbon +=7;
        bonbon1.destroy(true,true);
        texte_bonbon.setText(scoreBonbon);
        dropBonbon1 = false;
    }
}
function dropBonbonS3_2(){

    if(visibleBonbon2 == true && dropBonbon2 == true){
        scoreBonbon +=7;
        bonbon2.destroy(true,true);
        texte_bonbon.setText(scoreBonbon);
        dropBonbon2 = false;
    }
}

function dropGateauS3(){
    
    if(visibleGateau1 == true){
        scoreGateau +=1;
        gateau1.destroy(true,true);
        texte_gateau.setText(scoreGateau);
        dropGateau1 = false;
    }
}