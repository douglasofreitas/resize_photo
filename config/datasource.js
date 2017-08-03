import mongoose from 'mongoose';
import Promise from 'bluebird';
import ImageSchema from '../src/models/Image';

const options = { promiseLibrary: Promise };
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.database_host}/${process.env.database}`, options);
mongoose.model('Image', ImageSchema);

export default() => mongoose;
