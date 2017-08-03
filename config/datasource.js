import mongoose from 'mongoose';
import Promise from 'bluebird';
import config from './config';
import ImageSchema from '../src/models/Image';

const options = { promiseLibrary: Promise };
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.database_host}/${config.database}`, options);
mongoose.model('Image', ImageSchema);

export default() => mongoose;
