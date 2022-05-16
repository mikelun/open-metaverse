export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' })
    }

    // LOAD YOUR PLANET SPRITE
    loadPlanets() {
        // coffeebar-planet
        this.load.spritesheet('coffeebar-planet', 'assets/projects/coffeebar/coffeebar-planet.png', {
            frameWidth: 50,
            frameHeight: 50,
        });

        // buildship-planet
        this.load.spritesheet('buildship-planet', 'assets/projects/buildship/buildship-planet.png', {
            frameWidth: 50,
            frameHeight: 50,
        });

        // crypto-duckies-planet
        this.load.spritesheet('crypto-duckies-planet', 'assets/projects/crypto-duckies/crypto-duckies-planet.png', {
            frameWidth: 50,
            frameHeight: 50,
        });
        
        // crypto-duckies-planet
        this.load.spritesheet('moonbirds-planet', 'assets/projects/moonbirds/moonbirds-planet.png', {
            frameWidth: 50,
            frameHeight: 50,
        });

    }

    loadMaps() {
        // for moonbirds planet
        this.load.tilemapTiledJSON('moonbirds-map', 'assets/tiles/moonbirds.json');

        // for coffeebar planet
        this.load.tilemapTiledJSON('coffeebar-map', 'assets/tiles/main-planet.json');
        this.load.image('CP_WallsA4', 'assets/tiles/cyber-punk/CP_WallsA4.png');
        this.load.image('Low-TownA5', 'assets/tiles/cyber-punk/Low-TownA5.png');
        this.load.image('Low-TownB', 'assets/tiles/cyber-punk/Low-TownB.png');
        this.load.image('Low-TownC', 'assets/tiles/cyber-punk/Low-TownC.png');
        this.load.image('Low-TownD', 'assets/tiles/cyber-punk/Low-TownD.png');
        this.load.image('Mid-TownA5', 'assets/tiles/cyber-punk/Mid-TownA5.png');
        this.load.image('Mid-TownB', 'assets/tiles/cyber-punk/Mid-TownB.png');
        this.load.image('Mid-TownC', 'assets/tiles/cyber-punk/Mid-TownC.png');
        this.load.image('Mid-TownD', 'assets/tiles/cyber-punk/Mid-TownD.png');
        this.load.image('Low-TownD', 'assets/tiles/cyber-punk/Low-TownD.png');

        // 7 map
        this.load.tilemapTiledJSON('7', 'assets/tiles/7.json');
        // 8 map
        this.load.tilemapTiledJSON('8', 'assets/tiles/8.json');
    }


    loadMonsters() {
        this.load.spritesheet('monster1', 'assets/monsters/monster1.png', {frameWidth: 81.5, frameHeight: 69});

        this.load.spritesheet('monster2-walk', 'assets/monsters/monster2-walk.png', {frameWidth: 118,frameHeight: 136, });
        this.load.spritesheet('monster2-die', 'assets/monsters/monster2-die.png', {frameWidth: 118,frameHeight: 136, });



    }
    loadWeapons() {
        this.load.image('p90', 'assets/weapons/guns/p90.png');

        this.load.spritesheet('bullet-effect-1', 'assets/weapons/effects/bullet-effect-1.png', {
            frameWidth: 16,
            frameHeight: 16,
            spacing: 0,
            margin: 0
        });
    }

    loadUI() {

        this.load.image('hud', 'assets/game-ui/HUD/hud.png');
        this.load.image('new-ui-button', 'assets/game-ui/new-ui/button.png');
        this.load.image('discord-button', 'assets/game-ui/new-ui/discord-button.png');
        this.load.image('inventory-button', 'assets/game-ui/new-ui/inventory-button.png');
        this.load.image('friends-button', 'assets/game-ui/new-ui/friends-button.png');
        this.load.image('shop-button', 'assets/game-ui/new-ui/shop-button.png');
        this.load.image('inventory-panel', 'assets/game-ui/new-ui/inventory-panel.png');
        this.load.image('chest-button', 'assets/game-ui/new-ui/chest-button.png');
        this.load.image('clothes-button', 'assets/game-ui/new-ui/clothes-button.png');
        this.load.image('close-button', 'assets/game-ui/new-ui/close-button.png');
        this.load.image('cell-panel', 'assets/game-ui/new-ui/cell-panel.png');
        this.load.image('cell-info', 'assets/game-ui/new-ui/cell-info.png');
        this.load.image('long-button', 'assets/game-ui/new-ui/long-button.png');
        this.load.image('long-button-yellow', 'assets/game-ui/new-ui/long-button-yellow.png');
        this.load.image('button-left', 'assets/game-ui/new-ui/button-left.png');
        this.load.image('button-right', 'assets/game-ui/new-ui/button-right.png');
        this.load.image('health-bar', 'assets/game-ui/new-ui/health-bar.png');
        this.load.image('experience-bar', 'assets/game-ui/new-ui/experience-bar.png');
    }

    loadCoins() {
        this.load.spritesheet('coin1', 'assets/coins/coin1.png', {
            frameWidth: 20,
            frameHeight: 20,
        });
    }

    loadArtifacts() {
        this.load.spritesheet('goose', 'assets/artifacts/goose.png', {frameWidth: 1200,frameHeight: 1200,})
    }

    loadSoundFX() {
        this.load.audio('coin1', 'assets/sounds/coin1.wav');
        this.load.audio('gun1', 'assets/sounds/gun1.wav');
        this.load.audio('gun2', 'assets/sounds/gun2.wav');
        this.load.audio('gun3', 'assets/sounds/gun3.wav');
        this.load.audio('gun4', 'assets/sounds/gun4.wav');
        this.load.audio('gun5', 'assets/sounds/gun5.wav');
        this.load.audio('gun6', 'assets/sounds/gun6.wav');
        this.load.audio('gun7', 'assets/sounds/gun7.wav');
        this.load.audio('explosion1', 'assets/sounds/explosion1.wav');
    }
    preload() {

        this.loadUI();
        this.loadPlanets();
        this.loadMaps();
        this.loadWeapons();
        this.loadMonsters();
        this.loadCoins();
        this.loadArtifacts();
        this.loadSoundFX();

        // LOAD PLANETS
        this.load.spritesheet('planet0', 'assets/planets/planet0.png', {
            frameWidth: 50,
            frameHeight: 50, 
            margin: 0,
            spacing: 0
        });

        

        // LOADING ANIMALS
        const animalsFolders = ['cat1', 'dog2'];
        for (let i = 0; i < animalsFolders.length; i++) {
            for (let j = 0; j < 2; ++j) {
                var anim = 'Walk';
                if (j === 1) anim = 'Idle';
                this.load.spritesheet(`${animalsFolders[i]}-${anim}`, `assets/animals/${animalsFolders[i]}/${anim}.png`, {
                    frameWidth: 48,
                    frameHeight: 48,
                    margin: 0,
                    spacing: 0
                });
            }
        }

        // GAME UI
        this.load.image('helm', 'assets/game-ui/helm.png');
        this.load.image('headphones', 'assets/game-ui/headphones.png');
        this.load.image('headphones-off', 'assets/game-ui/headphones-off.png');
        this.load.image('microphone1', 'assets/game-ui/microphone1.png');
        this.load.image('microphone1-off', 'assets/game-ui/microphone1-off.png');
        this.load.image('button', 'assets/game-ui/button.png');
        this.load.image('buttonpress', 'assets/game-ui/buttonpress.png');
        this.load.image('instructions', 'assets/game-ui/instructions.png');
        this.load.image('1', 'assets/game-ui/1.png');
        this.load.image('2', 'assets/game-ui/2.png');
        this.load.image('3', 'assets/game-ui/3.png');
        this.load.image('4', 'assets/game-ui/4.png');
        this.load.image('x', 'assets/game-ui/x.png');
        this.load.image('player', 'assets/game-ui/player.png');
        this.load.image('background-button', 'assets/game-ui/background-button.png')

        this.load.image('arrow', 'assets/game-ui/arrow.png');

        this.load.image('background-nfts', 'assets/game-ui/background-nfts.jpg');

        // LOAD START SCENE ELEMENTS
        this.load.image('bg-1', 'assets/game-ui/bg-1.png');
        this.load.image('bg-2', 'assets/game-ui/bg-2.png');
        this.load.image('press-enter-text', 'assets/game-ui/press-enter-text.png');
        this.load.spritesheet('thunder', 'assets/thunder.png', {
            frameWidth: 64,
            frameHeight: 64,
            margin: 0,
            spacing: 0
        });

        // LOAD PROGRESS BAR
        this.load.spritesheet('loading', 'assets/game-ui/loading.png', {
            frameWidth: 512,
            frameHeight: 512});

        // LOADING MAIN DAY MAP
        this.load.image('tiles', 'assets/tiles/TilemapDay.png');
        this.load.tilemapTiledJSON('dungeon', 'assets/tiles/map-bar.json');

        // LOADING NIGHT MAP
        this.load.image('tiles-night', 'assets/tiles/TilemapNight.png');
        this.load.tilemapTiledJSON('map-night-home', 'assets/tiles/map-night-home.json');

        // LOAD SURF VIBE MAP
        //this.load.image('3_frame_animated_shoreline_and_cliffs', 'assets/tiles/surf-tiles/3_frame_animated_shoreline_and_cliffs.png');
        
        this.load.image('Animated_Doors', 'assets/tiles/surf-tiles/Animated_Doors_Extruded.png');
        this.load.image('Animated_Netting', 'assets/tiles/surf-tiles/Animated_Netting_Extruded.png');
        this.load.image('Animated_Pier', 'assets/tiles/surf-tiles/Animated_Pier_Extruded.png');
        this.load.image('Animated_Shore', 'assets/tiles/surf-tiles/Animated_Shore_Extruded.png');
        this.load.image('Animated_Deepwater', 'assets/tiles/surf-tiles/Animated_Deepwater_Extruded.png');
        this.load.image('MainTileMap', 'assets/tiles/surf-tiles/MainTileMap_Extruded.png');
        this.load.image('Animated_Boats', 'assets/tiles/surf-tiles/Animated_Boats_Extruded.png');
        this.load.image('Animated_Cliffs', 'assets/tiles/surf-tiles/Animated_Cliffs_Extruded.png');
        this.load.image('Animated_Dolphin', 'assets/tiles/surf-tiles/Animated_Dolphin.png');
        this.load.tilemapTiledJSON('surf-vibe', 'assets/tiles/surf-vibe.json');
        // END LOADING SURF VIBE MAP

        // LOADING COFFEEBAR MAP
        this.load.image('Bakery', 'assets/tiles/Bakery.png');
        this.load.image('Interior', 'assets/tiles/Interior.png');
        this.load.tilemapTiledJSON('cafe', 'assets/tiles/cafe.json');

        this.load.image('play-button', 'assets/game-ui/button-play.png');

        this.load.image('microphone', "assets/game-ui/microphone.png");
        this.load.image('microphoneMuted', "assets/game-ui/mute.png");
        this.load.image('x-button', "assets/game-ui/x-button.png");
        this.load.image('pixel-box', "assets/game-ui/pixel-box.png");
        // this.load.image('volume',"assets/game-ui/high-volume.png");
        this.load.image('machine', 'assets/machine.png');
        this.load.image('retro-background', "assets/retro-background.jpeg");

        this.load.image('comment', 'assets/game-ui/comment.png');

        this.load.image('ball', 'assets/ball.png');



        // THIS LOAD BUILDSHIP
        this.load.image('buildship', 'assets/projects/buildship/buildship.png');
        

        

        // LOAD TWITTER
        this.load.image('twitter', 'assets/game-ui/twitter.png');

        // LOAD GITHUB
        this.load.image('github', 'assets/game-ui/github.png');


        // LOAD SHADOW
        this.load.image('shadow', 'assets/shadow.png');

        // LOAD DISCORD ICON
        this.load.image('discord', 'assets/game-ui/discord.png');

        // LOAD SNOW PARTICLE
        this.load.image('snow-particle', 'assets/snow.png');
        // !!! LOAD EFFECTS
        this.load.spritesheet('fire-effect', 'assets/effects/fire-effect.png', {frameWidth: 100, frameHeight: 100});


        // LOAD ICONS
        this.load.spritesheet('icons', 'assets/game-ui/icons.png', {
            frameWidth: 16,
            frameHeight: 16,
            margin: 8,
            spacing: 8
        });


        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(250, 280, 740, 30);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 + 40,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 100,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 740 * value, 30);
        });

        // this.load.on('fileprogress', function (file) {
        //     assetText.setText('Loading asset: ' + file.key);
        // });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        // LOADING CHARACTERS
        for (let i = 0; i < 33; i++) {
            this.load.spritesheet(`characters${i}`,
                `assets/characters/cats/${i}.png`,
                {
                    frameWidth: 32,
                    frameHeight: 32,
                    margin: 0,
                    spacing: 0
                });
        }

        // LOAD BACKGROUND CHARACTERS FOR NFTs Images
        this.load.spritesheet('nft-1', 'assets/characters/nft-background-characters/nft-1.png', {
            frameWidth: 16,
            frameHeight: 16,
            margin: 0,
            spacing: 0
        });

    }

    create() {
        this.scene.start('start');
    }
}