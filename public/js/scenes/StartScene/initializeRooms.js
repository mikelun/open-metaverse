import { buildship } from "./projects/buildship/buildship";
import { coffeebar } from "./projects/coffeebar/coffeebar";
import { cryptoDuckies } from "./projects/crypto-duckies/cryptoDuckies";
import { defaultLevel0, defaultLevel1 } from "./default-levels/defaultLevels";
import { guestLevel1 } from "./projects/Guest/guest";

const rooms = {
    "buildship": buildship,
    "crypto-duckies": cryptoDuckies,
    "coffeebar": coffeebar
};
export function initializeRooms(self) {
    var room = window.location.href.split('/');
    self.room = room[room.length - 1];

    // check if room in rooms
    if (rooms[self.room]) {
        self.levels = [defaultLevel0, defaultLevel1, rooms[self.room]];
    } else {
        self.room = "coffeebar";
        self.levels = [defaultLevel0, defaultLevel1, coffeebar];
    }

}