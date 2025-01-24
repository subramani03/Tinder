const socket = require('socket.io');
const ChatModel = require('../models/Chat');

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: 'http://localhost:5173',
    },
  });

  io.on('connection', (socket) => {
    socket.on('joinChat', ({ firstName, userId, targetUserId }) => {
      const roomId = [userId, targetUserId].sort().join('_');
      socket.join(roomId);
      console.log(`${firstName} joined the room: ${roomId}`);
    });

    socket.on('sendMessage',async ({ firstName, userId, targetUserId, text }) => {
      const roomId = [userId, targetUserId].sort().join('_');
      console.log(`${firstName} sent a message to room ${roomId}: ${text}`);

      //save messages to the database
      try{
        let chat = await ChatModel.findOne({participants:{ $all: [userId, targetUserId] }});

        if(!chat){
            chat = new ChatModel({
            participants:[userId,targetUserId],
            messages: [],
          });
        }
        chat.messages.push({senderId:userId,text});
        await chat.save();
      }
      catch(err){
        console.log(err);
      }
      io.to(roomId).emit('messageReceived', { firstName, text });
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

module.exports = initializeSocket;
