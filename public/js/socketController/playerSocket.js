import { Player } from "../characters/player";
import { OtherPlayer } from "../characters/otherPlayer";
import { sceneEvents } from '../Events/EventsCenter';
import { createParticles } from "../utils/particles";
import { addPlayer } from "./addPlayer";
// import { sendFile } from "express/lib/response";

var peers;
var playersList = [];

var self;
export function initializePlayersSocket(anotherSelf, _peers) {
    self = anotherSelf;
    peers = _peers;
    self.otherPlayers = self.physics.add.group();

    self.socket.on('currentPlayers', function (players) {

        Object.keys(players).forEach(function (id) {
            if (players[id].playerId === self.socket.id) {
                addPlayer(self, players[id]);
            } else {
                addOtherPlayers(self, players[id]);
            }
        });
        // create snow effect 
        createParticles(self);
        sceneEvents.emit('updateOnlinePlayers', playersList.length);
    });

    self.socket.on('newPlayer', function (playerInfo) {
        addOtherPlayers(self, playerInfo);
        sceneEvents.emit('updateOnlinePlayers', playersList.length);
    });

    self.socket.on('playerMoved', function (playerInfo) {
        self.otherPlayers.getChildren().forEach(function (otherPlayer) {

            if (playerInfo.playerId === otherPlayer.playerId) {
                otherPlayer.newX = playerInfo.x;
                otherPlayer.newY = playerInfo.y;
                //console.log(otherPlayer.newX, otherPlayer.x);
                //otherPlayer.setPosition(playerInfo.x, playerInfo.y);
                //otherPlayer.update(otherPlayer.x, otherPlayer.y);
            }
        });
    });

    //DISCONNECT FUNCTION ONLY HERE
    self.socket.on('disconnected', function (playerId) {
        console.log('Other player disconnected');

        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
            if (playerId === otherPlayer.playerId) {
                self.playerUI[otherPlayer.playerId].playerText.destroy();
                self.playerUI[otherPlayer.playerId].microphone.destroy();
                self.playerUI[otherPlayer.playerId].background.destroy();
                self.playerUI[otherPlayer.playerId].headphones.destroy();
                otherPlayer.destroy();
            }
        });

        for (let i = 0; i < playersList.length; i++) {
            if (playersList[i].id == playerId) {
                playersList.splice(i, 1);
            }
        }
        showPlayersToTalk()
        removePeer(playerId);
        sceneEvents.emit('updateOnlinePlayers', playersList.length);
    });

    self.socket.on('updatePlayerInfo', (playerInfo) => {
        for (let i = 0; i < playersList.length; i++) {
            if (playersList[i].id == playerInfo.playerId) {
                // change player text
                if (self.playerUI[playerInfo.playerId].playerText.text != playerInfo.playerName) {
                    self.playerUI[playerInfo.playerId].playerText.setText(playerInfo.playerName);
                    self.playerUI[playerInfo.playerId].background.width = playerInfo.playerName.length * 6;
                }
                playersList[i].name = playerInfo.playerName;

                // change mircrophone status
                playersList[i].microphoneStatus = playerInfo.microphoneStatus;

                self.playerUI[playerInfo.playerId].microphone.setTexture(playerInfo.microphoneStatus ? "microphone1" : "microphone1-off");
                self.playerUI[playerInfo.playerId].headphones.setTexture(playerInfo.deafen ? "headphones-off" : "headphones");

                playersList[i].nft = playerInfo.nft;


                if (playerInfo.textureId && playerInfo.textureId != playersList[i].textureId) {
                    // TODO: ADD FUNCTION FOR LOADING TEXTURE
                    // get otherPlayer with id
                    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                        if (playerInfo.playerId === otherPlayer.playerId) {
                            var textureFromInternet = isTextureFromInternet(playerInfo.textureId);
                            if (textureFromInternet) {
                                var type = 'crypto-duckies';
                                if (playerInfo.textureId.startsWith('https://buildship')) {
                                    type = 'moonbirds';
                                }
                                loadTexture(otherPlayer, playerInfo.textureId, type);
                            }
                        }
                    });
                }
                showPlayersToTalk()
                break;
            }
        }
    });

    self.socket.on('removeFromTalk', (playerId) => {
        // remove peer from talk
        removePeer(playerId);
    });

}

function removePeer(socket_id) {

    let videoEl = document.getElementById(socket_id)
    if (videoEl) {

        const tracks = videoEl.srcObject.getTracks();

        tracks.forEach(function (track) {
            track.stop()
        })

        videoEl.srcObject = null
        videoEl.parentNode.removeChild(videoEl)
    }
    if (peers[socket_id]) peers[socket_id].destroy()
    delete peers[socket_id]
}

//////////////////// INTERECTING WITH GAME

// DESTROYING MAIN PLAYER
export function destroyPlayer() {
    const playerUI = self.playerUI[self.player.id];
    playerUI.playerText.destroy();
    playerUI.microphone.destroy();
    if (self.playerShadwow) {
        self.playerShadow.destroy();
    }
    self.player.destroy();
    self.player = null;
}





function addOtherPlayers(self, playerInfo) {

    // define other player with 0 character
    const otherPlayer = self.add.otherPlayer(playerInfo.x, playerInfo.y, `characters${playerInfo.textureId}`, self)

    const textureFromInternet = isTextureFromInternet(playerInfo.textureId);
    if (textureFromInternet) {
        var type = 'crypto-duckies';
        if (playerInfo.textureId.startsWith('https://buildship')) {
            type = 'moonbirds';
        }
        loadTexture(otherPlayer, playerInfo.textureId, type);
    } else {
        otherPlayer.setTexture(`characters${playerInfo.textureId}`);
    }

    //const otherPlayerName = self.add.text(playerInfo.x, playerInfo.y, playerInfo.account, { fontSize: '20px', color: '#ffffff' });
    otherPlayer.playerId = playerInfo.playerId;
    otherPlayer.name = playerInfo.playerName;
    const textColor = randColor();
    let microphoneTexture = playerInfo.microphoneStatus ? "microphone1" : "microphone1-off";
    let headphonesTexture = playerInfo.deafen ? "headphones-off" : "headphones";
    self.playerUI[playerInfo.playerId] = {};

    self.playerUI[playerInfo.playerId].background = self.rexUI.add.roundRectangle(playerInfo.x, playerInfo.y - 20, playerInfo.playerName.length * 6, 15, 5, "#ffffff").setAlpha(0.5);
    self.playerUI[playerInfo.playerId].playerText = self.add.text(playerInfo.x, playerInfo.y, playerInfo.playerName, { fontSize: '50px', fontFamily: 'PixelFont', fill: textColor }).setScale(0.3)
    self.playerUI[playerInfo.playerId].microphone = self.add.image(playerInfo.x + 20, playerInfo.y, microphoneTexture).setScale(0.5);
    self.playerUI[playerInfo.playerId].headphones = self.add.image(playerInfo.x + 50, playerInfo.y, "headphones").setScale(0.5);

    self.otherPlayers.add(otherPlayer);
    self.layer1.add(otherPlayer);
    playersList.push({ name: playerInfo.playerName, microphoneStatus: playerInfo.microphoneStatus, id: playerInfo.playerId, nft: playerInfo.nft, textColor: textColor, textureId: playerInfo.textureId });
    //showPlayersToTalk()
}

export const randColor = () => {
    // get random light color
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#FFFF33', '#0099FF', '#33FFCC', '#99FFCC', '#00FF99', '#33FF66', '#33FF33', '#99FF33', '#CCFF33'];
    const rand = Math.floor(Math.random() * colors.length);
    return colors[rand];
}

export function currentPlayerDisconnected(playerId) {
    playersList = [];
    for (let socket_id in peers) {
        removePeer(socket_id)
    }
    showPlayersToTalk()
}

export function showPlayersToTalk() {
    // sort players by self.connected and playersList
    let sortedPlayersList = [];
    console.log('CONNECTED PLAYERS' + self.connected);
    playersList.forEach(player => {
        if (self.connected) {
            self.connected.forEach(otherPlayer => {
                if (player.id == otherPlayer.playerId) {
                    console.log('ADDED TO PLAYERS LIST' + player.id);
                    sortedPlayersList.push(player);
                }
            })
        }
        if (player.id == self.socket.id) {
            sortedPlayersList.push(player);
        }
    });
    sceneEvents.emit("currentPlayers", sortedPlayersList, self.playerName);
}


export function loadTexture(object, textureLink, type, isMainPlayer = false) {
    object.textureId = textureLink;
    object.nftType = type;


    if (type == 'moonbirds') {
        object.yAdd = -100;
        object.setScale(0.2);
        object.setOrigin(0.5, 0.5);
        if (isMainPlayer) {
            object.setBodySize(self.player.startWidth * 2, self.player.startHeight * 2, false)
            object.setOffset(100, 100);
        }
    } else {
        console.log("TRYING TO FIX");
        object.setOrigin(0.5, 0.5);
        object.yAdd = 0;
        if (isMainPlayer) {
        //     console.log("HERE");
            object.setScale(1);
            object.setBodySize(object.startWidth * 0.4, object.startHeight * 0.4, false)
            self.player.setOffset(10, self.player.startHeight * 0.7);
         }
        
    }

    if (self.textures.exists(textureLink)) {
        object.setTexture(textureLink);
        return;
    }

    self.load.image(textureLink, textureLink)
    self.load.on('filecomplete', function (key, file) {
        if (key == textureLink) {
            object.setTexture(textureLink);
        }
    });
    self.load.start();
}

export function isTextureFromInternet(texture) {
    return (texture + '').startsWith('https');
}

export function pushToPlayerList(playerInfo) {
    playersList.push({ name: playerInfo.playerName, microphoneStatus: playerInfo.microphoneStatus, id: playerInfo.playerId, nft: playerInfo.nft, textColor: playerInfo.textColor, textureId: playerInfo.textureId });
}

export function updateEnsInPlayerList(domain) {
    playersList.forEach(player => {
        if (player.id == self.socket.id) {
            if (domain) player.name = domain;
            if (domain) self.playerName = domain;
            self.socket.emit("updatePlayerInfo", { playerName: domain }, self.socket.id);
            showPlayersToTalk();
        }
    });
}

export function updateNFTInPlayerList(nftImage, id, link) {
    playersList.forEach(player => {
        if (player.id == self.socket.id) {
            player.nft = nftImage;
            const textureId = id ? link : null;
            self.socket.emit("updatePlayerInfo", { nft: nftImage, textureId: textureId }, self.socket.id);
        }
    });
}