var player;
var cursors;
var passage_bas;
var blockCentral;
var blockCentral_2;
var arbre;

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

var changeZone = false;

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
        

       blockCentral.create(410,250,'blockCentral').setOrigin(0).setSize(250,20).setOffset(150,150);

        // ----- Player ----- //

        player = this.physics.add.sprite(300, 300, 'player');
        player.setCollideWorldBounds(true);

        this.add.image(0,0,'HUD').setOrigin(0);
        
       // ----- Arbres ----- //

       arbre.create(460,40,'arbre').setOrigin(0);
       arbre.create(800,50,'arbre').setOrigin(0);

       
       blockCentral_2.create(420,250,'blockCentral_2').setOrigin(0).setSize(0,0).setOffset(150,150);

        this.physics.add.overlap(player,passage_bas, changementZone, null, this);
        this.physics.add.collider(player,blockCentral);

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


        this.input.gamepad.once('connected', function (pad, button, index) {
            paddle = pad;
            padConnected = true;
        }); 

        // ----- score texte ----- //

        texte_cle = this.add.text(80, 20, scoreCle, { font: '20px Georgia', fill: '#f0acdc' });
        texte_gateau = this.add.text(160,20, scoreGateau,{font: '20px Georgia', fill: '#f0acdc' });
        texte_bonbon = this.add.text(230,19, scoreBonbon,{font: '20px Georgia', fill: '#f0acdc' });
        
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
