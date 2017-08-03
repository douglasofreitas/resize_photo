import ImagesController from '../controllers/images';

export default (app) => {
  const imagesController = new ImagesController();

  app.route('/books/resize')
    .get((req, res) => {
      imagesController.resizePhotos()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/books')
    .get((req, res) => {
      imagesController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      imagesController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      imagesController.deleteAll()
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });

  app.route('/books/:id')
    .get((req, res) => {
      imagesController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      imagesController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      imagesController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
