export function addEffect(self, x, y, type) {
    var key;

    if (type == 'host') {
        key = 'effect7';
    }
    if (type == 'talking') {
        key = 'effect1';
    }

    const effect = self.add.sprite(x, y, key);
    createAnim(self, key);
    effect.play(key);
    return effect;
}

function createAnim(self, key) {
    if (self.anims.get(key)) return;

    self.anims.create({
        key: key,
        frames: self.anims.generateFrameNumbers(key, { start: 0, end: 14 }),
        frameRate: 10,
        repeat: -1
    });
}