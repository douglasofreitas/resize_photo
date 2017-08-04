# resize_photos
Get Photos from web and resize in server - API usgin Node.JS and MongoDB

Main Modules:
* Mongoose
* Express
* Nodemon
* Supertest / Joi / Chai
* Babel

Use run application using Docker or manualy


Using Docker
    make run
    npm start (in docker)

OR

Run Manualy
    npm install
    nano .env (change the 'database_host' to your MongoDB host)
    npm start



Run Tests: 
    npm test (integration, unit and contract - only unit at moment)

Using application:
In browser, call a URL (in sequence):
    http://localhost:8081/books/resize - Get images from internet and resize
    http://localhost:8081/books - Get images from database to user