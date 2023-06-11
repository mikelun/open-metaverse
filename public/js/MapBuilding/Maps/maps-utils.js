import { clearMap } from "../showMap";

export function clearMapWithTransition(self) {
    self.slowTransition = self.add.rectangle(0, 0, 10000, 10000, 0x000000).setAlpha(0);
    self.slowTransition.setDepth(101);
    // add timer while slow Transition alpha < 1
    const timer = self.time.addEvent({
        delay: 10,
        callback: () => {
            self.slowTransition.alpha += 0.03;
            if (self.slowTransition.alpha >= 1) {
                clearMap(self);
                self.slowTransition.destroy();
                timer.destroy();
            }
        },
        callbackScope: self,
        loop: true
    });
}

export function startMapTransition(self, arrayLights) {
    arrayLights.forEach(lights => {
        lights.forEach(light => {
            if (light.alpha) {
                light.alpha = 0;
            }
        });
    });
    const slowTransition = self.add.rectangle(0, 0, 10000, 10000, 0x000000).setAlpha(1);
    slowTransition.setDepth(101);
    // add timer while slow Transition alpha < 1
    const time1 = self.time.addEvent({
        delay: 100,
        callback: () => {
            self.layer2.add(slowTransition);
            const timer = self.time.addEvent({
                delay: 10,
                callback: () => {
                    arrayLights.forEach(lights => {
                        lights.forEach(light => {
                            light.alpha += 0.03;
                        });
                    })
                    slowTransition.alpha -= 0.03;
                    if (slowTransition.alpha <= 0) {
                        slowTransition.destroy();
                        timer.destroy();
                    }
                },
                callbackScope: self,
                loop: true
            });
        }
    })
}