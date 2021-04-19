var player;
var cursors;
var blockCentral_s2;
var blockCentral_s2_2;
var blockHaut;
var blockBas;
var blockDroit;
var passageHaut;
var ennemi_cerveau;
var compteur = 150; // par défaut: 150 //
var invincible = false;
var playerPdv = 5;
var cle;
var scoreCle = 0;
var scoreGateau = 0;
var scoreBonbon = 0;
var texte_cle;
var texte_bonbon;
var texte_gateau;
var gateau;
var bonbon;

var visibleGateau = false;
var visibleBonbon = false;

var keyZ;
var keyQ;
var keyS;
var keyD;
var keyE;
var spaceBar;

var gamepad;
var paddle;
var padConnected;
var pad;



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

        this.load.spritesheet('ennemi_cerveau', 'assets/03_spriteSheet_monstre_cerveau/spriteSheet_monstre_cerveau-assets/spriteSheet_monstre_cerveau.png', { frameWidth: 155.75, frameHeight: 121 });
        
    }
    create(){
        
        this.add.image(0,0,'background').setOrigin(0).setScrollFactor(0);
        


        blockCentral_s2 = this.physics.add.staticGroup();
        blockCentral_s2_2 = this.physics.add.staticGroup();
        blockHaut = this.physics.add.staticGroup();
        blockBas = this.physics.add.staticGroup();
        blockDroit = this.physics.add.staticGroup();
        passageHaut = this.physics.add.staticGroup();

        

        ennemi_cerveau = this.physics.add.sprite(600,400, 'ennemi_cerveau');
        ennemi_cerveau.body.setAllowGravity(false); // pas de gravité pour les ennemis //
        ennemi_cerveau.setCollideWorldBounds(true);
        
        passageHaut.create(100,20,'passageHaut_s2').setOrigin(0);
        blockHaut.create(0,0,'blockHaut').setOrigin(0);
        blockDroit.create(675,310,'blockDroit').setOrigin(0);
        blockCentral_s2_2.create(20,150,'blockCentral2_scene2').setOrigin(0);
       
        // ----- Player ----- //
        player = this.physics.add.sprite(200, 200, 'player');
        player.setCollideWorldBounds(true);
        player.setVelocity(0);
        
        this.add.image(0,0,'HUD').setOrigin(0);

        blockCentral_s2.create(20,150,'blockCentral_scene2').setOrigin(0).setSize(300,50).setOffset(590,230);
        blockBas.create(0,100,'blockBas').setOrigin(0);
        
        cle = this.physics.add.sprite(1200,400,'cle');
        cle.body.setAllowGravity(false); 
        cle.setCollideWorldBounds(true);

        gateau = this.physics.add.sprite(ennemi_cerveau.x,ennemi_cerveau.y,'gateau').setAlpha(0);
        bonbon = this.physics.add.sprite(ennemi_cerveau.x,ennemi_cerveau.y,'bonbon').setAlpha(0);
        

        this.physics.add.overlap(player,passageHaut,changementZone2, null, this);
        this.physics.add.collider(player,blockCentral_s2);
        this.physics.add.overlap(player,ennemi_cerveau,killEnnemi,null,this);
        this.physics.add.overlap(player,cle,dropCle,null,this);
        this.physics.add.overlap(player,bonbon,dropBonbon,null,this);
        this.physics.add.overlap(player,gateau,dropGateau,null,this);

        // ----- Pad + touches clavier ----- //

        cursors = this.input.keyboard.createCursorKeys();
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        keyZ.reset();
        keyQ.reset();
        keyS.reset();
        keyD.reset();

        this.input.gamepad.once('connected', function (pad) {
            paddle = pad;
            padConnected = true;
        });

        // ----- Score texte ----- //
        texte_cle = this.add.text(80, 20, '0', { font: '20px Georgia', fill: '#f0acdc' });
        texte_gateau = this.add.text(160,20, '0',{font: '20px Georgia', fill: '#f0acdc' });
        texte_bonbon = this.add.text(230,19, '0',{font: '20px Georgia', fill: '#f0acdc' });

        
        function changementZone2(){
            this.scene.start("Scene_01");
            console.log("changement");
            player.setX(100);
            player.setY(100);
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

        // ----- Compteurs ----- //

        if(invincible == true){ // relance du compteur d'invulné player //
            compteur-- ;
            if(compteur == 0){
                compteur = 150;
                invincible = false ;
            }
        }

        if (keyD.isDown){
            player.setVelocityX(200);
            ennemi_cerveau.anims.play('move_ennemi_cerveau');
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


function hitEnnemi(){
    if(invincible == false){
        invincible = true ;
        playerPdv -= 1;
    }
}
function killEnnemi(){
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

function dropCle(){
    scoreCle += 1;
    cle.destroy();
    texte_cle.setText(scoreCle);
}

function dropBonbon(){
    if(visibleBonbon == true){
        scoreBonbon +=10;
        bonbon.destroy(true,true);
        texte_bonbon.setText(scoreBonbon);
    }
}

function dropGateau(){
    if(visibleGateau == true){
        scoreGateau +=1;
        gateau.destroy(true,true);
        texte_gateau.setText(scoreGateau);
    }
}
