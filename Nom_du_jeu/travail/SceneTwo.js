var player;
var cursors;
var blockCentral_s2;
var blockCentral_s2_2;
var blockHaut;
var blockBas;
var blockDroit;
var passageHaut;


class SceneTwo extends Phaser.Scene{
    constructor(){
        super("SceneTwo");
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
        
    }
    create(){
        
        this.add.image(0,0,'background').setOrigin(0).setScrollFactor(0);
        


        blockCentral_s2 = this.physics.add.staticGroup();
        blockCentral_s2_2 = this.physics.add.staticGroup();
        blockHaut = this.physics.add.staticGroup();
        blockBas = this.physics.add.staticGroup();
        blockDroit = this.physics.add.staticGroup();
        passageHaut = this.physics.add.staticGroup();
        
        passageHaut.create(100,20,'passageHaut_s2').setOrigin(0);
        blockHaut.create(0,0,'blockHaut').setOrigin(0);
        blockDroit.create(675,310,'blockDroit').setOrigin(0);
        blockCentral_s2_2.create(20,150,'blockCentral2_scene2').setOrigin(0);
       
        // ----- Player ----- //
        player = this.physics.add.sprite(200, 200, 'player');
        player.setCollideWorldBounds(true);
        

        
        blockCentral_s2.create(20,150,'blockCentral_scene2').setOrigin(0).setSize(300,50).setOffset(590,230);
        blockBas.create(0,100,'blockBas').setOrigin(0);

 


        this.physics.add.overlap(player,passageHaut,changementZone, null, this);
        this.physics.add.collider(player,blockCentral_s2);

        cursors = this.input.keyboard.createCursorKeys();
        
        function changementZone(){
            this.scene.start("SceneOne");
            console.log("changement");
        }
    }
    
    update(){
        if (cursors.right.isDown){
            player.setVelocityX(200);
        }
        else if (cursors.left.isDown){
            player.setVelocityX(-200);
        }
        else if (cursors.right.isUp && cursors.left.isUp){
            player.setVelocityX(0);
        }
        if (cursors.up.isDown){
            player.setVelocityY(-200);
        }
        else if (cursors.down.isDown){
            player.setVelocityY(200);
        }
        else if (cursors.up.isUp && cursors.down.isUp){
            player.setVelocityY(0);
        }
    }
}