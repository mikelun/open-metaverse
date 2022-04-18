const nicknames = require("./data/nicknames");


peers = {};

players = {};

hashChats = [];

const onConnect = (socket) => {
        console.log('a client is connected', socket.id)

        console.log('players', players)
        console.log('players socket id', socket.id)

        // Initiate the connection process as soon as the client connects

        peers[socket.id] = socket

        // create new player and add him to players
        socket.on('addPlayer', address => {
            for (test in players) {
                if (players[test].address == address) {
                    socket.emit('playerExists')
                    return;
                }
            }
            players[socket.id] = {
                rotation: 0,
                x: Math.floor(Math.random() * 100) + 100,
                y: 850,
                playerId: socket.id,
                microphoneStatus: false,
                playerName: nicknames[Math.floor(Math.random() * nicknames.length)],
                textureId: Math.floor(Math.random() * 50),
                nft: null,
                address: address
            };

            socket.emit('currentPlayers', players);

            socket.broadcast.emit('newPlayer', players[socket.id]);
        });

        // update all other players of the new player

        // when a player moves, update the player data
        socket.on('playerMovement', function (movementData) {
            players[socket.id].x = movementData.x;
            players[socket.id].y = movementData.y;
            players[socket.id].rotation = movementData.rotation;
            // emit a message to all players about the player that moved
            socket.broadcast.emit('playerMoved', players[socket.id]);
        });


        socket.on('updatePlayerInfo', ({ data, socket_id }) => {
            console.log('updatePlayerInfo', data, socket_id)
            if (!players[socket_id]) {
                return
            }
            if (data.microphoneStatus != null) players[socket_id].microphoneStatus = data.microphoneStatus;
            if (data.playerName != null) players[socket_id].playerName = data.playerName;
            if (data.nft != null) players[socket_id].nft = data.nft;
            socket.emit('updatePlayerInfo', players[socket_id]);
        })



        // // Asking all other clients to setup the peer connection receiver
        // for(let id in peers) {
        //     if(id === socket.id) continue
        //     console.log('sending init receive to ' + socket.id)
        //     peers[id].emit('initReceive', socket.id)
        // }

        /**
         * relay a peerconnection signal to a specific socket
         */
        socket.on('signal', data => {
            if (!peers[data.socket_id]) return
            peers[data.socket_id].emit('signal', {
                socket_id: socket.id,
                signal: data.signal
            })
        });

        /**
         * remove the disconnected peer connection from all other connected clients
         */
        socket.on('disconnect', async function () {
            console.log('user disconnected: ', socket.id);
            delete players[socket.id];
            delete peers[socket.id];
            // emit a message to all players to remove this player
            socket.emit('disconnected', socket.id);
        });

        /**
         * Send message to client to initiate a connection
         * The sender has already setup a peer connection receiver
         */
        socket.on('initSend', init_socket_id => {
            console.log('INIT SEND by ' + socket.id + ' for ' + init_socket_id)
            peers[init_socket_id].emit('initSend', socket.id)
        });


        socket.on('addToTalk', id => {
            if (hashChats.includes(socket.id + '$' + id)) return;
            console.log('sending init receive to ' + socket.id)
            peers[id].emit('initReceive', socket.id)
            hashChats.push(id + '$' + socket.id);
            console.log(`TRYING TO CHAT ${id} with ${socket.id}`)
        });

        socket.on('removeFromTalk', id => {
            if (hashChats.includes(id + '$' + socket.id)) hashChats.splice(hashChats.indexOf(id + '$' + socket.id), 1);
            if (hashChats.includes(socket.id + '$' + id)) hashChats.splice(hashChats.indexOf(socket.id + '$' + id), 1);

            console.log('REMOVING PEER', id, socket.id);
            // emit player with socket id
            if (peers[id]) peers[id].emit('removeFromTalk', socket.id);
            if (peers[socket.id] )peers[socket.id].emit('removeFromTalk', id);
        });
}

const ioConfig = (io) => io.on('connect', onConnect);

module.exports = {
    onConnect,
    ioConfig,
    default: ioConfig,
}

