import Phaser from "phaser";

export function addPlayerOverlap(self) {
    if (checkOverlap(self.player, self.rectangleTrigger)) {
        if (!self.trigger) {
            drawbattleShadow(self);
        }
        self.trigger = true;
    }
    else {
        self.trigger = false;
        self.drawbattleGroup.clear(true);
    }
    if (checkOverlap(self.player, self.machineTrigger)) {
        if (!self.trigger1) {
            musicMachineShadow(self);
        }
        self.trigger1 = true;
    }
    else {
        self.trigger1 = false;
        if (self.musicMachineShadowGroup) self.musicMachineShadowGroup.clear(true);
    }
}

function drawbattleShadow(self) {
    let x = 200;
    let y = 650;
    let w = 130;
    let h = 60;
    self.drawbattleGroup.add(self.add.rectangle(0, y + 500, 2000, 950, 0x000000).setAlpha(0.4));
    self.drawbattleGroup.add(self.add.rectangle(0, y - 145, 2000, 200, 0x000000).setAlpha(0.4));
    self.drawbattleGroup.add(self.add.rectangle(0, y - 10, 270, h + 10, 0x000000).setAlpha(0.4));
    self.drawbattleGroup.add(self.add.rectangle(x + w + 175, y - 10, 500, h + 10, 0x000000).setAlpha(0.4));
    self.drawbattleGroup.add(self.add.image(180, 650, 'play-button').setScale(0.1).setAlpha());
    self.drawbattleGroup.add(self.add.text(150, 700, 'PRESS X', { fill: "#ffffff" }));

}

function musicMachineShadow(self) {
    let x = 225;
    let y = 680;
    self.musicMachineShadowGroup.add(self.add.image(x + 30, y - 40, 'comment').setScale(0.2));
    self.musicMachineShadowGroup.add(self.add.text(x - 9, y - 60, 'PRESS X\nTO INTERACT', { fontSize: "60px", fill: "#000000" }).setScale(0.2));
}