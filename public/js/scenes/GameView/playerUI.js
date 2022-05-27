import { randColor } from "../../socketController/playerSocket";
import { createTalkingEffect } from "./addEffectToPlayer";

export function createPlayerUI(self, playerInfo) {
    const textColor = randColor();
    
    let microphoneTexture = playerInfo.microphoneStatus ? "microphone1" : "microphone1-off";
    let headphonesTexture = playerInfo.deafen ? "headphones-off" : "headphones";

    const background = self.rexUI.add.roundRectangle(0 - 0.25, 0 - 5, playerInfo.playerName.length * 5 + 5, 8, 6, 0x000000).setAlpha(0.5);
    const playerText = self.add.text(0, -7, playerInfo.playerName, { fontSize: '125px', fontFamily: 'PixelFont', fill: textColor, align: 'center' }).setScale(0.1).setOrigin(0.5);
    const microphone = self.add.image(-4, -15, microphoneTexture).setScale(0.25);
    const headphones = self.add.image(4, -14, headphonesTexture).setScale(0.25);
    const talkingEffect = createTalkingEffect(self, 0, 20);
    const container = self.add.container(0, 0, [background, playerText, microphone, headphones, talkingEffect]);

    container.setDepth(26);
    return container;
}

/**
 * IN CONTAINTER
 * 0 - background
 * 1 - playerText
 * 2 - microphone
 * 3 - headphones
 * 4 - talkingEffect
 * 5 - weapon
 */
export function updatePlayerUI(self, playerInfo) {
    const container = self.playerUI[playerInfo.playerId];
    console.log('Updated playerInfo');

    if (container) {
        const background = container.getAt(0);
        const playerText = container.getAt(1);
        playerText.setText(playerInfo.playerName);

        background.width = playerInfo.playerName.length * 5 + 5;

        const microphone = container.getAt(2);
        const headphones = container.getAt(3);
        microphone.setTexture(playerInfo.microphoneStatus ? "microphone1" : "microphone1-off");
        headphones.setTexture(playerInfo.deafen ? "headphones-off" : "headphones");
        const weapon = container.getAt(5);
        if (weapon) {
            weapon.setTexture(playerInfo.weapon.texture);
        }
    }
}


export function getWeaponFromUI(playerUI) {
    const weapon = playerUI.getAt(5);
    
    return weapon;
}

export function updateTalkingEffect(self, isTalking, playerId) {
    if (!self.playerUI[playerId]) return;

    const talkingEffect = self.playerUI[playerId].getAt(4);
    talkingEffect.setAlpha(isTalking ? 1 : 0);
}