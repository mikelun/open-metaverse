import { changeMap } from "../../scenes/GameView/changeMap";
import { connectToOtherMap } from "../../scenes/GameView/connectToMap";
import { addAudioTimer } from "../../utils/addAudioTimer";
import { addIframeGameAndMusicMachine } from "../../utils/addIframeGameAndMusicMachine";
import { addPlayerOverlap, checkOverlap } from "../../utils/playerOverlap";
import { addAnimationForMap } from "../AnimatedTile";
import { showMap } from "../showMap";
import { clearMapWithTransition, startMapTransition } from "./maps-utils";


// main map
var cafe;

// all lights on map
var lights = [];

// entrances
var entrances = [];
var entranceMapId;

var blackoutRectangle;

var effects = [];

var spaceKey;

var wallsCollider;

var mapCleared = false;


export function addMap4(self) {
    mapCleared = false;
    spaceKey = false;
    
    cafe = self.make.tilemap({ key: 'cafe' });
    const tilemapDayTileset = cafe.addTilesetImage('TilemapDay', 'tiles');
    const bakeryTileset = cafe.addTilesetImage('Bakery', 'Bakery', 32, 32, 1, 2);
    const interiorTileset = cafe.addTilesetImage('Interior', 'Interior', 32, 32, 1, 2);
    const deepwaterTileset = cafe.addTilesetImage('Animated_Deepwater', 'Animated_Deepwater', 48, 48, 1, 2);

    // Create layers and collides for physics
    self.layer1.add(cafe.createStaticLayer('floor', [tilemapDayTileset, bakeryTileset, interiorTileset, deepwaterTileset]));
    self.layer1.add(cafe.createStaticLayer('objects', [tilemapDayTileset, bakeryTileset, interiorTileset]));
    self.layer1.add(cafe.createStaticLayer('objects-2', [tilemapDayTileset, bakeryTileset, interiorTileset]));
    self.layer1.add(cafe.createStaticLayer('objects-3', [bakeryTileset, tilemapDayTileset]));
    self.layer1.add(cafe.createStaticLayer('walls', bakeryTileset));
    self.layer1.add(cafe.createStaticLayer('walls-2', bakeryTileset));

    self.invisibleWalls = cafe.createLayer('invisibleWalls', interiorTileset).setCollisionByProperty({ collides: true });;
    self.invisibleWalls.setVisible(false);


    // add animation for tileset day
    addAnimationForMap(self, cafe, tilemapDayTileset);

    blackoutRectangle = self.add.rectangle(0, 0, 10000, 100000, 0x000000, 0.3);

    addLightsToMap(self);

    effects.push(addEffect(self, 670, 1115, 'fire-effect'));
    effects.push(addEffect(self, 800, 1115, 'fire-effect'));
    effects.push(addEffect(self, 925, 1115, 'fire-effect'));

    effects.forEach(effect => {
        effect.setDepth(50);
    })

    self.caffeinumText = self.add.text(320, 1443, 'caffeinum.', { fontSize: '26px', fill: '#ffffff', fontFamily: 'PixelFont' }).setAlpha(1);
    self.layer1.add(self.caffeinumText);

    entrances.push({ entrance: self.add.rectangle(544, 1483, 60, 40, 0x00cccc), mapId: 6 });
    self.layer1.add(entrances[0].entrance);

    startMapTransition(self, [lights, entrances, effects]);

    // if space touched
    var spaceDown = self.input.keyboard.on('keydown-SPACE', function (event) {
        if (mapCleared) return;
        if (entranceMapId && !spaceKey) {
            spaceKey = true;
            changeMap(self, {mapId: entranceMapId});
        }

    });
}

// add physics when player added to map
export function addPhysicsForMap4(self) {
    wallsCollider = self.physics.add.collider(self.player, self.invisibleWalls);
}

function addEffect(self, x, y, name) {
    let effect = self.add.sprite(x, y, name);
    // add animation for effect
    // if animation exist
    if (self.anims.get(name)) {
        effect.play(name);
    } else {
        self.anims.create({
            key: name,
            frames: self.anims.generateFrameNumbers(name, { start: 0, end: 60 }),
            frameRate: 30,
            repeat: -1
        });
        effect.play(name);
    }
    return effect;
}
function addLightsToMap(self) {
    const warmLight = { r: 255, g: 160, b: 0 };
    lights.push(createLight(self, 700, 430, warmLight));
    lights.push(createLight(self, 800, 430, warmLight));
    lights.push(createLight(self, 900, 430, warmLight));


    const purpleLightColor = { r: 102, g: 0, b: 153 };
    const blueLightColor = { r: 0, g: 0, b: 230 };
    const orangeLightColor = { r: 255, g: 40, b: 0 };
    lights.push(createLight(self, 623, 602 + 50, blueLightColor, 0.1, 200));
    lights.push(createLight(self, 746, 602, orangeLightColor, 0.05, 200));
    lights.push(createLight(self, 875, 602, blueLightColor, 0.1, 200));
    lights.push(createLight(self, 1007, 602 + 50, warmLight, 0.05, 200));

    lights.push(createLight(self, 622, 892 - 50, warmLight, 0.05, 200));
    lights.push(createLight(self, 746, 892, blueLightColor, 0.1, 200));
    lights.push(createLight(self, 885, 892, orangeLightColor, 0.05, 200));
    lights.push(createLight(self, 1000, 892 - 50, blueLightColor, 0.1, 200));

    // lights for computers
    self.computerLight1 = createLight(self, 1059, 1123, blueLightColor);
    lights.push(self.computerLight1);
    self.computerLight2 = createLight(self, 1059, 1203, purpleLightColor);
    lights.push(self.computerLight2);

    self.blueLight = createLight(self, 400, 860, purpleLightColor, 0.1);
    lights.push(self.blueLight);
    self.purpleLight = createLight(self, 650, 860, blueLightColor, 0.1);
    lights.push(self.purpleLight);

    // lights for fire
    lights.push(createLight(self, 670, 1124, orangeLightColor, 0.05, 200));
    lights.push(createLight(self, 793, 1124, orangeLightColor, 0.05, 200));
    lights.push(createLight(self, 923, 1124, orangeLightColor, 0.05, 200));


    const cafeLightColor = { r: 204, g: 204, b: 204 };
    // lights for the first cafe
    lights.push(createLight(self, 340, 1007, warmLight, 0.05));
    lights.push(createLight(self, 416, 1189, warmLight, 0.02));
    lights.push(createLight(self, 264, 1191, warmLight, 0.02));

    lights.push(createLight(self, 418, 1281, warmLight, 0.05));

    lights.push(createLight(self, 436, 1452, warmLight, 0.02));
    lights.push(createLight(self, 307, 1452, warmLight, 0.02));

    lights.push(createLight(self, 562, 1452, warmLight, 0.02));

    //createLight(self, 239, 1178, cafeLightColor, 0.02);
}
export function createLight(self, x, y, color, intensity = 0.05, radius = 200) {
    let light = self.add.pointlight(x, y, 40, radius, intensity);

    light.color.setTo(color.r, color.g, color.b);

    return light;
}


export function addUpdateForMap4(self, time, delta) {

    // animate entrances
    entrances.forEach(object => {
        object.entrance.alpha = (Math.sin(self.time.now / 500) * 0.4);
        if (self.player) {
            // if (checkOverlap(self.player, object.entrance)) {
            //     entranceMapId = object.mapId;
            // } else if (entranceMapId === object.mapId) {
            //     entranceMapId = null;
            //     spaceKey = false;
            // }
        }
    });

    // // animate blue light
    if (self.blueLight && self.purpleLight && self.computerLight1 && self.computerLight2) {
        self.blueLight.x = 802 - Math.cos(time / 1000) * 100;
        self.blueLight.y = 703 - Math.sin(time / 1000) * 100;

        // animate purple light
        self.purpleLight.x = 802 + Math.cos(time / 1000) * 100;
        self.purpleLight.y = 703 + Math.sin(time / 1000) * 100;

        // add ficker to computer light
        self.computerLight1.intensity = 0.1 + Math.sin(time / 150) * 0.03;
        self.computerLight2.intensity = 0.1 + Math.sin(time / 150) * 0.03;
    }
}

export function clearMap4(self) {
    mapCleared = true;

    if (wallsCollider) wallsCollider.destroy();
    if (cafe) cafe.destroy();

    lights.forEach(light => {
        light.destroy();
    });
    
    entrances.forEach(entrance => {
        entrance.entrance.destroy();
    }); 
    
    effects.forEach(effect => {
        effect.destroy();
    });

    blackoutRectangle.destroy();
    
    self.caffeinumText.destroy();

    lights = [];
    entrances = [];
    self.spaceKey = false;
    effects = [];

    self.input.keyboard.removeKey('SPACE');

    // remove space event
    // start new map
    //connectToOtherMap(self);
}