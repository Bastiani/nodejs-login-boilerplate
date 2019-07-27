/* eslint-disable no-console */
import mongoose, { Mongoose } from 'mongoose';

export default function connectDatabase(): Promise<Mongoose> {
  return new Promise((resolve, reject): void => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]));
    mongoose.connect('mongodb://admin:mongo2019@localhost:27017/nodejs-login-boilerplate?authSource=admin', { useNewUrlParser: true });
  });
}
