import HttpStatus from 'http-status';
import mongoose from 'mongoose';
import fs from 'fs';
import async from 'async';
import fetch from 'node-fetch';
import Jimp from 'jimp';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class ImagesController {
  constructor() {
    this.Image = mongoose.model('Image');
    this.fs = fs;
  }

  resizePhotos() {
    return new Promise((resolve) => {
      async.waterfall([
        (callback) => {
          fetch('http://54.152.221.29/images.json')
            .then(res => res.json())
            .then((json) => {
              callback(null, json);
            });
        },
        (listFiles, callback) => {
          Promise.all(listFiles.images.map((value) => {
            const urlSplit = value.url.split('/');
            return this.fetchImage(value.url, `public/images/${urlSplit[4]}`, urlSplit[4]);
          }))
          .then((result) => {
            callback(null, result);
          });
        },
        (listImages, callback) => {
          Promise.all(listImages.map(value => this.create(value)))
          .then((result) => {
            callback(null, result);
          });
        },
      ],
      (err, result) => {
        resolve(defaultResponse(result));
      });
    });
  }

  fetchImage(url, localPath, fileName) {
    return new Promise(resolve => async.waterfall([
      (callback) => {
        fetch(url)
            .then(res => res.buffer())
            .then((buffer) => {
              callback(null, buffer);
            });
      },
      (fileBuffer, callback) => {
        this.fs.writeFile(localPath, fileBuffer, 'binary', (err) => {
          if (err) {
            callback(null, false);
          } else {
              // opan image to resize
            Jimp.read(localPath).then((lenna) => {
                // resize image to 3 sizes
              lenna.resize(320, 240)
                  .quality(60)
                  .write(`public/images/small_${fileName}`);
              lenna.resize(384, 288)
                  .quality(60)
                  .write(`public/images/medium_${fileName}`);
              lenna.resize(640, 480)
                  .quality(60)
                  .write(`public/images/large_${fileName}`);
              callback(null, {
                url: localPath,
                url_small: `public/images/small_${fileName}`,
                url_medium: `public/images/medium_${fileName}`,
                url_large: `public/images/large_${fileName}`,
              });
            }).catch(() => {
              callback(null, false);
            });
          }
        });
      },
      (result, callback) => {
        callback(null, result);
      },
    ],
      (err, result) => {
        resolve(result);
      }));
  }

  getAll() {
    return this.Image.find({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  deleteAll() {
    return this.Image.find({}).remove()
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  create(data) {
    return this.Image.create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data) {
    return this.Image.update(data)
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Image.find({ _id: params.id }).remove()
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

}

export default ImagesController;
