import ImagesController from '../../../src/controllers/images';
import datasource from '../../../config/datasource';

describe('Images: Controller', () => {
  describe('Route GET images: getAll()', () => {
    it('should return a image', () => {
      const Images = {
        findOne: td.function(),
      };

      const expectedResponse = [{
        _id: '1',
        url: 'http://domain.com/image.jpg',
        url_small: 'http://domain.com/image.jpg',
        url_medium: 'http://domain.com/image.jpg',
        url_large: 'http://domain.com/image.jpg',
      }];

      td.when(Images.findOne({ })).thenResolve(expectedResponse);

      datasource();
      const imagesController = new ImagesController();
      return imagesController.getAll()
        .then(response => console.log(response.data))
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });
});
