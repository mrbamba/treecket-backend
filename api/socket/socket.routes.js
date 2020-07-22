
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('updateBoard', boardId=>{
            console.log({boardId})
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            
            io.to(socket.boardId).emit('feed update')
        })
        socket.on('feed board', boardId=>{
            console.log({boardId})
            if (socket.boardId) {
                socket.leave(socket.boardId)
            }
            socket.join(boardId)
            socket.boardId = boardId;
        })
        
    })
}