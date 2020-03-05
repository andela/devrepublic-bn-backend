import dotenv from 'dotenv';
import db from '../models';
import { verifyToken } from '../utils/tokenHandler';

dotenv.config();

export const connectedUsers = {};

export const ioMiddleware = async (socket) => {
  try {
    const { token } = socket.handshake.headers;
    const decoded = verifyToken(token);
    if (!decoded.error) {
      if (!connectedUsers[decoded.id]) {
        connectedUsers[decoded.id] = [];
      }
      connectedUsers[decoded.id].push(socket.id);
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
