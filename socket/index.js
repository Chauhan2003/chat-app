import { Server } from 'socket.io';

const io = new Server(9000, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

const users = [];

const addUser = (userData, socketId) => {
    !users.some(user => user._id === userData._id) && users.push({ ...userData, socketId });
}

const getUser = (userId) => {
    return users.find(user => user._id === userId);
}

io.on('connection', (socket) => {
    console.log(`User Connected`);
    socket.on("addUsers", userData => {
        // console.log(userData);
        // console.log(socket.id);
        // console.log("users", users);
        addUser(userData, socket.id);
        io.emit('getUsers', users);
    })

    //send message
    socket.on('sendMessage', (data) => {
        const user = getUser(data.recieverId);
        io.to(user.socketId).emit('getMessage', data)
    })
})