var player;
var cursors;
var passage_bas;
var blockCentral;
var blockCentral_2;
var arbre;
class SceneOne extends Phaser.Scene{
    constructor(){
        super("sceneOne");
    }
    init(data){
    }
    preload(){

        this.load.image('passage_bas','assets/01_decors/block_decors-assets/passage_zone_01.png')
        this.load.image('scene_01','assets/02_spriteSheet_personnage/scene_01.png')
        this.load.image('player','assets/02_spriteSheet_personnage/player.png');
        this.load.image('arbre', 'assets/01_decors/block_decors-assets/arbre.png')
        this.load.image('blockCentral', 'assets/01_decors/block_decors-assets/block_central.png')
        this.load.image('blockCentral_2', 'assets/01_decors/block_decors-assets/block_central_2.png')
    }
    create(){
        
        this.add.image(0,0,'scene_01').setOrigin(0).setScrollFactor(0);
        passage_bas = this.physics.add.sprite(580, 700, 'passage_bas');
        

        blockCentral = this.physics.add.staticGroup(); // Le personnage passe derrière //
        blockCentral_2 = this.physics.add.staticGroup(); // Le personnage passe devant //
        arbre = this.physics.add.staticGroup(); // arbre element de décor // 
        

       blockCentral.create(410,250,'blockCentral').setOrigin(0).setSize(250,20).setOffset(150,150);
        // ----- Player ----- //
        player = this.physics.add.sprite(300, 300, 'player');
        player.setCollideWorldBounds(true);

        
       // ----- Arbres ----- //

       arbre.create(460,40,'arbre').setOrigin(0);
       arbre.create(800,50,'arbre').setOrigin(0);

       
       blockCentral_2.create(420,250,'blockCentral_2').setOrigin(0).setSize(0,0).setOffset(150,150);

        this.physics.add.overlap(player,passage_bas, changementZone, null, this);
        this.physics.add.collider(player,blockCentral);

        cursors = this.input.keyboard.createCursorKeys();
        
        function changementZone(){
                this.scene.start("SceneTwo");
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