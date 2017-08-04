import mongoose from 'mongoose';
import Promise from 'bluebird';
import config from './config';
import ImageSchema from '../src/models/Image';

const options = {
  promiseLibrary: Promise,
  server: { auto_reconnect: true, socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
};
mongoose.Promise = global.Promise;
mongoose.model('Image', ImageSchema);

function connectDatabase() {
  mongoose.connect(`mongodb://${config.database_host}/${config.database}`, options);
}
connectDatabase();

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to ');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected!');
});
// If the connection throws an error
mongoose.connection.on('error', () => {
  console.log('Mongoose default connection error: ');
  setTimeout(() => { connectDatabase(); }, 5000);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

export default() => mongoose;
