export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'PreloadScene',
            active: true,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            },
        });
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

        this.load.tilemapTiledJSON('9', 'assets/tiles/default-room.json');

        this.load.tilemapTiledJSON('10', 'assets/tiles/10.json');

        // LOADING COFFEEBAR MAP
        this.load.image('Bakery', 'assets/tiles/Bakery-extruded.png');
        this.load.image('Interior', 'assets/tiles/Interior-extruded.png');
        this.load.tilemapTiledJSON('cafe', 'assets/tiles/cafe.json');

    }


    loadMonsters() {
        this.load.spritesheet('monster1', 'assets/monsters/monster1.png', { frameWidth: 81.5, frameHeight: 69 });

        this.load.spritesheet('monster2-walk', 'assets/monsters/monster2-walk.png', { frameWidth: 118, frameHeight: 136, });
        this.load.spritesheet('monster2-die', 'assets/monsters/monster2-die.png', { frameWidth: 118, frameHeight: 136, });



    }
    loadWeapons() {
        const guns = ['p90', 'mp7', 'boom', 'smg_01', 'smg_02', 'smg_03', 'smg_04', 'smg_05', 'smg_06'];
        guns.forEach(gun => {
            this.load.image(gun, `assets/weapons/guns/${gun}.png`);
        });



        this.load.spritesheet('bullet-effect-1', 'assets/weapons/effects/bullet-effect-1.png', { frameWidth: 16, frameHeight: 16, });
        this.load.spritesheet('bullet-effect-2', 'assets/weapons/effects/bullet-effect-2.png', { frameWidth: 32, frameHeight: 32 })
        this.load.spritesheet('bullet-spritesheet-1', 'assets/weapons/effects/bullet-spritesheet-1.png', { frameWidth: 32, frameHeight: 32, });
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
        this.load.image('music-on', 'assets/game-ui/new-ui/music-on.png');
        this.load.image('music-off', 'assets/game-ui/new-ui/music-off.png');
        this.load.image('buy-button', 'assets/game-ui/new-ui/buy-button.png');
        this.load.image('shop-panel', 'assets/game-ui/new-ui/shop-panel.png');
        this.load.image('cell-shop', 'assets/game-ui/new-ui/cell-shop.png');
        this.load.image('home-button', 'assets/game-ui/new-ui/home-button.png');
        this.load.image('build-button', 'assets/game-ui/new-ui/build-button.png');
        this.load.image('remove-button', 'assets/game-ui/new-ui/remove-button.png');
        this.load.image('google-button', 'assets/game-ui/new-ui/google-button.png');
        this.load.image('add-icon', 'assets/game-ui/new-ui/add-icon.png');
        this.load.image('copy-link-button', 'assets/game-ui/new-ui/copy-link-button.png');

    }


    loadRoomImages() {
        this.load.image('room1', 'assets/room-images/room1.png');
        this.load.image('room2', 'assets/room-images/room2.png');
    }
    loadTilesForEditHome() {
        this.load.spritesheet('spritesheet-TilemapDay', 'assets/tiles/TilemapDay.png', { frameWidth: 32, frameHeight: 32, });
    }
    loadCoins() {
        this.load.spritesheet('coin1', 'assets/coins/coin1.png', {
            frameWidth: 20,
            frameHeight: 20,
        });
    }

    loadArtifacts() {
        this.load.spritesheet('goose', 'assets/artifacts/goose.png', { frameWidth: 1200, frameHeight: 1200, })
        this.load.spritesheet('chests', 'assets/artifacts/chests.png', { frameWidth: 48, frameHeight: 32, })
        this.load.image('chest1', 'assets/artifacts/chest1.png');
        this.load.image('chest2', 'assets/artifacts/chest2.png');
        this.load.image('chest3', 'assets/artifacts/chest3.png');
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

    loadEffects() {
        this.load.spritesheet('effect1', 'assets/effects/effect1.png', { frameWidth: 192, frameHeight: 192, })
        this.load.spritesheet('effect2', 'assets/effects/effect2.png', { frameWidth: 192, frameHeight: 192, })
        this.load.spritesheet('effect3', 'assets/effects/effect3.png', { frameWidth: 192, frameHeight: 192, })
        this.load.spritesheet('effect4', 'assets/effects/effect4.png', { frameWidth: 192, frameHeight: 192, })
        this.load.spritesheet('effect5', 'assets/effects/effect5.png', { frameWidth: 192, frameHeight: 192, })
        this.load.spritesheet('effect6', 'assets/effects/effect6.png', { frameWidth: 192, frameHeight: 192, })
        this.load.spritesheet('effect7', 'assets/effects/effect7.png', { frameWidth: 192, frameHeight: 192, })
        this.load.spritesheet('effect8', 'assets/effects/effect8.png', { frameWidth: 192, frameHeight: 192, })
    }

    loadEmotions() {
        for (let i = 1; i <= 13; i++) {
            this.load.spritesheet(`emotion${i}`, `assets/emotions/${i}.png`, { frameWidth: 32, frameHeight: 32 })
        }

        this.load.image('emotions-wheel', 'assets/emotions/emotions-wheel.png');
    }

    loadNPCs() {
        this.load.spritesheet('witch-kitty-idle', 'assets/characters/npcs/witch-kitty-idle.png', { frameWidth: 64, frameHeight: 64, });
    }
    preload() {
        this.loadNPCs();
        this.loadUI();
        this.loadPlanets();
        this.loadMaps();
        this.loadWeapons();
        this.loadMonsters();
        this.loadCoins();
        this.loadArtifacts();
        this.loadSoundFX();
        this.loadEffects();
        this.loadTilesForEditHome();
        this.loadRoomImages();
        this.loadEmotions();

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
            frameHeight: 512
        });

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
        this.load.spritesheet('fire-effect', 'assets/effects/fire-effect.png', { frameWidth: 100, frameHeight: 100 });


        // LOAD ICONS
        this.load.spritesheet('icons', 'assets/game-ui/icons.png', {
            frameWidth: 16,
            frameHeight: 16,
            margin: 8,
            spacing: 8
        });

        var progressBox = this.add.graphics();
        var progressBar = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(250, 280, 740, 30);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: 'LOADING...',
            style: {
                font: '35px PixelFont',
                fill: '#9933CC'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 + 40,
            text: '0%',
            style: {
                font: '24px PixelFont',
                fill: '#9933CC'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 100,
            text: '',
            style: {
                font: '24px PixelFont',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x9933CC, 1);
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