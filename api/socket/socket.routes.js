
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('updateBoard', boardId=>{
            console.log({boardId})
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            
            io.to(socket.feedId).emit('feed update')
        })
        socket.on('feed board', feedId=>{
            console.log({feedId})
            if (socket.feedId) {
                socket.leave(socket.feedId)
            }
            socket.join(feedId)
            socket.feedId = feedId;
        })
        
    })
}