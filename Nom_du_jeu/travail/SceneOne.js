var player;
var cursors;

class SceneOne extends Phaser.Scene{
    constructor(){
        super("sceneOne");
    }
    init(data){
    }
    preload(){
        this.load.image('tiles', 'assets/00_tiled/Scene_01.png');
        this.load.tilemapTiledJSON('map_1', 'assets/00_tiled/Scene_01.json');
        this.load.image('assets/02_spriteSheet_personnage/player.png');
        
    }
    create(){
        
        const map = this.make.tilemap({key: 'map_1'});
        const tileset = map.addTilesetImage('tileset_placeholder', 'tiles');
        const passage = map.createStaticLayer('passage', tileset, 0, 0);
        
        const bloque = map.createStaticLayer('bloque', tileset, 0, 0);
        player = this.physics.add.sprite(300, 300, 'player');

        passage.setCollisionByExclusion(-1, true);
        bloque.setCollisionByExclusion(-1, true);
        this.physics.add.overlap(player, zone, changementZone, null, this);

        cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(player, bloque);
        
        function changementZone(player, passage){
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