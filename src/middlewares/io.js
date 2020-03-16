import dotenv from 'dotenv';
import db from '../models';
import { verifyToken } from '../utils/tokenHandler';


dotenv.config();

export const connectedUsers = {};

export const ioMiddleware = async (socket) => {
  try {
    const { token } = socket.handshake.headers;
    const decoded = verifyToken(token);
    const userInfo = await db.User.findOne({ where: { id: decoded.id } });
    if (!decoded.error) {
      if (!connectedUsers[decoded.id]) {
        connectedUsers[decoded.id] = [];
      }
      connectedUsers[decoded.id].push(socket.id);
      let userIds;
      // display users that are online
      if (connectedUsers[decoded.id] !== null) {
        userIds = Object.keys(connectedUsers);
        const usersOnline = Promise.all(userIds.map(async () => `${userInfo.firstName} ${userInfo.lastName}`)).then((users) => users);
        socket.emit('onlineUsers', (await usersOnline).map((user) => `<li>${user}</li>`));
      }

      socket.on('message', async (dataFromClient) => {
        if (dataFromClient.message !== undefined) {
          const sender = verifyToken(dataFromClient.token);
          const senderInfo = await db.User.findOne({ where: { id: sender.id } });
          await db.Chat.create({
            message: dataFromClient.message,
            userId: senderInfo.id,
            userName: `${senderInfo.firstName} ${senderInfo.lastName}`
          });
        }

        socket.emit('sendMessage', JSON.stringify({ senderFirstName: userInfo.firstName, senderLastName: userInfo.lastName, message: dataFromClient.message }));
      });

      const chatData = JSON.stringify(await db.Chat.findAll());
      socket.emit('chatHistory', chatData);

      socket.emit('initialize', JSON.stringify({ notif: await db.Notifications.findAll({ where: { receiverId: decoded.id } }) }));

      socket.on('disconnect', () => {
        process.stdout.write('a user is disconnected');
        connectedUsers[decoded.id].forEach((el, index, arr) => {
          if (arr[index] === socket.id) {
            arr.splice(index, 1);
          }
        });
      });
    }
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      socket.emit('initialize', JSON.stringify({ error: 'The token is not provided or the token provided is an invalid token' }));
    }
  }
};
