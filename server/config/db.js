import Mongoose from 'mongoose';
import config from './config';

Mongoose.connect(config.db);

const db = Mongoose.connection;
/* eslint-disable no-console */
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', () => {
  /* eslint-disable no-console */
  console.log('Connection with database succeeded.');
});

export default db;
