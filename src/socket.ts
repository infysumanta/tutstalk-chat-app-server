import { Server, Socket } from 'socket.io';
import http from 'http';
import { IUser } from './interfaces/models';

export default async function socketServer(
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) {
  /**
   * The socket.io server instance.
   */
  const io = new Server(server, {
    cors: {
      origin: '*'
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
}
