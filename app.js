import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import imagesRouter from './src/routes/images';

const app = express();
app.config = config;
app.datasource = datasource();

app.set('port', process.env.app_port);
app.use(bodyParser.json());
app.use('/public', express.static(`${__dirname}/public`));
imagesRouter(app);

export default app;
