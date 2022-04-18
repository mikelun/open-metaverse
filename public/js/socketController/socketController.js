import { initializeAudio, removePeer } from '../socketController/audioSocket';
import { initializePlayersSocket } from '../socketController/playerSocket';
import { currentPlayerDisconnected } from '../socketController/playerSocket';
import { connect } from './ws';

/**
 * Initialize socket and connect to server by socket.io
 */
export async function initializeSocket(self, peers) {

    self.socket = await connect();

    // Initialize audio stream for socket
    initializeAudio(self.socket, peers, self);

    // Initialize player socket
    initializePlayersSocket(self, peers);

    self.socket.emit('addPlayer', self.address);

    self.socket.on('playerExists', () => {
        self.cameras.main.shake(500, 0.01);
        self.add.rectangle(0, 0, 5000, 5000, 0x000000).setAlpha(0.5);
        self.add.text(330, 300, "You have been logged in!\nPlease close other tab with this metaverse\nand reset the page", { fontSize: "30px", fill: "#ffffff", align: "center", fontFamily: "PixelFont"});
    });

    // IF PLAYER DISCONNECTED
    self.socket.on('disconnect', () => {
        self.errors = self.add.group();
        self.errors.add(self.add.rectangle(0, 0, 2000, 2000, 0x000000).setOrigin(0, 0).setAlpha(0.5));
        self.errors.add(self.add.text(self.player.x - 250, self.player.y - 100, 'Trying to reconnect...\n\nPlease check your internet\nconnection', { fontSize: '32px', fill: '#fff' }));
        const playerUI = self.playerUI[self.player.id];
        currentPlayerDisconnected(self.player.id);
        playerUI.playerText.destroy();
        playerUI.microphone.destroy();
        self.player.destroy();
        self.player = null;
        self.otherPlayers.getChildren().forEach(otherPlayer => {
            self.playerUI[otherPlayer.playerId].playerText.destroy();
            self.playerUI[otherPlayer.playerId].microphone.destroy();
            otherPlayer.destroy();
        });
        self.talkRectangle.destroy();
    })
}

