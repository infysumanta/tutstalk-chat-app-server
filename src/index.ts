import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import { Socket } from 'socket.io';
import { IUser } from './interfaces/models';

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const io = require('socket.io')(app, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000'
    // credentials: true,
  }
});

io.on('connection', (socket: Socket) => {
  console.log('Connected to socket.io');
  socket.on('setup', (userData: IUser) => {
    socket.join(userData._id.toString());
    socket.emit('connected');
  });

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log('User Joined Room: ' + room);
  });
  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log('chat.users not defined');

    chat.users.forEach((user: IUser) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket
        .in(user._id.toString())
        .emit('message recieved', newMessageRecieved);
    });
  });

  socket.off('setup', () => {
    console.log('USER DISCONNECTED');
    socket.disconnect();
  });
});
