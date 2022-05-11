const { join, filter, values } = require("./data/nicknames");

const playerController = require("./playerController");

peers = {};

players = {};

hashChats = [];

rooms = {};


module.exports = (io) => {
    io.on('connect', (socket) => {
        // Initiate the connection process as soon as the client connects

        peers[socket.id] = socket

        // create new player and add him to players
        socket.on('addPlayer', (address, room, playerInfo) => {
            playerController.addPlayer(io, socket, players, address, room, playerInfo, rooms);
        });


        socket.on('removeFromRoom', () => {
            socket.to(players[socket.id].room).emit('disconnected', socket.id);
        })

        // when a player moves, update the player data
        socket.on('playerMovement', function (movementData) {
            players[socket.id].x = movementData.x;
            players[socket.id].y = movementData.y;
            players[socket.id].rotation = movementData.rotation;
            // emit a message to all players about the player that moved
            socket.to(players[socket.id].room).emit('playerMoved', players[socket.id]);
        });


        socket.on('updatePlayerInfo', (data, socket_id) => {
            if (data.microphoneStatus != null) players[socket_id].microphoneStatus = data.microphoneStatus;
            if (data.playerName != null) players[socket_id].playerName = data.playerName;
            if (data.nft != null) players[socket_id].nft = data.nft;
            if (data.textureId) players[socket_id].textureId = data.textureId;
            if (data.deafen != null) players[socket_id].deafen = data.deafen;
            io.to(players[socket.id].room).emit('updatePlayerInfo', players[socket_id]);
        })


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

            // remove from rooms
            rooms[players[socket.id]] = rooms[players[socket.id]].filter(id => id !== socket.id);
            // emit a message to all players to remove this player
            io.to(players[socket.id].room).emit('disconnected', socket.id);
            delete players[socket.id];
            delete peers[socket.id];
        });

        /**
         * Send message to client to initiate a connection
         * The sender has already setup a peer connection receiver
         */
        socket.on('initSend', init_socket_id => {
            console.log('INIT SEND by ' + socket.id + ' for ' + init_socket_id)
            if (peers[init_socket_id]) peers[init_socket_id].emit('initSend', socket.id)
        });


        socket.on('addToTalk', id => {
            if (hashChats.includes(socket.id + '$' + id)) return;
            console.log('sending init receive to ' + socket.id)
            if (peers[id]) peers[id].emit('initReceive', socket.id)
            hashChats.push(id + '$' + socket.id);
            console.log(`TRYING TO CHAT ${id} with ${socket.id}`)
        });

        socket.on('addToAllPeers', () => {
            for (var peer in peers) {
                if (hashChats.includes(socket.id + '$' + peer)) return;
                if (peers[peer]) peers[id].emit('initeReceive', socket.id);
                hashChats.push(peers + '$' + socket.id);
            }
        })

        socket.on('removeFromTalk', id => {
            if (hashChats.includes(id + '$' + socket.id)) hashChats.splice(hashChats.indexOf(id + '$' + socket.id), 1);
            if (hashChats.includes(socket.id + '$' + id)) hashChats.splice(hashChats.indexOf(socket.id + '$' + id), 1);

            console.log('REMOVING PEER', id, socket.id);
            // emit player with socket id
            if (peers[id]) peers[id].emit('removeFromTalk', socket.id);
            if (peers[socket.id]) peers[socket.id].emit('removeFromTalk', id);
        });

        // ADD TEXT CHAT
        socket.on('textChatMessage', (message) => {
            socket.to(players[socket.id].room).emit('textChatMessage', message);
        });
    });

    // main timer

    setInterval(() => {
        // get for in object 
        for (var room in rooms) {
            const data = {};
            rooms[room].forEach(socketId => {
                console.log(socketId);
                data[socketId] = {
                    x: players[socketId].x,
                    y: players[socketId].y,
                };
            });
            // make room string value
            const roomString = room.toString();
            io.to(roomString).emit('updatePlayers', data);
        }
    }, 30);
};