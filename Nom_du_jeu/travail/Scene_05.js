var player;
var cursors;

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

var carte4;
var etat_carte4 = true;

class Scene_05 extends Phaser.Scene{
    constructor(){
        super("Scene_05");
    }
    init(data){
    }
    preload(){
        this.load.image('background_s5','assets/00_background_scenes/background_scene_05-assets/background.png')
        this.load.image('arbre_s5','assets/00_background_scenes/background_scene_05-assets/arbre_s5.png')
        this.load.image('player','assets/02_spriteSheet_personnage/player.png');
        this.load.image('boss_cerveau','assets/03_spriteSheet_monstre_cerveau/spriteSheet_bossCerveau-assets/boss_cerveau.png');
        this.load.spritesheet('ennemi_cerveau', 'assets/03_spriteSheet_monstre_cerveau/spriteSheet_monstre_cerveau-assets/spriteSheet_monstre_cerveau.png', { frameWidth: 155.75, frameHeight: 121 });
        this.load.image('HUD','assets/04_items/Item_collectibles-assets/HUD.png')
        this.load.image('pdv5', 'assets/04_items/Item_collectibles-assets/pdv_5.png')
        this.load.image('pdv4', 'assets/04_items/Item_collectibles-assets/pdv_4.png')
        this.load.image('pdv3', 'assets/04_items/Item_collectibles-assets/pdv_3.png')
        this.load.image('pdv2', 'assets/04_items/Item_collectibles-assets/pdv_2.png')
        this.load.image('pdv1', 'assets/04_items/Item_collectibles-assets/pdv_1.png')
    }

    create(){
        this.add.image(0,0,'background_s5').setOrigin(0);

        groupeBullets = this.physics.add.group();

        player = this.physics.add.sprite(300, 1940, 'player'); // 300,1940
        player.setCollideWorldBounds(true);

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

        this.add.image(0,0,'arbre_s5').setOrigin(0);
        

        this.cameras.main.setBounds(0, 0,  2940  , 1960 );
        this.physics.world.setBounds(0, 0, 2940 , 1960);
        this.cameras.main.startFollow(player, true, 0.05, 0.05);
        this.cameras.main.fadeIn(2000);

        cursors = this.input.keyboard.createCursorKeys();
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        boutonTire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        
        keyZ.reset();
        keyQ.reset();
        keyS.reset();
        keyD.reset();

        pdv1 = this.physics.add.sprite(40,40,'pdv1').setAlpha(0).setScrollFactor(0);
        pdv2 = this.physics.add.sprite(40,40,'pdv2').setAlpha(0).setScrollFactor(0);
        pdv3 = this.physics.add.sprite(40,40,'pdv3').setAlpha(0).setScrollFactor(0);
        pdv4 = this.physics.add.sprite(40,40,'pdv4').setAlpha(0).setScrollFactor(0);
        pdv5 = this.physics.add.sprite(40,40,'pdv5').setAlpha(0).setScrollFactor(0);

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

        carte4 = this.physics.add.sprite(340,1700,'carte');

        this.tweens.add({
            targets: carte4,
            y:1720,
            duration: 1500,
            yoyo: true,
            repeat: -1
        });

        this.add.image(50,10,'HUD').setOrigin(0).setScrollFactor(0);

        texte_cle = this.add.text(168, 28, scoreCle, { font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        texte_bonbon = this.add.text(250,28, scoreBonbon,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        texte_gateau = this.add.text(345,28, scoreGateau,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);
        texte_carte = this.add.text(430,28, nbCarte,{font: '20px Georgia', fill: '#f0acdc' }).setScrollFactor(0);

        this.physics.add.overlap(groupeBullets,boss_cerveau2,killBoss2,null,this);
        this.physics.add.collider(player,boss_cerveau2,perdPdv,null,this);
        this.physics.add.overlap(groupeBullets,ennemi_cerveau3,killEnnemi3,null,this);
        this.physics.add.collider(player,ennemi_cerveau3,perdPdv,null,this);
        this.physics.add.overlap(groupeBullets,ennemi_cerveau4,killEnnemi4,null,this);
        this.physics.add.collider(player,ennemi_cerveau4,perdPdv,null,this);
        this.physics.add.overlap(groupeBullets,ennemi_cerveau5,killEnnemi5,null,this);
        this.physics.add.collider(player,ennemi_cerveau5,perdPdv,null,this);
        this.physics.add.overlap(player,carte4,dropCarte4,null,this);

    }

    update(){
        if(invincible == true){ // relance du compteur d'invulné player //
            compteur-- ;
            if(compteur == 0){
                compteur = 150;
                invincible = false ;
            }
        }

        if(bossInvulne2 == true){ // relance du compteur d'invulné player //
            compteurBoss2-- ;
            if(compteurBoss2 == 0){
                compteurBoss2 = 50;
                bossInvulne2 = false;
            }
        }

        if(ennemiInvulne3 == true){ // relance du compteur d'invulné player //
            compteurEnnemi3-- ;
            if(compteurEnnemi3 == 0){
                compteurEnnemi3 = 50;
                ennemiInvulne3 = false;
            }
        }

        if(ennemiInvulne4 == true){ // relance du compteur d'invulné player //
            compteurEnnemi4-- ;
            if(compteurEnnemi4 == 0){
                compteurEnnemi4 = 50;
                ennemiInvulne4 = false;
            }
        }

        if(ennemiInvulne5 == true){ // relance du compteur d'invulné player //
            compteurEnnemi5-- ;
            if(compteurEnnemi5 == 0){
                compteurEnnemi5 = 50;
                ennemiInvulne5 = false;
            }
        }

        if(bulletOn == false){ // relance du compteur d'invulné player //
            compteurBullet-- ;
            if(compteurBullet == 0){
                compteurBullet = 50;
                bulletOn = true ;
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

       if (keyD.isDown){
            player.direction = 'right';
            player.setVelocityX(200);
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

function killBoss2 () {
    if(bossInvulne2 == false){
        pdvBoss2 -= 1;
        bullet.destroy();
    }
    bossInvulne2 = true;
    if(pdvBoss2 <= 0){
        etat_boss2 = false;
        if (etat_boss2 == false){
            boss_cerveau2.destroy();
        }
    }
}

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
        }
    }
}
function dropCarte4(){
    nbCarte += 12;
    texte_carte.setText(nbCarte);
    carte4.destroy();
    lanceCarte = true;
    etat_carte4 = false;
}
