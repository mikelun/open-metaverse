export function dobbyLevel0(self, Moralis) {
    // MAKE GROUP FOR LEVEL
    self.levelGroup = self.add.group();

    // TEXT
    var text = 'Hello from OpenMetaverse!\nHere you can chat and chill with other players\nIf you want to say something, we need your microphone access\n';
    self.label = self.add.text(200, 200, '', { fill: "#ffffff", fontSize: "24px"});
    self.levelGroup.add(self.label);
    self.typeTextWithDelay(text);

    // BUTTON WITH ALLOW TEXT
    self.button1 = self.rexUI.add.label({
        background: self.add.image(0, 0, 'background-button'),
        text: self.add.text(0, 0, 'ALLOW', { fill: "#000000", fontSize: "24px" }),
        space: {
            left: 90,
            right: 90,
            top: 20,
            bottom: 30
        }
    }).layout().setPosition(325, 350).setAlpha(0);

    // BUTTON WITH "NO, CONTINUE" TEXT
    self.button2 = self.rexUI.add.label({
        background: self.add.image(0, 0, 'background-button'),
        text: self.add.text(0, 0, 'NO, CONTINUE', { fill: "#000000", fontSize: "24px" }),
        space: {
            left: 40,
            right: 40,
            top: 20,
            bottom: 30
        }
    }).layout().setPosition(325, 420).setAlpha(0);

    // SET BUTTONS INTERCTIVE
    self.button1.setInteractive().on('pointerdown', () => {
        if (self.step != 0) return;
        try {
            navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
                self.stream = stream;
                localStorage.setItem('microphone', 'true');
                self.step = 1;
                self.showCurrentLevel();
            });
        } catch (e) {
            alert("YOUR MICROPHONE DOESN'T WORKING! " + e);
        }
    });

    self.button2.setInteractive().on('pointerdown', () => {
        if (self.step != 0) return;
        self.step = 1;
        self.stream = null;
        self.showCurrentLevel();
    });

}

export function dobbyLevel1(self, Moralis) {
    // MAKE GROUP FOR LEVEL
    self.levelGroup = self.add.group();

    // TEXT
    var text = "It's Tha Doberman Gang room. You can enter without metamask";
    self.label = self.add.text(250, 250-30, '', { fill: "#ffffff", fontSize: "24px", align: "center" });
    self.levelGroup.add(self.label);
    self.typeTextWithDelay(text);
    
    self.dobby = self.add.image(650, 500, 'dobby').setScale(0.6);
    self.levelGroup.add(self.dobby);

    self.header = self.add.text(400, 60, 'Tha Doberman Gang', { fill: "#ffffff", fontSize: "48px", fontFamily: "PixelFont", align: "center" });
    self.levelGroup.add(self.header);

    // BUTTON WITH CONNECT TEXT
    self.button1 = self.rexUI.add.label({
        background: self.add.image(0, 0, 'background-button'),
        text: self.add.text(0, 0, 'CONTINUE', { fill: "#000000", fontSize: "24px"}),
        space: {
            left: 100,
            right: 100,
            top: 20,
            bottom: 30
        }
    }).layout().setPosition(600, 370-30).setAlpha(0);

    self.button1.setInteractive().on('pointerdown', () => {
        if (self.step != 1) return;
        self.step = 2;
        self.showCurrentLevel();
        }
    );

}
