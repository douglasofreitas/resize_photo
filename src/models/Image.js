import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const imageSchema = new Schema({
  url: String,
  url_small: String,
  url_medium: String,
  url_large: String,
});

module.exports = imageSchema;
