import { closeAllPanels, makeButtonInteractive } from "./lowButttons";

var self;

export function createShopPanel(newSelf) {
    self = newSelf;

    self.shopPanelGroup = self.add.group();

    const panel = self.add.image(340, 80, 'shop-panel').setOrigin(0, 0).setScale(2.5);
    const headerInventoryText = self.add.text(panel.x + 300, panel.y + 60, 'SHOP', { fontFamily: 'PixelFont', fontSize: '48px', color: '#ffffff' }).setOrigin(0.5, 0.5);

    const closeButton = self.add.image(panel.x + 570, panel.y + 0, 'close-button').setOrigin(0, 0).setScale(2).setAlpha(0.8);

    makeButtonInteractive(closeButton, 'CLOSE', 40, 0, true);

    closeButton.on('pointerdown', () => {
        closeAllPanels();
    });

    createCells();

    self.shopPanelGroup.add(panel);
    self.shopPanelGroup.add(headerInventoryText);
    self.shopPanelGroup.add(closeButton);

    self.shopPanelGroup.setVisible(false);

}


function createCells() {
    createCell(0 * 180 + 380, 230, 1, 1000);
    createCell(1 * 180 + 380, 230, 2, 10000);
    createCell(2 * 180 + 380, 230, 3, 50000);
}

function createCell(x, y, chestType, price) {
    const cellBackground = self.add.image(x, y, 'cell-shop').setOrigin(0, 0).setScale(2.5);

    const buyButton = self.add.image(x, y + 220, 'buy-button').setOrigin(0, 0).setScale(2.5).setAlpha(0.8);

    makeButtonInteractive(buyButton, 'BUY', 80, 70);
    const coinImage = self.add.image(x + 15, y + 235, 'coin1').setOrigin(0, 0).setScale(1.5);
    const priceText = self.add.text(x + 50, y + 228, `${price}`, { fontFamily: 'PixelFont', fontSize: '34px', color: '#ffffff' }).setOrigin(0, 0);

    const backgroundEffect = self.add.sprite(x - 10, y + 10, 'background-lighting').setOrigin(0, 0).setScale(0.7);
    // set blue tint
    
    if (chestType == 1) {
        backgroundEffect.setTint(0xffffff);
    } else if (chestType == 2) {
        backgroundEffect.setTint(0x00ffff);
    } else {
        backgroundEffect.setTint(0xff77aa);
    }
    backgroundEffect.setAlpha(1);
    // backgroundEffect.play('background-lighting');


    const chest = self.add.image(x + 30, y + 50, `chest${chestType}`).setOrigin(0, 0).setScale(3);

    self.shopPanelGroup.add(cellBackground);
    self.shopPanelGroup.add(buyButton);
    self.shopPanelGroup.add(coinImage);
    self.shopPanelGroup.add(priceText);
    self.shopPanelGroup.add(backgroundEffect);
    self.shopPanelGroup.add(chest);

}
