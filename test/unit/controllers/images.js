import ImagesController from '../../../src/controllers/images';
import datasource from '../../../config/datasource';

describe('Images: Controller', () => {
  describe('Route GET images: create()', () => {
    it('should create image in database', () => {
      const expectedResponse = [{
        url: 'http://domain.com/image.jpg',
        url_small: 'http://domain.com/image.jpg',
        url_medium: 'http://domain.com/image.jpg',
        url_large: 'http://domain.com/image.jpg',
      }];

      datasource();
      const imagesController = new ImagesController();
      return imagesController.create(expectedResponse)
        .then(response => response.data)
        .then((response) => {
          const resultFormat = {
            url: response[0].url,
            url_small: response[0].url_small,
            url_medium: response[0].url_medium,
            url_large: response[0].url_large,
          };
          expect(resultFormat).to.have.all.keys(expectedResponse[0]);
        });
    });
  });

  describe('Route GET images: getAll()', () => {
    it('should return a image', () => {
      const Images = {
        findOne: td.function(),
      };

      const expectedResponse = [{
        url: 'http://domain.com/image.jpg',
        url_small: 'http://domain.com/image.jpg',
        url_medium: 'http://domain.com/image.jpg',
        url_large: 'http://domain.com/image.jpg',
      }];

      td.when(Images.findOne({ })).thenResolve(expectedResponse);

      datasource();
      const imagesController = new ImagesController();
      return imagesController.getAll()
        .then(response => response.data)
        .then((response) => {
          const resultFormat = {
            url: response[0].url,
            url_small: response[0].url_small,
            url_medium: response[0].url_medium,
            url_large: response[0].url_large,
          };
          expect(resultFormat).to.have.all.keys(expectedResponse[0]);
        });
    });
  });

  describe('Route GET images: deleteAll()', () => {
    it('should remove all images', () => {
      datasource();
      const imagesController = new ImagesController();
      return imagesController.deleteAll()
        .then(response => response.data);
    });
  });
});
