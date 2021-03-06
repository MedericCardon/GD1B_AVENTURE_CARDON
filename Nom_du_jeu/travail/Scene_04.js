// ---------------------------------------------------//
// ----------------- VARIABLES ---------------------- //
// ---------------------------------------------------//

var player;
var cursors;

// ----- Decors ----- //

var decor_derriere_s4;
var decor_maison_s4;
var decor_tente_s4;
var passageBas_s3;
var entree_tente = false;

// ----- ennemi ----- //

var boss_cerveau;
var pdvBoss = 5;
var etat_boss = true;
var compteurBoss = 50;
var bossInvulne = false;
var anim_boss = true;

// ----- Items ----- //

var cle2;
var visibleCle2 = false;
var cle2Drop = true;

var carte3;
var etat_carte3 = true;

// ----- PNJ + dialogues ----- //

var oni;
var oniDisc = false;
var dialogue_01;
var dialogue01 = true;
var dialogue_02;
var dialogue_03;

// ----- Touche clavier ----- //

var keyA;

// ---------------------------------------------------//

class Scene_04 extends Phaser.Scene{
    constructor(){
        super("Scene_04");
    }
    init(data){
    }
    preload(){

        // ----- Decors + player ----- //

        this.load.image('player','assets/02_spriteSheet_personnage/player.png');
        this.load.image('background_s4','assets/00_background_scenes/background_scene_04-assets/background_s4.png')
        this.load.image('decor_derriere','assets/00_background_scenes/background_scene_04-assets/block_s4_derriere.png')
        this.load.image('decor_maison','assets/00_background_scenes/background_scene_04-assets/block_s4_devant.png')
        this.load.image('decor_tente','assets/00_background_scenes/background_scene_04-assets/tente.png')
        this.load.image('pont','assets/00_background_scenes/background_scene_04-assets/langue_pont.png')
        this.load.image('passageBas_s3', 'assets/01_decors/block_decors-assets/passage_zone_01.png');

        // ----- Ennemi ----- //

        this.load.image('boss_cerveau','assets/03_spriteSheet_monstre_cerveau/spriteSheet_boss_cerveau-assets/spriteSheet_boss_cerveau.png');

        // ----- HUD -----// 

        this.load.image('HUD','assets/04_items/Item_collectibles-assets/HUD.png')
        this.load.image('pdv5', 'assets/04_items/Item_collectibles-assets/pdv_5.png')
        this.load.image('pdv4', 'assets/04_items/Item_collectibles-assets/pdv_4.png')
        this.load.image('pdv3', 'assets/04_items/Item_collectibles-assets/pdv_3.png')
        this.load.image('pdv2', 'assets/04_items/Item_collectibles-assets/pdv_2.png')
        this.load.image('pdv1', 'assets/04_items/Item_collectibles-assets/pdv_1.png')
        
        // ----- Items ----- //

        this.load.image('cle','assets/04_items/Item_collectibles-assets/cle.png')

        // ----- PNJ + dialogues ----- //

        this.load.spritesheet('oni','assets/02_spriteSheet_personnage/SpriteSheet_oni-assets/oni.png', { frameWidth: 96.1666667, frameHeight: 144 });
        this.load.image('dialogue_01','assets/02_spriteSheet_personnage/SpriteSheet_oni-assets/dialogue_01.png');
        this.load.image('dialogue_02','assets/02_spriteSheet_personnage/SpriteSheet_oni-assets/dialogue_02.png');
        this.load.image('dialogue_03','assets/02_spriteSheet_personnage/SpriteSheet_oni-assets/dialogue_03.png');

    }

    create(){

        // ----- Background ----- //

        this.add.image(0,0,'background_s4').setOrigin(0).setScrollFactor(0);

        // ----- Group ----- //

        decor_derriere_s4 = this.physics.add.staticGroup();
        decor_maison_s4 = this.physics.add.staticGroup();
        decor_tente_s4 = this.physics.add.staticGroup();
        dialogue_01 = this.physics.add.staticGroup();
        dialogue_02 = this.physics.add.staticGroup();
        dialogue_03 = this.physics.add.staticGroup();

        groupeBullets = this.physics.add.group(); // Permet de g??n??rer un projectile //

        // ----- Decors 2nd plan ----- //

        decor_maison_s4.create(0,0,'decor_maison').setOrigin(0);
        decor_tente_s4.create(829,0,'decor_tente').setOrigin(0).setScale(1.02).setSize(200,30).setOffset(350,280);
        this.add.image(570,545,'pont').setOrigin(0);
        
        // ----- Boss ----- //

        boss_cerveau = this.physics.add.sprite(100,200,'boss_cerveau').setOrigin(0).setSize(200,150).setOffset(50,10);


        this.tweens.add({
            targets: boss_cerveau,
            props: {
                x: { value: 800, duration: 3000, flipX: true },
                y: { value: 300, duration: 1000},
            },
            yoyo: true,
            repeat: -1
        });

        // ----- Player + PNJ ----- //

        oni = this.physics.add.sprite(980,130,'oni').setOrigin(0).setAlpha(0);

        this.anims.create({ // Animation PNJ //
            key: 'oniMove',
            frames: this.anims.generateFrameNumbers('oni', {start:0, end : 5}),
            frameRate : 5,
            repeat: -1
        });

        player = this.physics.add.sprite(640, 650, 'player');
        player.setCollideWorldBounds(true);
        player.setVelocity(0);

        // ----- Decors 1er plan + dialogues ----- //

        decor_derriere_s4.create(0,0,'decor_derriere').setOrigin(0);
        dialogue_01.create(980,20,'dialogue_01').setOrigin(0).setAlpha(0);
        dialogue_02.create(980,20,'dialogue_02').setOrigin(0).setAlpha(0);
        dialogue_03.create(980,20,'dialogue_03').setOrigin(0).setAlpha(0);
        passageBas_s3 = this.physics.add.sprite(590,710,'passageBas_s3').setOrigin(0);
        
        // ----- HUD ----- //

        pdv1 = this.physics.add.sprite(40,40,'pdv1').setAlpha(0);
        pdv2 = this.physics.add.sprite(40,40,'pdv2').setAlpha(0);
        pdv3 = this.physics.add.sprite(40,40,'pdv3').setAlpha(0);
        pdv4 = this.physics.add.sprite(40,40,'pdv4').setAlpha(0);
        pdv5 = this.physics.add.sprite(40,40,'pdv5').setAlpha(0);

        if(playerPdv == 5){// // controle l'??tat de sant?? du joueur //
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

        texte_cle = this.add.text(168, 28, scoreCle, { font: '20px Georgia', fill: '#f0acdc' });
        texte_bonbon = this.add.text(250,28, scoreBonbon,{font: '20px Georgia', fill: '#f0acdc' });
        texte_gateau = this.add.text(345,28, scoreGateau,{font: '20px Georgia', fill: '#f0acdc' });
        texte_carte = this.add.text(430,28, nbCarte,{font: '20px Georgia', fill: '#f0acdc' });
        
        // ----- Controls clavier + manette ----- //

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

        paddle = this.input.gamepad.pad1;

        // ----- Changement de scene ----- //
        
        function changementZone5(){
            this.scene.start("Scene_03");
            console.log("changement");
        }

        function changementZone6(){
            if(entree_tente == true){
                this.scene.start("Scene_05");
                console.log("changement");
            }
        }

        // ----- Camera ----- //

        this.cameras.main.fadeIn(2000);

        // ----- Items ----- //

        cle2 = this.physics.add.sprite(boss_cerveau.x,boss_cerveau.y,'cle').setAlpha(0);
        cle2.body.setAllowGravity(false); 
        cle2.setCollideWorldBounds(true);

        carte3 = this.physics.add.sprite(340,150,'carte');

        this.tweens.add({
            targets: carte3,
            y:160,
            duration: 1500,
            yoyo: true,
            repeat: -1
        });

        // ----- Overlap ----- //

        this.physics.add.overlap(player,passageBas_s3,changementZone5,null,this);
        this.physics.add.overlap(player,cle2,dropCle2,null,this);
        this.physics.add.overlap(groupeBullets,boss_cerveau,killBoss,null,this);
        this.physics.add.overlap(player,carte3,dropCarte3,null,this);
        this.physics.add.overlap(player,decor_tente_s4,changementZone6,null,this);

        // ----- Collider ----- //

        this.physics.add.collider(player,boss_cerveau,perdPdv,null,this);
        
    }

    update(){


        // ----- GameOver ----- //

        if(playerPdv == 0){
            playerPdv = 5;
            this.scene.start("Scene_04");
        }

        // ----- Passer les dialogues ----- //

        if(Phaser.Input.Keyboard.JustDown(keyA)){ // Appuyer sur A (clavier) pour passer les dialogues //
            if (oniDisc == true){
                DialogueOni();
            }
        }

        // ----- Si la scene restart les ennemis/items ??limin??s/drop n'apparaisent plus ----- //

        if(etat_boss == false && cle2Drop == false ){
            boss_cerveau.destroy(true,true);
            cle2.destroy(true,true);
            oniDisc = true;
            oni.setAlpha(1);
            dialogue_01.setAlpha(1);
            if(Phaser.Input.Keyboard.JustDown(keyA)){
                DialogueOni();
            }
        }
        if (cle2Drop == false){
            cle2.destroy();
        }
        if(etat_carte3 == false){
            carte3.destroy(true,true);
        }

        // ----- Compteurs ----- //

        if(invincible == true){ // relance du compteur d'invuln?? player //
            compteur-- ;
            if(compteur == 0){
                compteur = 150;
                invincible = false ;
            }
        }

        if(bossInvulne == true){ // relance du compteur d'invuln?? du boss //
            compteurBoss-- ;
            if(compteurBoss == 0){
                compteurBoss = 50;
                bossInvulne = false;
            }
        }

        if(bulletOn == false){ // relance du compteur des projectiles //
            compteurBullet-- ;
            if(compteurBullet == 0){
                compteurBullet = 50;
                bulletOn = true ;
            }
        }

        // ----- Controls clavier ----- //

        if ( Phaser.Input.Keyboard.JustDown(boutonTire)) { // Appuyer sur ESPACE permet de lancer un projectile //
            tirer(player);
        }

       if(Phaser.Input.Keyboard.JustDown(keyE) && playerPdv < 5 && scoreGateau >= 1){ // Appuyer sur la touche E (clavier) permet de se soigner si on a un gateau //
            console.log(scoreGateau);
            playerPdv += 1;
            scoreGateau -= 1;
            texte_gateau.setText(scoreGateau);

            if(playerPdv == 5){ // Controle l'??tat de sant?? du joueur //
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

       

       if (keyD.isDown){ // deplacement droite //
            player.direction = 'right'; // si le joueur est a droite il tire ?? droite //
            player.setVelocityX(200);
            player.setFlipX(false);
            oni.anims.play('oniMove');
        }

        else if (keyQ.isDown){ // deplacement gauche //
            player.setVelocityX(-200);
            player.setFlipX(true);
            player.direction = 'left'; // si le joueur est a gauche il tire a gauche //
        }

        else if (keyD.isUp && keyQ.isUp){// Aucune touche enfonc??e = pas de d??placement //
            player.setVelocityX(0);
        }

        if (keyZ.isDown){// direction haute //
            player.setVelocityY(-200);
        }

        else if (keyS.isDown){// direction basse //
            player.setVelocityY(200);
        }
        
        else if (keyZ.isUp && keyS.isUp){// Aucune touche enfonc??e = pas de d??placement //
            player.setVelocityY(0);
        }


        // ------ Controls manette ----- //

        if (padConnected) {

            if (paddle.X){ // Appuyer sur la touche X (manette) permet de lancer un projectile //
                tirer(player);
            }

            if(paddle.right){ // Deplacement droite //
                player.direction = 'right'; // si le joueur est a droite il tire ?? droite //
                player.setVelocityX(200);
                player.setFlipX(false);
            }
            if(paddle.left){ // Deplacement gauche //
                player.direction = 'left'; // si le joueur est a gauche il tire a gauche //
                player.setVelocityX(-200);
                player.setFlipX(true);
            }
            if(paddle.up){ // Deplacement haut //
                player.setVelocityY(-200);
            }
            if(paddle.down){ // Deplacement bas //
                player.setVelocityY(200);
            }

            if(paddle.Y && playerPdv < 5 && scoreGateau >= 1){ // Appuyer sur la touche Y (manette) permet de se soigner si on a un gateau //
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
           if(paddle.A){ // Appuyer sur la touche A (manette) permet de passer les dialogues //
                if (oniDisc == true){
                    DialogueOni();
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
            if (player.direction == 'left') {  // determine la direction du joueur //
                coefDir = -1; 
            } else { 
                coefDir = 1
            }
            bullet = groupeBullets.create(player.x + (25 * coefDir), player.y - 4, 'carte');// permet de cr??er la carte ?? cot?? du joueur //
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

function hitCarte (bullet) {// si la carte touche un ??l??ment de decor elle est d??truite //
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

function killBoss () {  // Si le boss est touch?? par une carte il perd un point de vie //
    if(bossInvulne == false){
        pdvBoss -= 1;
        bullet.destroy();
    }
    bossInvulne = true;
    if(pdvBoss <= 0){ // Si il n'a plus de points de vie, il disparait et drop un item //
        etat_boss = false;
        if (etat_boss == false){
            boss_cerveau.destroy();
            cle2.setAlpha(1);
            cle2.setX(boss_cerveau.x);
            cle2.setY(boss_cerveau.y);
            visibleCle2 = true;
            oni.setAlpha(1);
            dialogue_01.setAlpha(1);
            oniDisc = true;
        }
    }
}

// permet le drop d'item //

function dropCle2(){
    if(visibleCle2 == true && cle2Drop == true){
        scoreCle += 1;
        cle2.destroy();
        texte_cle.setText(scoreCle);
        cle2Drop = false;
    }
}

function dropCarte3(){
    nbCarte += 6;
    texte_carte.setText(nbCarte);
    carte3.destroy();
    lanceCarte = true;
    etat_carte3 = false;
}
// Dialogue PNJ //

function DialogueOni(){
    if(etat_boss == false && dialogue01 == true){
        dialogue_01.setAlpha(0);
        dialogue_02.setAlpha(1);
        dialogue01 = false;
    }
    else if(scoreCle == 2 && entree_tente == false && dialogue01 == false){  // si le joueur a les 2 cl??s il peut acc??der au "donjon" //
        scoreCle -= 2;
        texte_cle.setText(scoreCle);
        entree_tente = true;
        dialogue_02.setAlpha(0);
        dialogue_03.setAlpha(1);
    }
}

