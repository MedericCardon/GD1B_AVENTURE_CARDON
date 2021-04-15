var player;
var cursors;
var blockCentral;
var blockHaut;
var blockBas;

class SceneTwo extends Phaser.Scene{
    constructor(){
        super("SceneTwo");
    }
    init(data){
    }
    preload(){

        this.load.image('background', 'assets/00_background_scenes/background_scene_02-assets/background.png')
        this.load.image('blockCentral', 'assets/00_background_scenes/background_scene_02-assets/block_scene_2.png')
        this.load.image('blockHaut', 'assets/00_background_scenes/background_scene_02-assets/passage_devant_scene_2.png')
        this.load.image('blockBas', 'assets/00_background_scenes/background_scene_02-assets/passage_derriere_scene_2.png')
        this.load.image('player','assets/02_spriteSheet_personnage/player.png');
        
    }
    create(){
        
        this.add.image(0,0,'background').setOrigin(0).setScrollFactor(0);


        blockCentral = this.physics.add.staticGroup();
        blockHaut = this.physics.add.staticGroup();
        blockBas = this.physics.add.staticGroup();
        
        blockHaut.create(0,0,'blockHaut').setOrigin(0);
       
        // ----- Player ----- //
        player = this.physics.add.sprite(300, 300, 'player');
        player.setCollideWorldBounds(true);

        
      
        blockBas.create(0,100,'blockBas').setOrigin(0);

 


        this.physics.add.overlap(player,passage_bas, changementZone, null, this);
        this.physics.add.collider(player,blockCentral);

        cursors = this.input.keyboard.createCursorKeys();
        
        function changementZone(){
                this.scene.start("Scene_03");
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
        else if (cursors.up.isDown){
            player.setVelocityY(-200);
        }
        else if (cursors.down.isDown){
            player.setVelocityY(200);
        }
        else{
            player.setVelocity(0);
        }
    }
}