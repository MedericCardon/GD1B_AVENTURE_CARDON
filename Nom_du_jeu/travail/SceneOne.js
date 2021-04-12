var player;
var cursors;

class SceneOne extends Phaser.Scene{
    constructor(){
        super("sceneOne");
    }
    init(data){
    }
    preload(){   
        this.load.image('assets/02_spriteSheet_personnage/scene_01.png');
        this.load.image('assets/02_spriteSheet_personnage/player.png')
        
    }
    create(){
        

        player = this.physics.add.sprite(300, 300, 'player');

        this.physics.add.overlap(player, zone, changementZone, null, this);

        cursors = this.input.keyboard.createCursorKeys();
        
        function changementZone(player, zone){
            if (player.y >= 730 && player.x >= 400 && player.x <= 560){
                this.scene.start("sceneTwo");
                console.log("changement");
            }
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