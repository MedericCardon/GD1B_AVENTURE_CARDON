// ---------------------------------------------------//
// ----------------- VARIABLES ---------------------- //
// ---------------------------------------------------//

var player;
var cursors;

// ----- Ennemis ----- //

var ennemi_cerveau3;
var ennemi_cerveau4;
var ennemi_cerveau5;
var boss_cerveau2;

var compteurEnnemi3 = 50;
var ennemiInvulne3 = false;
var compteurEnnemi4 = 50;
var ennemiInvulne4 = false;
var compteurEnnemi5 = 50;
var ennemiInvulne5 = false;
var compteurBoss2 = 50;
var bossInvulne2 = false;
var pdvEnnemi3 = 2;
var pdvEnnemi4 = 2;
var pdvEnnemi5 = 2;
var pdvBoss2 = 5;
var etat_ennemi3 = true;
var etat_ennemi4 = true;
var etat_ennemi5 = true;
var etat_boss2 = true;
var tentacules_01;

// ----- Items ----- //

var bonbon3;
var bonbon4;
var bonbon5;
var bonbon6;

var gateau3;

var dropBonbon3 = true;
var dropBonbon4 = true;
var dropBonbon5 = true;
var dropBonbon6 = true;

var dropGateau3 = true;

var visibleGateau3 = false;

var visibleBonbon3 = false;
var visibleBonbon4 = false;
var visibleBonbon5 = false;
var visibleBonbon6 = false;

var carte4;
var etat_carte4 = true;

var potion;
var potion_image;
var etat_potion = false;
var potion_active = false;
var compteur_potion = 600;

// ----- HUD ----- //

var barre_potion_01;
var barre_potion_02;
var barre_potion_03;
var barre_potion_04;
var barre_potion_05;
var barre_potion_06;

// ----- Touche clavier ----- //

var keyF;

// ---------------------------------------------------//

class Scene_05 extends Phaser.Scene{
    constructor(){
        super("Scene_05");
    }
    init(data){
    }
    preload(){
        // ----- Decors + player ----- //

        this.load.image('background_s5','assets/00_background_scenes/background_scene_05-assets/background.png')
        this.load.image('arbre_s5','assets/00_background_scenes/background_scene_05-assets/arbre_s5.png')
        this.load.image('player','assets/02_spriteSheet_personnage/player.png');

        // ----- Ennemis ----- //

        this.load.image('tentacules_01','assets/00_background_scenes/background_scene_05-assets/tentacules_couloir_1.png')
        this.load.image('boss_cerveau','assets/03_spriteSheet_monstre_cerveau/spriteSheet_bossCerveau-assets/boss_cerveau.png');
        this.load.spritesheet('ennemi_cerveau', 'assets/03_spriteSheet_monstre_cerveau/spriteSheet_monstre_cerveau-assets/spriteSheet_monstre_cerveau.png', { frameWidth: 155.75, frameHeight: 121 });
        
        // ----- HUD ----- //
        
        this.load.image('HUD','assets/04_items/Item_collectibles-assets/HUD.png');
        this.load.image('pdv5', 'assets/04_items/Item_collectibles-assets/pdv_5.png');
        this.load.image('pdv4', 'assets/04_items/Item_collectibles-assets/pdv_4.png');
        this.load.image('pdv3', 'assets/04_items/Item_collectibles-assets/pdv_3.png');
        this.load.image('pdv2', 'assets/04_items/Item_collectibles-assets/pdv_2.png');
        this.load.image('pdv1', 'assets/04_items/Item_collectibles-assets/pdv_1.png');
        
        this.load.image('barre_potion_01', 'assets/04_items/Item_collectibles-assets/barre_potion_01.png');
        this.load.image('barre_potion_02', 'assets/04_items/Item_collectibles-assets/barre_potion_02.png');
        this.load.image('barre_potion_03', 'assets/04_items/Item_collectibles-assets/barre_potion_03.png');
        this.load.image('barre_potion_04', 'assets/04_items/Item_collectibles-assets/barre_potion_04.png');
        this.load.image('barre_potion_05', 'assets/04_items/Item_collectibles-assets/barre_potion_05.png');
        this.load.image('barre_potion_06', 'assets/04_items/Item_collectibles-assets/barre_potion_06.png');

        // ----- Items ----- //

        this.load.image('potion', 'assets/04_items/Item_collectibles-assets/potion.png');
        this.load.image('gateau','assets/04_items/Item_collectibles-assets/gateau.png')
        this.load.image('bonbon','assets/04_items/Item_collectibles-assets/bonbon.png')
    }

    create(){

        // ----- Decor background ----- //

        this.add.image(0,0,'background_s5').setOrigin(0);

        // ----- Bullet ----- //

        groupeBullets = this.physics.add.group(); // génère un projectile //

        // ----- Player ---- //

        player = this.physics.add.sprite(300, 1940, 'player'); // 300,1940
        player.setCollideWorldBounds(true);

        // ----- Ennemis ----- //

        tentacules_01 = this.physics.add.staticGroup();
        tentacules_01.create(510, 470,'tentacules_01').setOrigin(0).setScale(1.1).setSize(20,20).setOffset(360,440);
        tentacules_01.create(510, 470,'tentacules_01').setOrigin(0).setScale(1.1).setSize(20,20).setOffset(385,835);
        tentacules_01.create(510, 470,'tentacules_01').setOrigin(0).setScale(1.1).setSize(20,20).setOffset(355,1135);
        tentacules_01.create(510, 470,'tentacules_01').setOrigin(0).setScale(1.1).setSize(20,20).setOffset(390,985);
        tentacules_01.create(510, 470,'tentacules_01').setOrigin(0).setScale(1.1).setSize(20,20).setOffset(390,645);

        ennemi_cerveau3 = this.physics.add.sprite(200,1700, 'ennemi_cerveau');
        ennemi_cerveau3.body.setAllowGravity(false); // pas de gravité pour les ennemis //
        ennemi_cerveau3.setCollideWorldBounds(true);

        this.anims.create({
            key: 'move_ennemi_cerveau',
            frames: this.anims.generateFrameNumbers('ennemi_cerveau', {start:0, end : 3}),
            frameRate : 7,
            repeat: -1
        });

        this.tweens.add({
            targets: ennemi_cerveau3,
            props: {
                x: { value: 800, duration: 3000, flipX: true },
                y: { value: 1650, duration: 1000},
            },
            yoyo: true,
            repeat: -1
        });

        ennemi_cerveau4 = this.physics.add.sprite(1200,140, 'ennemi_cerveau');
        ennemi_cerveau4.body.setAllowGravity(false); // pas de gravité pour les ennemis //
        ennemi_cerveau4.setCollideWorldBounds(true);

        this.tweens.add({
            targets: ennemi_cerveau4,
            props: {
                x: { value: 600, duration: 3000, flipX: true },
                y: { value: 200, duration: 1000},
            },
            yoyo: true,
            repeat: -1
        });

        ennemi_cerveau5 = this.physics.add.sprite(600,400, 'ennemi_cerveau');
        ennemi_cerveau5.body.setAllowGravity(false); // pas de gravité pour les ennemis //
        ennemi_cerveau5.setCollideWorldBounds(true);

        this.tweens.add({
            targets: ennemi_cerveau5,
            props: {
                x: { value: 1200, duration: 3000, flipX: true },
                y: { value: 340, duration: 1000},
            },
            yoyo: true,
            repeat: -1
        });

        boss_cerveau2 = this.physics.add.sprite(2600,500,'boss_cerveau').setOrigin(0).setSize(200,150).setOffset(50,10);

        this.tweens.add({
            targets: boss_cerveau2,
            props: {
                x: { value: 2100, duration: 3000, flipX: true },
                y: { value: 750, duration: 2000},
            },
            yoyo: true,
            repeat: -1
        });

        // ----- Decors 1er plan ----- //

        this.add.image(0,0,'arbre_s5').setOrigin(0);
        

        // ----- Camera scroll ----- //

        this.cameras.main.setBounds(0, 0,  2940  , 1960 );
        this.physics.world.setBounds(0, 0, 2940 , 1960);
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        this.cameras.main.fadeIn(2000);

        // ----- Controls clavier + manette ----- //

        cursors = this.input.keyboard.createCursorKeys();
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        boutonTire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        keyZ.reset();
        keyQ.reset();
        keyS.reset();
        keyD.reset();

        paddle = this.input.gamepad.pad1;

        // ----- HUD ----- //

        pdv1 = this.physics.add.sprite(40,40,'pdv1').setAlpha(0).setScrollFactor(0);
        pdv2 = this.physics.add.sprite(40,40,'pdv2').setAlpha(0).setScrollFactor(0);
        pdv3 = this.physics.add.sprite(40,40,'pdv3').setAlpha(0).setScrollFactor(0);
        pdv4 = this.physics.add.sprite(40,40,'pdv4').setAlpha(0).setScrollFactor(0);
        pdv5 = this.physics.add.sprite(40,40,'pdv5').setAlpha(0).setScrollFactor(0);

        if(playerPdv == 5){ // controle l'état de santé du joueur //
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

        this.add.image(50,10,'HUD').setOrigin(0).setScrollFactor(0);

        potion_image = this.physics.add.image(50,80,'potion').setOrigin(0).setScrollFactor(0).setAlpha(0);
        barre_potion_06 = this.physics.add.sprite(90,95,'barre_potion_06').setOrigin(0).setScrollFactor(0).setAlpha(0);
        barre_potion_05 = this.physics.add.sprite(124,95,'barre_potion_05').setOrigin(0).setScrollFactor(0).setAlpha(0);
        barre_potion_04 = this.physics.add.sprite(158,95,'barre_potion_04').setOrigin(0).setScrollFactor(0).setAlpha(0);
        barre_potion_03 = this.physics.add.sprite(192,95,'barre_potion_03').setOrigin(0).setScrollFactor(0).setAlpha(0);
        barre_potion_02 = this.physics.add.sprite(226,95,'barre_potion_02').setOrigin(0).setScrollFactor(0).setAlpha(0);
        barre_potion_01 = this.physics.add.sprite(260,95,'barre_potion_01').setOrigin(0).setScrollFactor(0).setAlpha(0);

        potion = this.physics.add.sprite(600,1400,'potion').setOrigin(0);
        this.tweens.add({
            targets: potion,
            y:1420,
            duration: 1500,
            yoyo: true,
            repeat: -1
        });

        texte_cle = this.add.text(168, 28, scoreCle, { font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        texte_bonbon = this.add.text(250,28, scoreBonbon,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        texte_gateau = this.add.text(345,28, scoreGateau,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        texte_carte = this.add.text(430,28, nbCarte,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);

        // ----- Items ----- //

        carte4 = this.physics.add.sprite(340,1700,'carte');
        gateau3 = this.physics.add.sprite(ennemi_cerveau4.x,ennemi_cerveau4.y,'gateau').setAlpha(0);
        bonbon3 = this.physics.add.sprite(ennemi_cerveau3.x,ennemi_cerveau3.y,'bonbon').setAlpha(0);
        bonbon4 = this.physics.add.sprite(ennemi_cerveau4.x,ennemi_cerveau4.y,'bonbon').setAlpha(0);
        bonbon5 = this.physics.add.sprite(ennemi_cerveau5.x,ennemi_cerveau5.y,'bonbon').setAlpha(0);
        bonbon6 = this.physics.add.sprite(boss_cerveau2.x,boss_cerveau2.y,'bonbon').setAlpha(0);

        this.tweens.add({
            targets: carte4,
            y:1720,
            duration: 1500,
            yoyo: true,
            repeat: -1
        });

        // ----- Overlap ----- //

        this.physics.add.overlap(groupeBullets,boss_cerveau2,killBoss2,null,this);
        this.physics.add.overlap(groupeBullets,ennemi_cerveau3,killEnnemi3,null,this);
        this.physics.add.overlap(groupeBullets,ennemi_cerveau4,killEnnemi4,null,this);
        this.physics.add.overlap(groupeBullets,ennemi_cerveau5,killEnnemi5,null,this);
        this.physics.add.overlap(player,carte4,dropCarte4,null,this);
        this.physics.add.overlap(player,tentacules_01,perdPdv,null,this);
        this.physics.add.overlap(player,potion,dropPotion,null,this);
        this.physics.add.overlap(player,bonbon3,dropBonbonS5_3,null,this);
        this.physics.add.overlap(player,bonbon4,dropBonbonS5_4,null,this);
        this.physics.add.overlap(player,bonbon5,dropBonbonS5_5,null,this);
        this.physics.add.overlap(player,bonbon6,dropBonbonS5_6,null,this);
        this.physics.add.overlap(player,gateau3,dropGateauS5_3,null,this);

        // ----- Collider ----- //

        this.physics.add.collider(player,ennemi_cerveau3,perdPdv,null,this);
        this.physics.add.collider(player,boss_cerveau2,perdPdv,null,this);
        this.physics.add.collider(player,ennemi_cerveau5,perdPdv,null,this);
        this.physics.add.collider(player,ennemi_cerveau4,perdPdv,null,this);
    }

    update(){

        // ----- Si la scene restart les ennemis/items éliminés/drop n'apparaisent plus ----- //

        if(etat_ennemi3 == false && dropBonbon3 == false){
            ennemi_cerveau3.destroy(true,true);
            bonbon3.destroy(true,true);
        }

        if(dropBonbon3 == false){
            bonbon3.destroy(true,true);
        }

        if(etat_ennemi4 == false && dropBonbon4 == false && dropGateau3 == false){
            ennemi_cerveau4.destroy(true,true);
            bonbon4.destroy(true,true);
            gateau3.destroy(true,true);
        }

        if(dropBonbon4 == false){
            bonbon4.destroy(true,true);
        }

        if(dropGateau3 == false){
            gateau3.destroy(true,true);
        }

        if(etat_ennemi5 == false && dropBonbon5 == false){
            ennemi_cerveau5.destroy(true,true);
            bonbon5.destroy(true,true);
        }

        if(dropBonbon5 == false){
            bonbon5.destroy(true,true);
        }

        if(etat_boss2 == false && dropBonbon6 == false){
            boss_cerveau2.destroy(true,true);
            bonbon6.destroy(true,true);
        }

        if(dropBonbon6 == false){
            bonbon6.destroy(true,true);
        }

        // ----- GameOver ----- //

        if(playerPdv == 0){
            playerPdv = 5;
            this.scene.start("Scene_05");
        }

        // ----- Compteurs ----- //

        if(invincible == true){ // relance du compteur d'invulné player //
            compteur-- ;
            if(compteur == 0){
                compteur = 150;
                invincible = false ;
            }
        }

        if(bossInvulne2 == true){ // relance du compteur d'invulné Boss2 //
            compteurBoss2-- ;
            if(compteurBoss2 == 0){
                compteurBoss2 = 50;
                bossInvulne2 = false;
            }
        }

        if(ennemiInvulne3 == true){ // relance du compteur d'invulné ennemi3 //
            compteurEnnemi3-- ;
            if(compteurEnnemi3 == 0){
                compteurEnnemi3 = 50;
                ennemiInvulne3 = false;
            }
        }

        if(ennemiInvulne4 == true){ // relance du compteur d'invulné ennemi 4 //
            compteurEnnemi4-- ;
            if(compteurEnnemi4 == 0){
                compteurEnnemi4 = 50;
                ennemiInvulne4 = false;
            }
        }

        if(ennemiInvulne5 == true){ // relance du compteur d'invulné ennemi 5 //
            compteurEnnemi5-- ;
            if(compteurEnnemi5 == 0){
                compteurEnnemi5 = 50;
                ennemiInvulne5 = false;
            }
        }

        // ----- Active potion mini + compteur ----- //

        if ( Phaser.Input.Keyboard.JustDown(keyF)) { // la touche F permet d'activer la capacité "mini" (le joueur rétrécit sa taille) //
            mini();
        }
        if(etat_potion == true){ // cooldown potion mini //
            compteur_potion-- ;
            if(compteur_potion == 600){
                barre_potion_06.setAlpha(1);
                barre_potion_05.setAlpha(1);
                barre_potion_04.setAlpha(1);
                barre_potion_03.setAlpha(1);
                barre_potion_02.setAlpha(1);
                barre_potion_01.setAlpha(1);

            }
            if(compteur_potion < 600){
                barre_potion_01.setAlpha(0);

            }
            if(compteur_potion <= 500){
                barre_potion_02.setAlpha(0);

            }
            if(compteur_potion <= 400){
                barre_potion_03.setAlpha(0);

            }
            if(compteur_potion <= 300){
                barre_potion_04.setAlpha(0);

            }
            if(compteur_potion <= 200){
                barre_potion_05.setAlpha(0);

            }
            if(compteur_potion <= 100){
                barre_potion_06.setAlpha(0);
            }
            if(compteur_potion == 0){
                compteur_potion = 600;
                barre_potion_06
                etat_potion = false;
                player.setScale(1);
                barre_potion_01.setAlpha(1);
                barre_potion_02.setAlpha(1);
                barre_potion_03.setAlpha(1);
                barre_potion_04.setAlpha(1);
                barre_potion_05.setAlpha(1);
                barre_potion_06.setAlpha(1);
            }
        }

        // ----- Active le lancer de carte + compteur ----- //

        if(bulletOn == false){ // relance du compteur pour lancer une nouvelle carte  //
            compteurBullet-- ;
            if(compteurBullet == 0){
                compteurBullet = 50;
                bulletOn = true ;
            }
        }

        if ( Phaser.Input.Keyboard.JustDown(boutonTire)) { // la touche ESPACE permet de lancer une carte //
            tirer(player);
        }

        // ----- Controls clavier ----- //

       if(Phaser.Input.Keyboard.JustDown(keyE) && playerPdv < 5 && scoreGateau >= 1){ // La touche E permet de se soigner si on a un gateau //
            console.log(scoreGateau);
            playerPdv += 1;
            scoreGateau -= 1;
            texte_gateau.setText(scoreGateau);

            if(playerPdv == 5){ // Controle l'état de santé du joueur //
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

       if (keyD.isDown){// direction droite //
            player.direction = 'right'; // si le joueur est a droite il tire a droite //
            player.setVelocityX(200);
            player.setFlipX(false);
        }

        else if (keyQ.isDown){ // direction gauche //
            player.setVelocityX(-200);
            player.setFlipX(true);
            player.direction = 'left'; // si le joueur est a gauche il tire à gauche //
        }

        else if (keyD.isUp && keyQ.isUp){ // Aucune touche enfoncée = pas de déplacement //
            player.setVelocityX(0);
        }

        if (keyZ.isDown){ // direction haute //
            player.setVelocityY(-200);
        }

        else if (keyS.isDown){ // direction basse //
            player.setVelocityY(200);
        }

        else if (keyZ.isUp && keyS.isUp){ // Aucune touche enfoncée = pas de déplacement //
            player.setVelocityY(0);
        }

        // ----- Controls manette ----- //.

        if (padConnected) {

            if (paddle.X){ // La touche X permet de tirer une carte //
                tirer(player);
            }

            if(paddle.right){ // direction droite //
                player.direction = 'right'; // si le joueur est a droite il tire a droite //
                player.setVelocityX(200);
                player.setFlipX(false);
            }

            if(paddle.left){ // direction gauche //
                player.direction = 'left'; // si le joueur est a gauche il tire a gauche //
                player.setVelocityX(-200);
                player.setFlipX(true);
            }

            if(paddle.up){ // direction haute //
                player.setVelocityY(-200);
            }

            if(paddle.down){ // direction basse //
                player.setVelocityY(200);
            }

            if(paddle.Y && playerPdv < 5 && scoreGateau >= 1){ // Le bouton Y permet de se soigner si on a un gateau //
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

           if ( paddle.B) { // la touche B permet d'activer la capacité "mini" //
            mini();
            }

            if(etat_potion == true){ // cooldown capacité mini //
                compteur_potion-- ;
                if(compteur_potion == 600){
                    barre_potion_06.setAlpha(1);
                    barre_potion_05.setAlpha(1);
                    barre_potion_04.setAlpha(1);
                    barre_potion_03.setAlpha(1);
                    barre_potion_02.setAlpha(1);
                    barre_potion_01.setAlpha(1);

                }
                if(compteur_potion < 600){
                    barre_potion_01.setAlpha(0);

                }
                if(compteur_potion <= 500){
                    barre_potion_02.setAlpha(0);

                }
                if(compteur_potion <= 400){
                    barre_potion_03.setAlpha(0);

                }
                if(compteur_potion <= 300){
                    barre_potion_04.setAlpha(0);

                }
                if(compteur_potion <= 200){
                    barre_potion_05.setAlpha(0);

                }
                if(compteur_potion <= 100){
                    barre_potion_06.setAlpha(0);
                }
                if(compteur_potion == 0){
                    compteur_potion = 600;
                    barre_potion_06
                    etat_potion = false;
                    player.setScale(1);
                    barre_potion_01.setAlpha(1);
                    barre_potion_02.setAlpha(1);
                    barre_potion_03.setAlpha(1);
                    barre_potion_04.setAlpha(1);
                    barre_potion_05.setAlpha(1);
                    barre_potion_06.setAlpha(1);
                }
            }
        }   
    }
}
    
// ----- Fonctions ----- //

function tirer(player) {
    if(nbCarte >= 1){
        if (bulletOn == true){
            var coefDir;
            if (player.direction == 'left') { // determine la direction du joueur //
                coefDir = -1; 
            } else { 
                coefDir = 1
            }
            bullet = groupeBullets.create(player.x + (25 * coefDir), player.y - 4, 'carte');// permet de créer la carte à coté du joueur //
            // Physique de la carte //
            bullet.setCollideWorldBounds(false);
            bullet.body.allowGravity =false;
            bullet.setVelocity(500 * coefDir, 0); // vitesse en x et en y
            bulletOn = false;
            nbCarte -=1;
            texte_carte.setText(nbCarte);
        }
    }
}

function hitCarte (bullet) { // si la carte touche un élément de decor elle est détruite //
    bullet.destroy();
}

function perdPdv(){ // si le joueur touche un monstre il perd un point de vie //
    
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

function killBoss2 () { // Si le boss est touché par une carte il perd un point de vie //
    if(bossInvulne2 == false){
        pdvBoss2 -= 1;
        bullet.destroy();
    }
    bossInvulne2 = true;
    if(pdvBoss2 <= 0){ // Si il n'a plus de points de vie, il disparait et drop un item //
        etat_boss2 = false;
        if (etat_boss2 == false){
            boss_cerveau2.destroy();
            bonbon6.setAlpha(1);
            bonbon6.setX(boss_cerveau2.x + 30);
            bonbon6.setY(boss_cerveau2.y + 20);
            visibleBonbon6 = true;
        }
    }
}

 // Les ennemis on a la meme fonction que le boss au contact d'une carte //

function killEnnemi3 () {
    if(ennemiInvulne3 == false){
        pdvEnnemi3 -= 1;
        bullet.destroy();
    }
    ennemiInvulne3 = true;
    if(pdvEnnemi3 <= 0){
        etat_ennemi3 = false;
        if (etat_ennemi3 == false){
            ennemi_cerveau3.destroy();
            bonbon3.setAlpha(1);
            bonbon3.setX(ennemi_cerveau3.x + 30);
            bonbon3.setY(ennemi_cerveau3.y + 20);
            visibleBonbon3 = true;
        }
    }
}

function killEnnemi4 () {
    if(ennemiInvulne4 == false){
        pdvEnnemi4 -= 1;
        bullet.destroy();
    }
    ennemiInvulne4 = true;
    if(pdvEnnemi4 <= 0){
        etat_ennemi4 = false;
        if (etat_ennemi4 == false){
            ennemi_cerveau4.destroy();
            bonbon4.setAlpha(1);
            bonbon4.setX(ennemi_cerveau4.x);
            bonbon4.setY(ennemi_cerveau4.y);
            visibleBonbon4 = true;

            gateau3.setAlpha(1);
            gateau3.setX(ennemi_cerveau4.x + 30);
            gateau3.setY(ennemi_cerveau4.y + 20);
            visibleGateau3 = true;
        }
    }
}

function killEnnemi5 () {
    if(ennemiInvulne5 == false){
        pdvEnnemi5 -= 1;
        bullet.destroy();
    }
    ennemiInvulne5 = true;
    if(pdvEnnemi5 <= 0){
        etat_ennemi5 = false;
        if (etat_ennemi5 == false){
            ennemi_cerveau5.destroy();
            bonbon5.setAlpha(1);
            bonbon5.setX(ennemi_cerveau5.x + 30);
            bonbon5.setY(ennemi_cerveau5.y + 20);
            visibleBonbon5 = true;
        }
    }
}

// permet le drop d'item //

function dropCarte4(){
    nbCarte += 12;
    texte_carte.setText(nbCarte);
    carte4.destroy();
    lanceCarte = true;
    etat_carte4 = false;
}

function dropPotion(){
    potion_image.setAlpha(1);
    barre_potion_06.setAlpha(1);
    barre_potion_05.setAlpha(1);
    barre_potion_04.setAlpha(1);
    barre_potion_03.setAlpha(1);
    barre_potion_02.setAlpha(1);
    barre_potion_01.setAlpha(1);
    potion.destroy(true,true);
    potion_active = true;
}

function mini(){ // active la capicité "mini" //
    if (potion_active = true){
        etat_potion = true;
        player.setScale(0.5);
    }
}

function dropBonbonS5_3(){
    
    if(visibleBonbon3 == true && dropBonbon3 == true){
        scoreBonbon +=7;
        bonbon3.destroy(true,true);
        texte_bonbon.setText(scoreBonbon);
        dropBonbon3 = false;
    }
}
function dropBonbonS5_4(){

    if(visibleBonbon4 == true && dropBonbon4 == true){
        scoreBonbon +=7;
        bonbon4.destroy(true,true);
        texte_bonbon.setText(scoreBonbon);
        dropBonbon4 = false;
    }
}

function dropBonbonS5_5(){

    if(visibleBonbon5 == true && dropBonbon5 == true){
        scoreBonbon +=7;
        bonbon5.destroy(true,true);
        texte_bonbon.setText(scoreBonbon);
        dropBonbon5 = false;
    }
}

function dropBonbonS5_6(){

    if(visibleBonbon6 == true && dropBonbon6 == true){
        scoreBonbon +=20;
        bonbon6.destroy(true,true);
        texte_bonbon.setText(scoreBonbon);
        dropBonbon6 = false;
    }
}



function dropGateauS5_3(){
    
    if(visibleGateau3 == true){
        scoreGateau +=1;
        gateau3.destroy(true,true);
        texte_gateau.setText(scoreGateau);
        dropGateau3 = false;
    }
}
